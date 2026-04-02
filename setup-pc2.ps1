# ============================================================
# PC2 SETUP SCRIPT - Run this on your SECOND computer
#
# HOW TO RUN:
# 1. Right-click this file in File Explorer
# 2. Click "Run with PowerShell"
# 3. If it asks "Do you want to allow...", click "Yes"
#
# WHAT THIS DOES:
# - Pulls latest code from GitHub
# - Moves node_modules/.next outside OneDrive (stops 1.2GB sync fights)
# - Installs all packages fresh
# - Your project will be ready to run with: npm run dev
# ============================================================

$projectPath = "C:\Users\User\OneDrive\Uni Web\university-web"
$externalBase = "C:\Users\User\AppData\Local\uni-web-deps"

Write-Host "=== CIMS University Web - PC2 Setup ===" -ForegroundColor Cyan
Write-Host ""

# Wait for OneDrive to sync if needed
if (-not (Test-Path $projectPath)) {
    Write-Host "ERROR: Project folder not found at:" -ForegroundColor Red
    Write-Host "  $projectPath" -ForegroundColor Red
    Write-Host ""
    Write-Host "OneDrive may still be syncing. Wait a few minutes and run again." -ForegroundColor Yellow
    Write-Host "OR clone from GitHub manually:" -ForegroundColor White
    Write-Host "  git clone https://github.com/ahmaddurrerehman-glitch/university-web" -ForegroundColor White
    Read-Host "Press Enter to close"
    exit
}

# Step 1: Pull latest code from GitHub
Write-Host "Step 1: Pulling latest code from GitHub..." -ForegroundColor Yellow
Set-Location $projectPath
git pull origin main
Write-Host "  Code is up to date." -ForegroundColor Green

# Step 2: Create external storage folder (outside OneDrive)
Write-Host ""
Write-Host "Step 2: Creating external storage (outside OneDrive)..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path "$externalBase\node_modules" -Force | Out-Null
New-Item -ItemType Directory -Path "$externalBase\.next" -Force | Out-Null
Write-Host "  Ready: $externalBase" -ForegroundColor Green

# Step 3: Handle node_modules junction
Write-Host ""
Write-Host "Step 3: Setting up node_modules outside OneDrive..." -ForegroundColor Yellow
$nmSource = "$projectPath\node_modules"
$nmTarget = "$externalBase\node_modules"

if (Test-Path $nmSource) {
    $item = Get-Item $nmSource -Force -ErrorAction SilentlyContinue
    if ($item.LinkType -eq 'Junction') {
        # Remove old junction (it points to a different PC's AppData)
        [System.IO.Directory]::Delete($nmSource)
        Write-Host "  Old junction removed." -ForegroundColor White
    } else {
        Write-Host "  Removing OneDrive-synced node_modules (may be corrupted)..." -ForegroundColor White
        Remove-Item -Recurse -Force $nmSource
    }
}
# Wipe target and recreate fresh
if (Test-Path $nmTarget) { Remove-Item -Recurse -Force $nmTarget }
New-Item -ItemType Directory -Path $nmTarget -Force | Out-Null
New-Item -ItemType Junction -Path $nmSource -Target $nmTarget | Out-Null
Write-Host "  node_modules junction created -> $nmTarget" -ForegroundColor Green

# Step 4: Handle .next junction
Write-Host ""
Write-Host "Step 4: Setting up .next build folder..." -ForegroundColor Yellow
$nextSource = "$projectPath\.next"
$nextTarget = "$externalBase\.next"

if (Test-Path $nextSource) {
    $item = Get-Item $nextSource -Force -ErrorAction SilentlyContinue
    if ($item.LinkType -eq 'Junction') {
        [System.IO.Directory]::Delete($nextSource)
    } else {
        Remove-Item -Recurse -Force $nextSource
    }
}
if (Test-Path $nextTarget) { Remove-Item -Recurse -Force $nextTarget }
New-Item -ItemType Directory -Path $nextTarget -Force | Out-Null
New-Item -ItemType Junction -Path $nextSource -Target $nextTarget | Out-Null
Write-Host "  .next junction created -> $nextTarget" -ForegroundColor Green

# Step 5: Install packages
Write-Host ""
Write-Host "Step 5: Installing packages (1-3 minutes, normal)..." -ForegroundColor Yellow
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
    Write-Host ""
    Write-Host "  WARNING: .env.local not found!" -ForegroundColor Red
    Write-Host "  You need to create it with your Supabase keys." -ForegroundColor Yellow
    Write-Host "  Copy from: $projectPath\.env.local.example" -ForegroundColor White
    Write-Host "  And fill in the real values from Supabase Dashboard." -ForegroundColor White
}

Write-Host ""
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "  SETUP COMPLETE! Project is ready." -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To start the development server:" -ForegroundColor White
Write-Host ""
Write-Host "  1. Open VS Code" -ForegroundColor Yellow
Write-Host "  2. Open folder: C:\Users\User\OneDrive\Uni Web\university-web" -ForegroundColor Yellow
Write-Host "  3. Open the terminal (Ctrl + backtick)" -ForegroundColor Yellow
Write-Host "  4. Type: npm run dev" -ForegroundColor Yellow
Write-Host "  5. Open browser: http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "DAILY WORKFLOW:" -ForegroundColor Cyan
Write-Host "  Before switching PCs: git add . && git commit -m 'message' && git push" -ForegroundColor White
Write-Host "  When starting on this PC: git pull" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to close"
