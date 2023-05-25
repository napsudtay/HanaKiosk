cd %CD%
cd ..
cd ..

cd CloneGithub
python cloneGithub.py
TIMEOUT /T 1

cd ..
cd MainWebHanaKiosk\miniprogram
python openTeamViewer_sendLine.py

cd ..
cd BachFlie
START /min runServer.bat
START openBrowserFromNotepad.bat
START /min runMainAuto.bat

cd ..
cd miniprogram
python main.py


exit