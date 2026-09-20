@echo off
echo Stopping AestheticView Node processes...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5000 :5173"') do (
  taskkill /f /pid %%a 2>nul
)
echo All AestheticView servers stopped cleanly.
pause
