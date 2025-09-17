#!/bin/bash

echo "Starting NyayaSathi Legal Aid Application..."
echo ""

echo "Starting Backend Server..."
cd backend
python main.py &
BACKEND_PID=$!
cd ..

echo "Waiting for backend to start..."
sleep 3

echo "Starting Frontend..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "========================================"
echo "   NyayaSathi is running!"
echo "========================================"
echo ""
echo "Backend API: http://localhost:8001"
echo "Frontend UI: http://localhost:3000"
echo ""
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "To stop:"
echo "kill $BACKEND_PID $FRONTEND_PID"
echo "or press Ctrl+C"
echo "========================================"

# Keep script running
wait