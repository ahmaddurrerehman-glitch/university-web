# ================================================================
# INSTALL AUTO-SYNC - Run this ONCE on each PC
# ================================================================
# Sets up auto-sync to run every 5 minutes automatically.
# Works via Windows Task Scheduler.
#
# HOW TO RUN:
# 1. Right-click this file -> "Run with PowerShell"
# 2. Click "Yes" if Windows asks for permission
# ================================================================

$taskName  = "CIMS-UniWeb-AutoSync"
$script    = "C:\Users\User\OneDrive\Uni Web\university-web\auto-sync.ps1"
$psExe     = "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe"
$logFile   = "C:\Users\User\AppData\Local\uni-web-sync.log"

Write-Host ""
Write-Host "=== Installing Auto-Sync for CIMS University Web ===" -ForegroundColor Cyan
Write-Host ""

if (-not (Test-Path $script)) {
    Write-Host "ERROR: auto-sync.ps1 not found." -ForegroundColor Red
    Read-Host "Press Enter to close"
    exit 1
}

# Remove old task if exists
Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue

# Build the task
$psArgs  = "-NonInteractive -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$script`""
$action  = New-ScheduledTaskAction -Execute $psExe -Argument $psArgs

# Triggers: at login + repeat every 5 minutes forever
$atLogin = New-ScheduledTaskTrigger -AtLogOn -User $env:USERNAME
$repeat  = New-ScheduledTaskTrigger -RepetitionInterval (New-TimeSpan -Minutes 5) `
                                     -Once `
                                     -At (Get-Date)
$atLogin.Repetition = $repeat.Repetition

$settings = New-ScheduledTaskSettingsSet `
    -Hidden `
    -ExecutionTimeLimit (New-TimeSpan -Minutes 4) `
    -DisallowStartIfOnBatteries $false `
    -StopIfGoingOnBatteries $false `
    -MultipleInstances IgnoreNew

# Register
try {
    Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $atLogin -Settings $settings -Force | Out-Null
    Write-Host "  Task scheduler: registered '$taskName'" -ForegroundColor Green
} catch {
    Write-Host "  Task Scheduler failed: $($_.Exception.Message)" -ForegroundColor Yellow
    Write-Host "  Using Registry fallback instead..." -ForegroundColor Yellow

    # Fallback: Registry Run key (always works without admin)
    $regCmd = "powershell -NonInteractive -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$script`""
    Set-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Run" -Name "CIMSAutoSync" -Value $regCmd
    Write-Host "  Registry startup key set." -ForegroundColor Green
}

# Also set Registry Run as backup
$regCmd = "powershell -NonInteractive -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$script`""
Set-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Run" -Name "CIMSAutoSync" -Value $regCmd
Write-Host "  Registry backup: set startup key" -ForegroundColor Green

# Run it immediately now
Write-Host ""
Write-Host "Running sync now..." -ForegroundColor Yellow
& $psExe -NonInteractive -ExecutionPolicy Bypass -File $script
Write-Host ""

# Check log
if (Test-Path $logFile) {
    Write-Host "Sync log (last 5 lines):" -ForegroundColor White
    [System.IO.File]::ReadAllLines($logFile) | Select-Object -Last 5 | ForEach-Object {
        Write-Host "  $_" -ForegroundColor DarkGray
    }
}

Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "  AUTO-SYNC INSTALLED!" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "What happens now:" -ForegroundColor White
Write-Host "  * Every 5 minutes: auto-commits your changes to GitHub" -ForegroundColor White
Write-Host "  * Every 5 minutes: pulls updates from your other PC" -ForegroundColor White
Write-Host "  * Starts automatically when you log into Windows" -ForegroundColor White
Write-Host ""
Write-Host "Check sync activity at:" -ForegroundColor Yellow
Write-Host "  $logFile" -ForegroundColor Cyan
Write-Host ""
Write-Host "IMPORTANT: Run this same script on your OTHER PC too!" -ForegroundColor Yellow
Write-Host ""
Read-Host "Press Enter to close"
