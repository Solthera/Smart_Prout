import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)

PUMP_PIN = 17
FAN_PIN = 27

GPIO.setup(PUMP_PIN, GPIO.OUT)
GPIO.setup(FAN_PIN, GPIO.OUT)

def pump_on():
    GPIO.output(PUMP_PIN, GPIO.LOW)

def pump_off():
    GPIO.output(PUMP_PIN, GPIO.HIGH)

def fan_on():
    GPIO.output(FAN_PIN, GPIO.LOW)

def fan_off():
    GPIO.output(FAN_PIN, GPIO.HIGH)
