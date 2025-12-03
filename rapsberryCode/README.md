# Raspberry Pi Code — Smart Sprout IoT System

This folder contains all Python scripts used to run the Smart Sprout IoT automation system on a Raspberry Pi.  
The Pi is responsible for reading sensors, controlling actuators, and sending data to the backend server.

---

## 📌 Features
- Read temperature & humidity (DHT22)
- Read soil moisture using MCP3008 (SPI ADC)
- Control water pump & fan using relay
- Send realtime sensor data to Express backend (REST API)
- Automatic irrigation logic based on soil moisture threshold

---

## Raspberry Pi Setup

### 1. Update system
```bash
sudo apt update && sudo apt upgrade -y
```

### 2.Create virtual environment
```bash
python3 -m venv rapsberryCode
source rapsberryCode/bin/activate
```

### 3. Install Python dependencies
```bash
pip3 install adafruit-circuitpython-dht
pip3 install requests
pip3 install spidev
sudo apt install python3-rpi.gpio
```

### 4. Enable SPI (for MCP3008)
```bash
sudo raspi-config

# Menu
sudo raspi-config

# Confirm
Interface Options → SPI → Enable
```

## Wiring diagram
### DHT22 → Raspberry Pi
| DHT22 | Pin    |
| ----- | ------ |
| VCC   | 3.3V   |
| GND   | GND    |
| DATA  | GPIO 4 |

### MCP3008 → Raspberry Pi
| MCP3008 | RPi GPIO |
| ------- | -------- |
| CLK     | GPIO 11  |
| DOUT    | GPIO 9   |
| DIN     | GPIO 10  |
| CS      | GPIO 8   |

### Relay → Raspberry Pi
| Relay | GPIO    |
| ----- | ------- |
| Pump  | GPIO 17 |
| Fan   | GPIO 27 |


## Running program
```bash
cd rapsberryCode
source bin/activate
python3 main.py
```
