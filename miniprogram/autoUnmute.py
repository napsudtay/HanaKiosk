from time import sleep
from turtle import position
import pyautogui #pyautogui



path = 'imageBtn/'

def unmute():
    unmuteBTN = "unmuteBTN.jpg"
    position = pyautogui.locateOnScreen(path + unmuteBTN, confidence=0.9)
    if (position != None): #ถ้าเจอรูปให้ทำอะไร
        print('found img unmuteBTN')
        pyautogui.press('m')


# while(True):
    # sleep(1)
    # unmute()


    
