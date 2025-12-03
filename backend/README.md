
---

# Smart Sprout Backend — Express + MySQL

This backend provides REST APIs for logging and retrieving sensor data from Raspberry Pi.  
It also serves the dashboard frontend.

---

## ✨ Features
- REST API to receive realtime data from Raspberry Pi  
- Store sensor logs inside MySQL database  
- Serve dashboard via static hosting  
- Provide realtime and historical data for charts  
- Ready for future actuator control endpoints  

---

## 🔧 Installation

### 1. Install dependencies
```bash
npm install
```

### 2. Runnig program
```bash
node server.js

# If want run using nodemon
npm run dev
```