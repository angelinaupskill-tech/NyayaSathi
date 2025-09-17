@echo off
echo Starting NyayaSathi Legal Aid Application...
echo.

echo Starting Backend Server...
cd backend
start cmd /k "python main.py"
cd ..

echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo Starting Frontend...
cd frontend
start cmd /k "npm start"
cd ..

echo.
echo ========================================
echo   NyayaSathi is starting up!
echo ========================================
echo.
echo Backend API: http://localhost:8001
echo Frontend UI: http://localhost:3000
echo.
echo Wait for both servers to start, then:
echo 1. Open http://localhost:3000 in your browser
echo 2. Click the preview button in the IDE
echo.
echo To stop: Close both command windows
echo ========================================

pause