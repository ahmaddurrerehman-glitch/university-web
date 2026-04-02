# ================================================================
# INSTALL AUTO-SYNC — Run this ONCE on each PC
# ================================================================
# This registers auto-sync.ps1 as a Windows startup task.
# After running this, auto-sync starts automatically every time
# you log in — no manual steps needed.
#
# HOW TO RUN:
# 1. Right-click this file → "Run with PowerShell"
# 2. Click "Yes" if Windows asks for permission
# ================================================================

$taskName    = "CIMS-UniWeb-AutoSync"
$scriptPath  = "C:\Users\User\OneDrive\Uni Web\university-web\auto-sync.ps1"
$psExe       = "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe"

Write-Host ""
Write-Host "=== Installing Auto-Sync for CIMS University Web ===" -ForegroundColor Cyan
Write-Host ""

# ── Step 1: Verify the sync script exists ────────────────────────
if (-not (Test-Path $scriptPath)) {
    Write-Host "ERROR: auto-sync.ps1 not found at:" -ForegroundColor Red
    Write-Host "  $scriptPath" -ForegroundColor Red
    Write-Host "Make sure you are running this from the university-web folder." -ForegroundColor Yellow
    Read-Host "Press Enter to close"
    exit 1
}
Write-Host "  auto-sync.ps1 found." -ForegroundColor Green

# ── Step 2: Remove old task if exists ────────────────────────────
$existing = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
if ($existing) {
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
    Write-Host "  Old task removed (will be replaced)." -ForegroundColor White
}

# ── Step 3: Create the Task Scheduler task ───────────────────────
Write-Host ""
Write-Host "Step 1: Registering Windows startup task..." -ForegroundColor Yellow

$action = New-ScheduledTaskAction `
    -Execute $psExe `
    -Argument "-WindowStyle Hidden -NonInteractive -ExecutionPolicy Bypass -File `"$scriptPath`""

# Trigger: run at logon for this user
$trigger = New-ScheduledTaskTrigger -AtLogOn -User $env:USERNAME

# Settings: run silently, restart if it fails, no time limit
$settings = New-ScheduledTaskSettingsSet `
    -Hidden `
    -ExecutionTimeLimit ([TimeSpan]::Zero) `
    -RestartCount 3 `
    -RestartInterval (New-TimeSpan -Minutes 1) `
    -MultipleInstances IgnoreNew

# Run as current user, highest privileges
$principal = New-ScheduledTaskPrincipal `
    -UserId $env:USERNAME `
    -LogonType Interactive `
    -RunLevel Highest

Register-ScheduledTask `
    -TaskName $taskName `
    -Action $action `
    -Trigger $trigger `
    -Settings $settings `
    -Principal $principal `
    -Description "Auto-syncs CIMS University Web project with GitHub" `
    -Force | Out-Null

Write-Host "  Task registered: '$taskName'" -ForegroundColor Green

# ── Step 4: Start it right now (don't wait for next login) ───────
Write-Host ""
Write-Host "Step 2: Starting auto-sync now..." -ForegroundColor Yellow
Start-ScheduledTask -TaskName $taskName
Start-Sleep -Seconds 2

$state = (Get-ScheduledTask -TaskName $taskName).State
Write-Host "  Task state: $state" -ForegroundColor Green

# ── Step 5: Verify log file appears ──────────────────────────────
Write-Host ""
Write-Host "Step 3: Checking sync log..." -ForegroundColor Yellow
Start-Sleep -Seconds 5
$logFile = "$env:LOCALAPPDATA\uni-web-sync.log"
if (Test-Path $logFile) {
    Write-Host "  Log file created. Auto-sync is working!" -ForegroundColor Green
    Write-Host ""
    Write-Host "  Last log entries:" -ForegroundColor White
    Get-Content $logFile | Select-Object -Last 5 | ForEach-Object { Write-Host "    $_" -ForegroundColor DarkGray }
} else {
    Write-Host "  Log not created yet (may take a few seconds)." -ForegroundColor Yellow
    Write-Host "  Check: $logFile" -ForegroundColor White
}

# ── Done ─────────────────────────────────────────────────────────
Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  AUTO-SYNC INSTALLED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "What happens now:" -ForegroundColor White
Write-Host "  * Every time you save a file, it will auto-push to GitHub" -ForegroundColor White
Write-Host "    (after a 60-second delay to batch your changes)" -ForegroundColor White
Write-Host "  * Every 2 minutes it checks GitHub for changes from your other PC" -ForegroundColor White
Write-Host "  * This runs silently in the background — you won't see anything" -ForegroundColor White
Write-Host ""
Write-Host "To check sync activity, open this file:" -ForegroundColor Yellow
Write-Host "  $logFile" -ForegroundColor Cyan
Write-Host ""
Write-Host "To stop auto-sync:" -ForegroundColor Yellow
Write-Host "  Open Task Scheduler → find '$taskName' → right-click → Disable" -ForegroundColor White
Write-Host ""
Write-Host "IMPORTANT: Run this same script on your OTHER PC too!" -ForegroundColor Yellow
Write-Host ""
Read-Host "Press Enter to close"
