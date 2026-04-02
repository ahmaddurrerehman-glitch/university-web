# ============================================================
# FIX SYNC - PC1 Setup Script
# Run this ONCE on PC1 to stop OneDrive from fighting node_modules
#
# HOW TO RUN:
# 1. Right-click this file in File Explorer
# 2. Click "Run with PowerShell"
# 3. If it asks to allow, click "Yes"
# ============================================================

$projectPath = "C:\Users\User\OneDrive\Uni Web\university-web"
$externalBase = "C:\Users\User\AppData\Local\uni-web-deps"

Write-Host "=== CIMS University Web - Sync Fixer ===" -ForegroundColor Cyan
Write-Host ""

# Step 1: Create external storage folder
Write-Host "Step 1: Creating external storage (outside OneDrive)..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path "$externalBase" -Force | Out-Null
Write-Host "  Created: $externalBase" -ForegroundColor Green

# Step 2: Handle node_modules
Write-Host ""
Write-Host "Step 2: Moving node_modules outside OneDrive..." -ForegroundColor Yellow
$nmSource = "$projectPath\node_modules"
$nmTarget = "$externalBase\node_modules"

if (Test-Path $nmSource) {
    $item = Get-Item $nmSource -Force -ErrorAction SilentlyContinue
    if ($item.LinkType -eq 'Junction') {
        Write-Host "  node_modules is already a junction. Nothing to do." -ForegroundColor Green
    } else {
        Write-Host "  Moving node_modules (this takes 30-60 seconds)..." -ForegroundColor White
        if (Test-Path $nmTarget) { Remove-Item -Recurse -Force $nmTarget }
        Move-Item -Path $nmSource -Destination $nmTarget
        New-Item -ItemType Junction -Path $nmSource -Target $nmTarget | Out-Null
        Write-Host "  Done! node_modules moved to AppData and linked." -ForegroundColor Green
    }
} else {
    Write-Host "  node_modules not found. Creating junction for after npm install..." -ForegroundColor White
    New-Item -ItemType Directory -Path $nmTarget -Force | Out-Null
    New-Item -ItemType Junction -Path $nmSource -Target $nmTarget | Out-Null
    Write-Host "  Junction created. Run 'npm install' after this script." -ForegroundColor Yellow
}

# Step 3: Handle .next
Write-Host ""
Write-Host "Step 3: Moving .next build folder outside OneDrive..." -ForegroundColor Yellow
$nextSource = "$projectPath\.next"
$nextTarget = "$externalBase\.next"

if (Test-Path $nextSource) {
    $item = Get-Item $nextSource -Force -ErrorAction SilentlyContinue
    if ($item.LinkType -eq 'Junction') {
        Write-Host "  .next is already a junction. Nothing to do." -ForegroundColor Green
    } else {
        Write-Host "  Deleting .next build folder (1GB, gets rebuilt automatically)..." -ForegroundColor White
        Remove-Item -Recurse -Force $nextSource
        New-Item -ItemType Directory -Path $nextTarget -Force | Out-Null
        New-Item -ItemType Junction -Path $nextSource -Target $nextTarget | Out-Null
        Write-Host "  Done! .next linked outside OneDrive." -ForegroundColor Green
    }
} else {
    New-Item -ItemType Directory -Path $nextTarget -Force | Out-Null
    New-Item -ItemType Junction -Path $nextSource -Target $nextTarget | Out-Null
    Write-Host "  .next junction created." -ForegroundColor Green
}

Write-Host ""
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "  ALL DONE!" -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "What was fixed:" -ForegroundColor White
Write-Host "  - node_modules (290MB) moved OUTSIDE OneDrive" -ForegroundColor White
Write-Host "  - .next (1GB) deleted and moved OUTSIDE OneDrive" -ForegroundColor White
Write-Host "  - OneDrive no longer syncs 1.2GB of generated files" -ForegroundColor White
Write-Host "  - Your source code still syncs normally" -ForegroundColor White
Write-Host ""
Write-Host "DAILY WORKFLOW:" -ForegroundColor Cyan
Write-Host "  Before switching to PC2:  git push" -ForegroundColor Yellow
Write-Host "  When starting on PC2:     git pull (then npm install if packages changed)" -ForegroundColor Yellow
Write-Host ""
Read-Host "Press Enter to close"
