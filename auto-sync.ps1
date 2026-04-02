# ================================================================
# AUTO-SYNC DAEMON — CIMS University Web
# ================================================================
# Runs silently in the background.
# - Watches your code for changes and auto-pushes to GitHub
# - Pulls the latest from GitHub every 2 minutes
# - So changes from your OTHER PC appear automatically
#
# You never need to manually run git push/pull again.
# ================================================================

$ProjectPath    = "C:\Users\User\OneDrive\Uni Web\university-web"
$GitExe         = "C:\Program Files\Git\mingw64\bin\git.exe"
$LogFile        = "$env:LOCALAPPDATA\uni-web-sync.log"
$CommitDelay    = 60        # seconds to wait after last save before committing
$PullEvery      = 2         # minutes between auto-pulls

# ── Helpers ──────────────────────────────────────────────────────

function Log($msg) {
    $ts = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $line = "[$ts] $msg"
    Add-Content -Path $LogFile -Value $line -ErrorAction SilentlyContinue
    # Keep log under 500 lines
    try {
        $lines = Get-Content $LogFile -ErrorAction SilentlyContinue
        if ($lines.Count -gt 500) {
            $lines | Select-Object -Last 300 | Set-Content $LogFile
        }
    } catch {}
}

function Git {
    param([string[]]$Arguments)
    $output = & $GitExe -C $ProjectPath @Arguments 2>&1
    return $output -join "`n"
}

function Has-Changes {
    $status = Git "status", "--porcelain"
    return ($status.Trim() -ne "")
}

function Do-Pull {
    $result = Git "pull", "--rebase", "origin", "main"
    if ($result -match "Already up to date" -or $result.Trim() -eq "") {
        # nothing new — stay silent
    } elseif ($result -match "error|conflict|CONFLICT") {
        Log "PULL ERROR — check your project: $result"
    } else {
        Log "Pulled from GitHub: $result"
    }
}

function Do-Commit-And-Push {
    # Final check — has anything actually changed?
    if (-not (Has-Changes)) { return }

    Git "add", "." | Out-Null

    $when = Get-Date -Format "yyyy-MM-dd HH:mm"
    $pcName = $env:COMPUTERNAME
    Git "commit", "-m", "Auto-sync ($pcName) $when" | Out-Null

    $push = Git "push", "origin", "main"
    if ($push -match "error|rejected") {
        # Remote has new commits — pull first, then push
        Log "Push rejected — pulling first..."
        Do-Pull
        Git "push", "origin", "main" | Out-Null
        Log "Pushed after merge."
    } else {
        Log "Pushed to GitHub ($when)"
    }
}

# ── Start ────────────────────────────────────────────────────────

Log "=============================="
Log "Auto-sync started on $env:COMPUTERNAME"
Log "Watching: $ProjectPath"
Log "=============================="

# Pull once immediately so this PC is up to date
Do-Pull
$lastPull     = [DateTime]::Now
$firstSeen    = $null          # when we first noticed current changes

# ── Main Loop ────────────────────────────────────────────────────
while ($true) {
    Start-Sleep -Seconds 30

    $now = [DateTime]::Now

    if (Has-Changes) {
        # Record when we first saw these changes
        if ($null -eq $firstSeen) {
            $firstSeen = $now
            Log "Changes detected — will commit in $CommitDelay seconds if no more edits..."
        }

        # Only commit once file has been stable for $CommitDelay seconds
        if (($now - $firstSeen).TotalSeconds -ge $CommitDelay) {
            Do-Commit-And-Push
            $firstSeen = $null
            $lastPull  = $now   # reset pull timer (we just synced)
        }

    } else {
        # No local changes — reset timer
        $firstSeen = $null

        # Auto-pull on schedule
        if (($now - $lastPull).TotalMinutes -ge $PullEvery) {
            Do-Pull
            $lastPull = $now
        }
    }
}
