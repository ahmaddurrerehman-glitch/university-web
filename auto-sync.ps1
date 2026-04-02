# ================================================================
# AUTO-SYNC - CIMS University Web
# ================================================================
# Runs every 5 minutes via Task Scheduler (not a daemon).
# Each run:
#   1. Pushes any uncommitted local changes to GitHub
#   2. Pulls any new changes from your other PC
# ================================================================

$ProjectPath = "C:\Users\User\OneDrive\Uni Web\university-web"
$GitExe      = "C:\Program Files\Git\mingw64\bin\git.exe"
$LogFile     = "C:\Users\User\AppData\Local\uni-web-sync.log"

# Suppress git credential prompts (use only cached credentials)
$env:GIT_TERMINAL_PROMPT = "0"
$env:GCM_INTERACTIVE     = "never"

# ----- Helpers ---------------------------------------------------

function Log($msg) {
    $ts   = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $line = "[$ts] $msg"
    try { [System.IO.File]::AppendAllText($LogFile, $line + "`r`n") } catch {}
}

function Git-Run {
    param([string[]]$Arguments)
    $out = & $GitExe -C $ProjectPath @Arguments 2>&1
    return ($out -join " | ")
}

function Has-Changes {
    $out = & $GitExe -C $ProjectPath "status" "--porcelain" 2>&1
    $lines = $out | Where-Object { "$_".Trim() -ne "" }
    return ($lines.Count -gt 0)
}

# ----- Trim old log ----------------------------------------------
try {
    if (Test-Path $LogFile) {
        $lines = [System.IO.File]::ReadAllLines($LogFile)
        if ($lines.Count -gt 500) {
            [System.IO.File]::WriteAllLines($LogFile, ($lines | Select-Object -Last 300))
        }
    }
} catch {}

# ----- Main ------------------------------------------------------

Log "--- Auto-sync run on $env:COMPUTERNAME ---"

# Step 1: Push local changes to GitHub
if (Has-Changes) {
    Log "Local changes found. Committing..."
    Git-Run "add", "." | Out-Null
    $when   = Get-Date -Format "yyyy-MM-dd HH:mm"
    $pcName = if ($env:COMPUTERNAME) { $env:COMPUTERNAME } else { "PC" }
    Git-Run "commit", "-m", "Auto-sync ($pcName) $when" | Out-Null

    $push = Git-Run "push", "origin", "main"
    if ($push -match "error|rejected") {
        Log "Push rejected - pulling first..."
        Git-Run "pull", "--no-rebase", "origin", "main" | Out-Null
        $push2 = Git-Run "push", "origin", "main"
        Log "Pushed after merge: $push2"
    } else {
        Log "Pushed: changes sent to GitHub"
    }
} else {
    # Step 2: Pull new changes from GitHub (only when nothing to commit)
    $pull = Git-Run "pull", "--no-rebase", "origin", "main"
    if ($pull -match "Already up to date" -or $pull.Trim() -eq "") {
        Log "Up to date - no changes from other PC"
    } elseif ($pull -match "error|CONFLICT") {
        Log "PULL ERROR: $pull"
    } else {
        Log "Pulled new changes: $pull"
    }
}

Log "--- Done ---"
