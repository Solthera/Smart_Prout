import time
import json
import requests

from sensor import read_soil, read_dht
from control import pump_on, pump_off

SERVER_URL = "http://SERVER_IP:5000/api/realtime"
MIN_SOIL = 400
pump_state = False

while True:
    soil = read_soil()
    temp, hum = read_dht()

    if soil < MIN_SOIL:
        pump_on()
        pump_state = True
    else:
        pump_off()
        pump_state = False

    payload = {
        "suhu": temp,
        "kelembaban_udara": hum,
        "kelembaban_tanah": soil,
        "level_air": 0
    }

    try:
        r = requests.post(SERVER_URL, json=payload, timeout=3)
        print("Backend:", r.status_code)
    except Exception as e:
        print("Send failed:", e)

    print("Data:", payload)
    time.sleep(2)
