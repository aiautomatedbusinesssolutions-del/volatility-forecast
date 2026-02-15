# deploy.ps1 — Initialize and push volatility-forecast to GitHub
# Usage: Right-click → Run with PowerShell, or run from terminal:
#   powershell -ExecutionPolicy Bypass -File .\deploy.ps1

Set-Location "C:\Users\nneed\OneDrive\Desktop\volitility-forcast"

git init
git add .
git commit -m "initial build"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/volatility-forecast.git
git push -u origin main

Write-Host "`nDone! Check your repo at https://github.com/YOUR_USERNAME/volatility-forecast" -ForegroundColor Green
