from time import sleep
from turtle import position
import pyautogui #pyautogui



path = 'imageBtn/'

sleep(3)
pyautogui.press('f11')  




def look_F11():
    btn_f11 = ['f11_1.jpg','f11_2.jpg']
    for btn in btn_f11:    
        position = pyautogui.locateOnScreen(path + btn, confidence=0.8)
        if (position != None): #ถ้าเจอรูปให้ทำอะไร
            print('found img f11')
            pyautogui.press('f11')
            pyautogui.press('f11')
            position = pyautogui.locateOnScreen(path + btn, confidence=0.8)
            if (position != None): #ถ้าเจอรูปให้ทำอะไร
                pyautogui.press('f11')
    

# while(True):
#     sleep(1)
#     look_F11()

    
