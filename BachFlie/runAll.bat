cd %CD%
cd ..
cd BachFlie
START /min runServer.bat
START openBrowser.bat
START /min autoShutdown.bat
START /min runPython.bat
TIMEOUT /T 3
EXIT
