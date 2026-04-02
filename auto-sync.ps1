# ================================================================
# AUTO-SYNC DAEMON - CIMS University Web
# ================================================================
# Runs silently in the background.
#   - Watches your code for changes and auto-pushes to GitHub
#   - Pulls the latest from GitHub every 2 minutes
#   - Changes from your OTHER PC appear automatically
#
# You never need to manually run git push/pull again.
# ================================================================

$ProjectPath = "C:\Users\User\OneDrive\Uni Web\university-web"
$GitExe      = "C:\Program Files\Git\mingw64\bin\git.exe"
$LogFile     = "C:\Users\User\AppData\Local\uni-web-sync.log"
$CommitDelay = 60   # seconds to wait after last save before committing
$PullEvery   = 2    # minutes between auto-pulls

# ----- Helpers ---------------------------------------------------

function Log($msg) {
    $ts   = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $line = "[$ts] $msg"
    try { [System.IO.File]::AppendAllText($LogFile, $line + "`r`n") } catch {}
    # Trim log to last 300 lines if over 500
    try {
        $lines = [System.IO.File]::ReadAllLines($LogFile)
        if ($lines.Count -gt 500) {
            [System.IO.File]::WriteAllLines($LogFile, ($lines | Select-Object -Last 300))
        }
    } catch {}
}

function Git-Run([string[]]$Arguments) {
    $out = & $GitExe -C $ProjectPath @Arguments 2>&1
    return ($out -join " | ")
}

function Has-Changes {
    $status = & $GitExe -C $ProjectPath status --porcelain 2>&1
    return (($status | Where-Object { $_ -match '\S' }).Count -gt 0)
}

function Do-Pull {
    if (Has-Changes) {
        Log "Skipping pull - you have uncommitted changes locally"
        return
    }
    $result = Git-Run "pull", "--no-rebase", "origin", "main"
    if ($result -match "Already up to date" -or $result.Trim() -eq "") {
        # nothing new - stay silent
    } elseif ($result -match "error|conflict|CONFLICT") {
        Log "PULL ERROR - check your project: $result"
    } else {
        Log "Pulled from GitHub: $result"
    }
}

function Do-Commit-And-Push {
    if (-not (Has-Changes)) { return }

    & $GitExe -C $ProjectPath add "." 2>&1 | Out-Null

    $when   = Get-Date -Format "yyyy-MM-dd HH:mm"
    $pcName = $env:COMPUTERNAME
    & $GitExe -C $ProjectPath commit -m "Auto-sync ($pcName) $when" 2>&1 | Out-Null

    $push = Git-Run "push", "origin", "main"
    if ($push -match "error|rejected") {
        Log "Push rejected - pulling first..."
        Git-Run "pull", "--no-rebase", "origin", "main" | Out-Null
        Git-Run "push", "origin", "main" | Out-Null
        Log "Pushed after merge."
    } else {
        Log "Pushed to GitHub at $when from $pcName"
    }
}

# ----- Start -----------------------------------------------------

Log "=============================="
Log "Auto-sync started on $env:COMPUTERNAME"
Log "Watching: $ProjectPath"
Log "=============================="

Do-Pull
$lastPull  = [DateTime]::Now
$firstSeen = $null

# ----- Main Loop -------------------------------------------------

while ($true) {
    Start-Sleep -Seconds 30

    $now = [DateTime]::Now

    if (Has-Changes) {
        if ($null -eq $firstSeen) {
            $firstSeen = $now
            Log "Changes detected - will commit in $CommitDelay seconds..."
        } elseif (($now - $firstSeen).TotalSeconds -ge $CommitDelay) {
            Do-Commit-And-Push
            $firstSeen = $null
            $lastPull  = $now
        }
    } else {
        $firstSeen = $null
        if (($now - $lastPull).TotalMinutes -ge $PullEvery) {
            Do-Pull
            $lastPull = $now
        }
    }
}
