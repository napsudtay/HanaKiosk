from time import sleep
import time
from turtle import position
import pyautogui #pyautogui
import os
import datetime


delay_timer = 10 * 60 #sec
count = 0;
count_missing = 0;

path = 'imageBtn/'


pyautogui.press('f11')  
sleep(3)

def unmute():
    unmuteBTN = "unmuteBTN.jpg"
    position = pyautogui.locateOnScreen(path + unmuteBTN, confidence=0.9)
    if (position != None): #ถ้าเจอรูปให้ทำอะไร
        print('found img unmuteBTN')
        pyautogui.press('m')



def loop():
    global count, count_missing
    btn_shutdown = ['index_btn.jpg']
    btn_f11 = ['f11_1.jpg','f11_2.jpg']

    for btn in btn_shutdown:
        position = pyautogui.locateOnScreen(path + btn, confidence=0.9)
        if (position != None):          #ถ้าเจอรูปให้ทำอะไร
            # print(position[0])
            # print('Found img shutdown' , count )
            count_missing = 0
            count = count + 1
        else:                           #ถ้าไม่เจอรูปให้ทำอะไร
            # print("No fonund img shutdown" , count_missing )
            count = 0
            count_missing = count_missing + 1

    # if(count > delay_timer or count_missing > delay_timer):
        # print('shutdown')
        # os.system("shutdown /s /t 1") # for shutdown
        # os.system("rundll32.exe powrprof.dll,SetSuspendState 0,1,0") # for sleep



    for btn in btn_f11:    
        position = pyautogui.locateOnScreen(path + btn, confidence=0.8)
        if (position != None): #ถ้าเจอรูปให้ทำอะไร
            print('found img f11')
            pyautogui.press('f11')
            pyautogui.press('f11')
            position = pyautogui.locateOnScreen(path + btn, confidence=0.8)
            if (position != None): #ถ้าเจอรูปให้ทำอะไร
                pyautogui.press('f11')
    
def shutdown():

    # get the current time
    now = datetime.datetime.now()


    if now.hour == 12 and now.minute == 20:
        os.system("shutdown /s /t 1")
    elif now.hour == 2 :
        os.system("shutdown /s /t 1")

while(True):
    sleep(1)
    # loop()
    unmute()
    # shutdown()

    
