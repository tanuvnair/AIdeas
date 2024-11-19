@echo off

echo Starting Frontend...
start cmd /k "cd frontend && npm install && npm run dev"

echo Starting Backend...
start cmd /k "cd backend && npm install && npm run dev"

echo Both Frontend and Backend are running. Press any key to exit.
pause
