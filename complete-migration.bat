@echo off
echo ========================================
echo PostgreSQL Migration Script
echo ========================================
echo.

echo 1. Starting PostgreSQL container...
docker-compose up -d postgres

echo.
echo 2. Waiting for PostgreSQL to be ready...
timeout /t 10 /nobreak > nul

echo.
echo 3. Checking PostgreSQL status...
docker ps | findstr postgres

echo.
echo 4. Testing PostgreSQL connection...
docker exec flmintdeal-postgres pg_isready -U postgres

echo.
echo ========================================
echo PostgreSQL is ready for migration!
echo Next: Run the Strapi import process
echo ========================================
pause