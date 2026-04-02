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
if (-not (Test-Path $externalBase)) {
    New-Item -ItemType Directory -Path $externalBase -Force | Out-Null
    Write-Host "  Created: $externalBase" -ForegroundColor Green
} else {
    Write-Host "  Already exists: $externalBase" -ForegroundColor Green
}

# Step 2: Handle node_modules
Write-Host ""
Write-Host "Step 2: Moving node_modules outside OneDrive..." -ForegroundColor Yellow
$nmSource = "$projectPath\node_modules"
$nmTarget = "$externalBase\node_modules"

if (Test-Path $nmSource) {
    $isJunction = (Get-Item $nmSource -ErrorAction SilentlyContinue).Attributes -band [System.IO.FileAttributes]::ReparsePoint
    if ($isJunction) {
        Write-Host "  node_modules is already a junction link. Skipping." -ForegroundColor Green
    } else {
        Write-Host "  Moving node_modules... (this may take 30-60 seconds)" -ForegroundColor White
        if (Test-Path $nmTarget) {
            Remove-Item -Recurse -Force $nmTarget
        }
        Move-Item -Path $nmSource -Destination $nmTarget
        cmd /c mklink /J "$nmSource" "$nmTarget" | Out-Null
        Write-Host "  Done! node_modules moved and linked." -ForegroundColor Green
    }
} else {
    Write-Host "  node_modules not found. Will create junction after npm install." -ForegroundColor White
    if (-not (Test-Path $nmTarget)) {
        New-Item -ItemType Directory -Path $nmTarget -Force | Out-Null
    }
    cmd /c mklink /J "$nmSource" "$nmTarget" | Out-Null
    Write-Host "  Junction created. Run 'npm install' next." -ForegroundColor Yellow
}

# Step 3: Handle .next
Write-Host ""
Write-Host "Step 3: Moving .next build folder outside OneDrive..." -ForegroundColor Yellow
$nextSource = "$projectPath\.next"
$nextTarget = "$externalBase\.next"

if (Test-Path $nextSource) {
    $isJunction = (Get-Item $nextSource -ErrorAction SilentlyContinue).Attributes -band [System.IO.FileAttributes]::ReparsePoint
    if ($isJunction) {
        Write-Host "  .next is already a junction link. Skipping." -ForegroundColor Green
    } else {
        Write-Host "  Deleting .next (it gets rebuilt automatically)..." -ForegroundColor White
        Remove-Item -Recurse -Force $nextSource
        if (-not (Test-Path $nextTarget)) {
            New-Item -ItemType Directory -Path $nextTarget -Force | Out-Null
        }
        cmd /c mklink /J "$nextSource" "$nextTarget" | Out-Null
        Write-Host "  Done! .next folder linked." -ForegroundColor Green
    }
} else {
    if (-not (Test-Path $nextTarget)) {
        New-Item -ItemType Directory -Path $nextTarget -Force | Out-Null
    }
    cmd /c mklink /J "$nextSource" "$nextTarget" | Out-Null
    Write-Host "  Junction created for .next." -ForegroundColor Green
}

# Step 4: Run npm install
Write-Host ""
Write-Host "Step 4: Installing packages..." -ForegroundColor Yellow
Set-Location $projectPath
npm install
Write-Host "  npm install complete." -ForegroundColor Green

Write-Host ""
Write-Host "=== ALL DONE! ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "What was fixed:" -ForegroundColor White
Write-Host "  - node_modules (290MB) moved OUTSIDE OneDrive to AppData" -ForegroundColor White
Write-Host "  - .next build folder moved OUTSIDE OneDrive to AppData" -ForegroundColor White
Write-Host "  - OneDrive will no longer try to sync 1.2GB of build files" -ForegroundColor White
Write-Host "  - Your source code still syncs via OneDrive normally" -ForegroundColor White
Write-Host ""
Write-Host "DAILY WORKFLOW:" -ForegroundColor Cyan
Write-Host "  Before switching to PC2: git push" -ForegroundColor Yellow
Write-Host "  When starting on PC2:    git pull, then npm install if needed" -ForegroundColor Yellow
Write-Host ""
Read-Host "Press Enter to close"
