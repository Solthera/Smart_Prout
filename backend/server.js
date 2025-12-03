require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// =====================================================
// LOG PATH (untuk debug, biar tau folder serve dashboard)
// =====================================================
console.log("DIRNAME:", __dirname);
console.log("Serving dashboard from:", path.join(__dirname, "../dashboard"));

// =====================================================
// 1. SERVE DASHBOARD FRONTEND
// =====================================================

// Serve static files (CSS, JS, images)
app.use("/", express.static(path.join(__dirname, "../dashboard")));

// Serve index.html when opening "/"
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../dashboard/index.html"));
});

// =====================================================
// 2. MYSQL CONNECTION
// =====================================================
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Test connection
db.getConnection((err, conn) => {
    if (err) {
        console.error("❌ MySQL ERROR:", err);
    } else {
        console.log("✅ MySQL Connected");
        conn.release();
    }
});

// =====================================================
// 3. API: Raspberry Pi SEND DATA
// =====================================================
app.post("/api/realtime", (req, res) => {
    const { suhu, kelembaban_udara, kelembaban_tanah, level_air } = req.body;

    const sql = `
        INSERT INTO sensor_data 
        (suhu, kelembaban_udara, kelembaban_tanah, level_air)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [suhu, kelembaban_udara, kelembaban_tanah, level_air], (err, result) => {
        if (err) {
            console.log("Insert Error:", err);
            return res.status(500).json({ error: "insert_failed" });
        }
        res.json({ status: "ok", id: result.insertId });
    });
});

// =====================================================
// 4. API: Dashboard GET latest data
// =====================================================
app.get("/api/realtime", (req, res) => {
    db.query("SELECT * FROM sensor_data ORDER BY id DESC LIMIT 1", (err, rows) => {
        if (err) return res.status(500).json({ error: "db_error" });
        if (rows.length === 0) return res.json({});
        res.json(rows[0]);
    });
});

// =====================================================
// 5. API: History (chart)
// =====================================================
app.get("/api/history", (req, res) => {
    const limit = parseInt(req.query.limit) || 200;

    db.query(
        "SELECT * FROM sensor_data ORDER BY id DESC LIMIT ?",
        [limit],
        (err, rows) => {
            if (err) return res.status(500).json({ error: "db_error" });

            res.json(rows.reverse()); // paling lama → terbaru
        }
    );
});

// =====================================================
// 6. START SERVER
// =====================================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
}); 