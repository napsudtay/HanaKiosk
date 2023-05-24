from time import sleep
import time
from turtle import position
import pyautogui #pyautogui
import os
import datetime


count = 0

path = 'imageBtn/'

sleep(3)



def loop():
    global count, count_missing

    btn_allow = ['allowBT1.jpg','allowBT2.jpg','allowBT3.jpg']


    for btn in btn_allow:    
        position = pyautogui.locateOnScreen(path + btn, confidence=0.8)
        if (position != None): #ถ้าเจอรูปให้ทำอะไร
            print('found img',position)
            x , y= pyautogui.locateCenterOnScreen(path + btn, confidence=0.8)
            print('x  y',x,y)
            pyautogui.click(x, y)
            count += 1

        else:
            print('not found')
    

while(True):
    sleep(1)
    loop()
    if (count >= 3):
        exit()


    
