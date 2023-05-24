@echo off
setlocal

set "documents_path=%USERPROFILE%\Documents"
set "hana_kiosk_path=%documents_path%\HanaKiosk\ConfigHana\confighana.txt"

if not exist "%hana_kiosk_path%" (
    echo File does not exist.
    pause
    exit /b
)

set "id="
set "pass="

for /f "usebackq tokens=1,2 delims== " %%a in ("%hana_kiosk_path%") do (
    if "%%a"=="id" (
        set "id=%%b"
    )
    if "%%a"=="pass" (
        set "pass=%%b"
    )
)

if not defined id (
    echo ID is missing.
    pause
    exit /b
)

if not defined pass (
    echo Password is missing.
    pause
    exit /b
)

Start msedge "http://127.0.0.1:3001/?id=%id%&pass=%pass%"
@REM start msedge --kiosk http://127.0.0.1:3001/?id=%id%^&pass=%pass% --edge-kiosk-type=fullscreen

exit
