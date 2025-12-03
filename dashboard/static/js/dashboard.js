let chartSuhu, chartSoil;

// ===============================
// INIT CHARTS
// ===============================
function initCharts() {
  const ctx1 = document.getElementById('chartSuhu').getContext('2d');

  chartSuhu = new Chart(ctx1, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: "Temperature (°C)",
        data: [],
        fill: false,
        tension: 0.3
      }]
    },
    options: { responsive: true }
  });

  const ctx2 = document.getElementById('chartSoil').getContext('2d');

  chartSoil = new Chart(ctx2, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: "Soil Moisture",
        data: [],
        fill: false,
        tension: 0.3
      }]
    },
    options: { responsive: true }
  });
}

// ===============================
// LOAD REALTIME DATA
// ===============================
async function loadRealtime() {
  try {
    const res = await fetch('/api/realtime');
    const d = await res.json();

    document.getElementById('suhu').innerText = d.suhu ?? "-";
    document.getElementById('hum-air').innerText = d.kelembaban_udara ?? "-";
    document.getElementById('hum-soil').innerText = d.kelembaban_tanah ?? "-";
    document.getElementById('level').innerText = d.level_air ?? "-";

  } catch (err) {
    console.log("Realtime error:", err);
  }
}

// ===============================
// LOAD HISTORY FOR CHART
// ===============================
async function loadHistory() {
  try {
    const res = await fetch('/api/history?limit=200');
    const rows = await res.json();
    if (!rows) return;

    const labels = rows.map(r => r.waktu);
    const suhuData = rows.map(r => r.suhu);
    const soilData = rows.map(r => r.kelembaban_tanah);

    chartSuhu.data.labels = labels;
    chartSuhu.data.datasets[0].data = suhuData;
    chartSuhu.update();

    chartSoil.data.labels = labels;
    chartSoil.data.datasets[0].data = soilData;
    chartSoil.update();

  } catch (err) {
    console.log("History error:", err);
  }
}

// ===============================
// ACTUATOR CONTROL (coming soon)
// ===============================
function setActuator(name, value) {
  fetch('/api/actuator', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ [name]: value })
  })
  .then(r => r.json())
  .then(j => console.log("Actuator response:", j))
  .catch(err => console.log("Actuator error:", err));
}

// ===============================
// MAIN LOOP
// ===============================
function tick() {
  loadRealtime();
  loadHistory();
}

initCharts();
tick();
setInterval(tick, 5000); // refresh tiap 5 detik
