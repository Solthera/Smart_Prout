import spidev
import adafruit_dht
import board

dht = adafruit_dht.DHT22(board.D4)

spi = spidev.SpiDev()
spi.open(0, 0)
spi.max_speed_hz = 1350000

def read_soil():
    adc = spi.xfer2([1, (8+0)<<4, 0])
    value = ((adc[1] & 3) << 8) + adc[2]
    return value

def read_dht():
    try:
        temp = dht.temperature
        hum = dht.humidity
        return temp, hum
    except:
        return None, None
