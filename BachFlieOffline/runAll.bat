cd %CD%
cd ..
cd BachFlieOffline
START /min runServer.bat
START openBrowser.bat
START /min runPython.bat

python TurnOnSendLine.py
python autoShutdownOffline.py

