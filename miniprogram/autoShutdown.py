from time import sleep
from turtle import position

import os
import datetime


access_token = 'B1lOLAjFGidIvy2sz6UUHUVQewc6KNjWFBnaKMifu2D'


def shutdown(shutdownTime):
    # get the current time
    now = datetime.datetime.now()

    if now.hour == 12 and now.minute == 20:
        os.system("shutdown /s /t 1")
        send_line_notify(access_token)
    elif now.hour == shutdownTime :
        os.system("shutdown /s /t 1")
        send_line_notify(access_token)
    


def send_line_notify(token, message):
    # ------------ read id from notepad -------------
    current_dir = os.path.dirname(os.path.abspath(__file__))

    # Specify the relative path to your Notepad file
    file_path = os.path.join(current_dir, '..', '..', 'ConfigHana', 'confighana.txt')

    # Read the text from the Notepad file
    with open(file_path, 'r') as file:
        lines = file.readlines()

    # Find the 'id' line and extract the value
    id_line = next(line for line in lines if line.startswith('id='))
    id_value = id_line.strip().split('=')[1]


    message = 'Shut down:' + id_value



    url = 'https://notify-api.line.me/api/notify'
    headers = {'Authorization': 'Bearer ' + token}
    data = {'message': message}
    response = requests.post(url, headers=headers, data=data)
    if response.status_code == 200:
        print('Notification sent successfully.')
    else:
        print('Failed to send notification. Status code:', response.status_code)