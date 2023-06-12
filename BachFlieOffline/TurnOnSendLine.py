from time import sleep
from turtle import position

import os
import datetime

import requests
access_token = 'B1lOLAjFGidIvy2sz6UUHUVQewc6KNjWFBnaKMifu2D'




def send_line_notify(token, message):
    
    url = 'https://notify-api.line.me/api/notify'
    headers = {'Authorization': 'Bearer ' + token}
    data = {'message': message}
    response = requests.post(url, headers=headers, data=data)
    if response.status_code == 200:
        print('Notification sent successfully.')
    else:
        print('Failed to send notification. Status code:', response.status_code)



send_line_notify(access_token,'Turn on: Computer demo')