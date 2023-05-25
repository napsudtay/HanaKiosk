import subprocess
from time import sleep

def open_program(program_path):
    try:
        subprocess.Popen(program_path)
        print(f"Opened {program_path} successfully.")
    except FileNotFoundError:
        print(f"Error: {program_path} not found.")
    except Exception as e:
        print(f"An error occurred: {str(e)}")


# -----------------------------------------------------


import pyautogui
count = 0
timeOut = 10

image_path = 'imageBtn/'

btn_ok = ['ok_btn.jpg']
btn_receiveSupport = ['teamViewer_btn.jpg','teamViewer_btn2.jpg']
btn_copy = ['copyBT.jpg','copyBT2.jpg']

def find_image_and_click(image_path,btn_jpg):
    global count
    count = 0
    
    while True:
        for btn in btn_jpg:    
            position = pyautogui.locateOnScreen(image_path + btn, confidence=0.8)
            if (position != None): #ถ้าเจอรูปให้ทำอะไร
                # print('found img',position)
                x , y= pyautogui.locateCenterOnScreen(image_path + btn, confidence=0.8)
                print('x  y',x,y)
                pyautogui.click(x, y)
                count = 20
                break
            else:
                count += (1 / len(btn_jpg))
        sleep(1)
        print('finding :',btn , count,'/',timeOut)
        if(count >= timeOut):
            break

            
            

# -----------------------------------------------------


program_path = r"C:\Program Files\TeamViewer\TeamViewer.exe"  # Provide the path to TeamViewer.exe
open_program(program_path)
print('open Team Viewer')
sleep(3)

find_image_and_click(image_path,btn_ok)
find_image_and_click(image_path,btn_receiveSupport)
print('click support btn')

find_image_and_click(image_path,btn_copy)
print('click copy btn')

# exit()

# ---------------------------------------------------------------------
# -------------------------send_line_notify----------------------------

import os
import requests
import pyperclip

def send_line_notify(token, message):
    url = 'https://notify-api.line.me/api/notify'
    headers = {'Authorization': 'Bearer ' + token}
    data = {'message': message}
    response = requests.post(url, headers=headers, data=data)
    if response.status_code == 200:
        print('Notification sent successfully.')
    else:
        print('Failed to send notification. Status code:', response.status_code)

# Set your Line Notify access token
access_token = 'B1lOLAjFGidIvy2sz6UUHUVQewc6KNjWFBnaKMifu2D'

# Get the current file directory
current_dir = os.path.dirname(os.path.abspath(__file__))

# Specify the relative path to your Notepad file
file_path = os.path.join(current_dir, '..', '..', 'ConfigHana', 'confighana.txt')

# Read the text from the Notepad file
with open(file_path, 'r') as file:
    lines = file.readlines()

# Find the 'id' line and extract the value
id_line = next(line for line in lines if line.startswith('id='))
id_value = id_line.strip().split('=')[1]

clipboard_content = pyperclip.paste()

# Extract the desired text
start_marker = 'TeamViewer ID: '
end_marker = '\nYour Password: '
id_start_index = clipboard_content.find(start_marker) 
id_end_index = clipboard_content.find(end_marker)
desired_text = clipboard_content[id_start_index:len(clipboard_content)]
    
msg = "✅Site turn on 📱: " + id_value + '\n' + desired_text
print(msg)

# Send the Line Notify message
send_line_notify(access_token, msg)


 

