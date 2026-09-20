@echo off
echo ===================================================
echo           Starting AestheticView System
echo ===================================================
echo.
echo Launching Backend on http://localhost:5000 ...
start "AestheticView Backend (Port 5000)" cmd /k "cd /d %~dp0backend && npm run dev"

echo Launching Frontend on http://localhost:5173 ...
start "AestheticView Frontend (Port 5173)" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ===================================================
echo   Both servers are starting in separate windows!
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:5000
echo ===================================================
echo.
pause
