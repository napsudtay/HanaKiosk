from time import sleep
from turtle import position

import os
import datetime

import requests
access_token = 'B1lOLAjFGidIvy2sz6UUHUVQewc6KNjWFBnaKMifu2D'


def shutdown(shutdownTime):
    # get the current time
    now = datetime.datetime.now()

    if now.hour == shutdownTime :
        os.system("shutdown /s /t 1")
        send_line_notify(access_token,'Shut down: Computer demo')




def send_line_notify(token, message):
    
    url = 'https://notify-api.line.me/api/notify'
    headers = {'Authorization': 'Bearer ' + token}
    data = {'message': message}
    response = requests.post(url, headers=headers, data=data)
    if response.status_code == 200:
        print('Notification sent successfully.')
    else:
        print('Failed to send notification. Status code:', response.status_code)



while(True):
    shutdown(21)
    sleep(1)

# send_line_notify(access_token,'Shut down: Computer demo')