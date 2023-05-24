from time import sleep
import time
from turtle import position
import pyautogui #pyautogui


count = 0;
start = 0;

# sleep(3)

pyautogui.press('f11')  


def loop():
    global count, start

    btn_name = ['imageBtn/allowBT1.jpg','imageBtn/allowBT2.jpg','imageBtn/allowBT3.jpg']

    for btn in btn_name:
        # print( 'btn = ', btn)
        position = pyautogui.locateOnScreen(btn, confidence=0.7)
        if (position != None):
            print(position[0])
            pyautogui.moveTo(position)

            pyautogui.click(position)
            print('Click')
            sleep(0.5)

            count = count + 1
            # start = time.time()

        else:
            print("No fonund img" , count ,end="\r")
        
    
    if(count >= 2):
        exit()


while(True):
    sleep(1)
    loop()
    
    # if(time.time() - start  > (1*60)):
    #     count = 0;
    
    