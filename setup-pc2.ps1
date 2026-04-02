# ============================================================
# PC2 SETUP SCRIPT - Run this on your SECOND computer
#
# HOW TO RUN:
# 1. Right-click this file in File Explorer
# 2. Click "Run with PowerShell"
# 3. If it asks to allow, click "Yes"
#
# WHAT THIS DOES:
# - Pulls latest code from GitHub
# - Moves node_modules/.next outside OneDrive (stops sync fights)
# - Installs all packages fresh
# - Your project will be ready to run
# ============================================================

$projectPath = "C:\Users\User\OneDrive\Uni Web\university-web"
$externalBase = "C:\Users\User\AppData\Local\uni-web-deps"

Write-Host "=== CIMS University Web - PC2 Setup ===" -ForegroundColor Cyan
Write-Host ""

# Check if project exists
if (-not (Test-Path $projectPath)) {
    Write-Host "ERROR: Project folder not found at:" -ForegroundColor Red
    Write-Host "  $projectPath" -ForegroundColor Red
    Write-Host ""
    Write-Host "This means OneDrive hasn't synced yet." -ForegroundColor Yellow
    Write-Host "Wait a few minutes for OneDrive to sync, then run this script again." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "OR: If you want to clone from GitHub instead, run:" -ForegroundColor White
    Write-Host "  git clone https://github.com/ahmaddurrerehman-glitch/university-web" -ForegroundColor White
    Read-Host "Press Enter to close"
    exit
}

# Step 1: Pull latest code from GitHub
Write-Host "Step 1: Pulling latest code from GitHub..." -ForegroundColor Yellow
Set-Location $projectPath
git pull origin main
Write-Host "  Code is up to date." -ForegroundColor Green

# Step 2: Create external storage folder
Write-Host ""
Write-Host "Step 2: Creating external storage (outside OneDrive)..." -ForegroundColor Yellow
if (-not (Test-Path $externalBase)) {
    New-Item -ItemType Directory -Path $externalBase -Force | Out-Null
}
Write-Host "  Ready: $externalBase" -ForegroundColor Green

# Step 3: Handle node_modules junction
Write-Host ""
Write-Host "Step 3: Setting up node_modules outside OneDrive..." -ForegroundColor Yellow
$nmSource = "$projectPath\node_modules"
$nmTarget = "$externalBase\node_modules"

if (Test-Path $nmSource) {
    $isJunction = (Get-Item $nmSource -ErrorAction SilentlyContinue).Attributes -band [System.IO.FileAttributes]::ReparsePoint
    if (-not $isJunction) {
        Write-Host "  Removing old node_modules (synced by OneDrive, may be broken)..." -ForegroundColor White
        Remove-Item -Recurse -Force $nmSource
    } else {
        # Remove old junction so we can recreate it pointing to THIS PC's AppData
        cmd /c rmdir "$nmSource" | Out-Null
    }
}
if (Test-Path $nmTarget) {
    Remove-Item -Recurse -Force $nmTarget
}
New-Item -ItemType Directory -Path $nmTarget -Force | Out-Null
cmd /c mklink /J "$nmSource" "$nmTarget" | Out-Null
Write-Host "  node_modules junction created." -ForegroundColor Green

# Step 4: Handle .next junction
Write-Host ""
Write-Host "Step 4: Setting up .next build folder..." -ForegroundColor Yellow
$nextSource = "$projectPath\.next"
$nextTarget = "$externalBase\.next"

if (Test-Path $nextSource) {
    $isJunction = (Get-Item $nextSource -ErrorAction SilentlyContinue).Attributes -band [System.IO.FileAttributes]::ReparsePoint
    if (-not $isJunction) {
        Remove-Item -Recurse -Force $nextSource
    } else {
        cmd /c rmdir "$nextSource" | Out-Null
    }
}
if (Test-Path $nextTarget) {
    Remove-Item -Recurse -Force $nextTarget
}
New-Item -ItemType Directory -Path $nextTarget -Force | Out-Null
cmd /c mklink /J "$nextSource" "$nextTarget" | Out-Null
Write-Host "  .next junction created." -ForegroundColor Green

# Step 5: Install packages
Write-Host ""
Write-Host "Step 5: Installing packages (this takes 1-3 minutes)..." -ForegroundColor Yellow
Set-Location $projectPath
npm install
Write-Host "  npm install complete." -ForegroundColor Green

# Step 6: Check .env.local
Write-Host ""
Write-Host "Step 6: Checking environment variables..." -ForegroundColor Yellow
$envFile = "$projectPath\.env.local"
if (Test-Path $envFile) {
    Write-Host "  .env.local found (synced via OneDrive)." -ForegroundColor Green
} else {
    Write-Host "  WARNING: .env.local not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "  You need to create .env.local with your Supabase keys." -ForegroundColor Yellow
    Write-Host "  Copy the values from PC1's .env.local file or from Supabase dashboard." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  File should be at: $envFile" -ForegroundColor White
    Write-Host "  See .env.local.example for the template." -ForegroundColor White
}

Write-Host ""
Write-Host "=== SETUP COMPLETE! ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "To start the dev server, open a terminal and run:" -ForegroundColor White
Write-Host "  cd 'C:\Users\User\OneDrive\Uni Web\university-web'" -ForegroundColor Yellow
Write-Host "  npm run dev" -ForegroundColor Yellow
Write-Host ""
Write-Host "Then open: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to close"
