
from autoUnmute import *
from autoFullScreenF11 import *
from autoShutdown import *
 
import os

def readVarFromNotepad(nameVal):
    # Get the current file directory
    current_dir = os.path.dirname(os.path.abspath(__file__))

    # Specify the relative path to your Notepad file
    file_path = os.path.join(current_dir, '..', '..', 'ConfigHana', 'confighana.txt')

    # Read the text from the Notepad file
    with open(file_path, 'r') as file:
        lines = file.readlines()

    # Find the 'id' line and extract the value
    val_line = next(line for line in lines if line.startswith(nameVal))
    val_value = val_line.strip().split('=')[1]

    # print(val_value)
    return val_value


 
while(True):
    sleep(1)
    unmute()
    shutdown(readVarFromNotepad('ShutdownTime'))
    look_F11()