import tkinter as tk
from tkinter import filedialog
import os
from tkinter import messagebox

# Define the file path as a global variable
file_path = 'config.txt'

def read_file():
    # Clear the existing values
    id_var.set('')
    pass_var.set('')
    url_var.set('')
    shutdown_time_var.set('')

    # Check if the file exists
    if not os.path.isfile(file_path):
        # Show alert if the file doesn't exist
        messagebox.showinfo("File Status", "File not found.")

    else:

        # Read the file
        with open(file_path, 'r') as file:
            content = file.read()

        # Extract the variable values
        lines = content.split('\n')
        for line in lines:
            if line.startswith('id='):
                id_var.set(line.split('=')[1])
            elif line.startswith('pass='):
                pass_var.set(line.split('=')[1])
            elif line.startswith('url='):
                url_var.set(line.split('=')[1])
            elif line.startswith('ShutdownTime='):
                shutdown_time_var.set(line.split('=')[1])

def save_file():
    # Get the variable values from the GUI
    id_value = id_var.get()
    pass_value = pass_var.get()
    url_value = url_var.get()
    shutdown_time_value = shutdown_time_var.get()

    # Check if the file exists
    if not os.path.isfile(file_path):
        # Show alert if the file doesn't exist
        messagebox.showinfo("File Status", "Creating a new file.")

        # Create a new file
        with open(file_path, 'w') as file:
            file.write('id=\npass=\nurl=\nShutdownTime=\n')

    # Update the content with modified values
    new_content = ''
    with open(file_path, 'r') as file:
        for line in file:
            if line.startswith('id='):
                line = f'id={id_value}\n'
            elif line.startswith('pass='):
                line = f'pass={pass_value}\n'
            elif line.startswith('url='):
                line = f'url={url_value}\n'
            elif line.startswith('ShutdownTime='):
                line = f'ShutdownTime={shutdown_time_value}\n'
            new_content += line

    # Save the changes back to the file
    with open(file_path, 'w') as file:
        file.write(new_content)

    # Show alert for successful save
    messagebox.showinfo("File Status", f"File saved successfully.\nID: {id_value}\nPassword: {pass_value}\nURL: {url_value}\nShutdown Time: {shutdown_time_value}")

# Create the GUI window
window = tk.Tk()
window.title('Config Hana Editor')
window.geometry('300x200')

# Variables to store the values
id_var = tk.StringVar()
pass_var = tk.StringVar()
url_var = tk.StringVar()
shutdown_time_var = tk.StringVar()

# Read the file when the program starts
read_file()

# GUI elements
label1 = tk.Label(window, text='ID:')
label1.pack()
entry1 = tk.Entry(window, textvariable=id_var)
entry1.pack()

label2 = tk.Label(window, text='Password:')
label2.pack()
entry2 = tk.Entry(window, textvariable=pass_var)
entry2.pack()

label3 = tk.Label(window, text='URL:')
label3.pack()
entry3 = tk.Entry(window, textvariable=url_var)
entry3.pack()

label4 = tk.Label(window, text='Shutdown Time:')
label4.pack()
entry4 = tk.Entry(window, textvariable=shutdown_time_var)
entry4.pack()

save_button = tk.Button(window, text='Save File', command=save_file)
save_button.pack()

# Start the GUI event loop
window.mainloop()
