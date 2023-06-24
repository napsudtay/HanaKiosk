import serial
import time


arduino = serial.Serial(port='COM3', baudrate=9600, timeout=.1)


# if arduino.is_open:
#     arduino.close()
#     time.sleep(1)
#     arduino.open()



def write_read(x):
    arduino.write(bytes(x, 'utf-8'))
    time.sleep(0.05)
    data = arduino.readline()
    return data

def sendToSerial(message):
    # message = '1'
    # for x in range(1):
    write_read(message)
    

    # arduino.close()
    
    

