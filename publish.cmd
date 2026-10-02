@echo off
rem Double-click to publish the site: checks content, commits, pushes, waits for the deploy.
rem Same as: npm run deploy -- "message"
cd /d "%~dp0"
set /p MSG="What changed? (Enter for a default message): "
call npm run deploy --silent -- %MSG%
echo.
pause
