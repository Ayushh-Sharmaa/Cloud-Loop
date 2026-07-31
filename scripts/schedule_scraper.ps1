# Cloud-Loop Scraper Windows Scheduler Setup Script
# Run this script in an Administrator PowerShell window to schedule the job scraper to run every 4 hours automatically.

$ScriptName = "CloudLoopJobScraper"
$ScriptPath = Join-Path (Get-Item -Path $PSScriptRoot).FullName "scrape_jobs.py"
$WorkingDirectory = (Get-Item -Path $PSScriptRoot).FullName

# Verify Python is available
try {
    $pythonPath = Get-Command python -ErrorAction Stop | Select-Object -ExpandProperty Source
    Write-Host "Found Python at: $pythonPath" -ForegroundColor Green
} catch {
    Write-Host "Error: Python is not installed or not in your system PATH." -ForegroundColor Red
    Write-Host "Please install Python before scheduling the task." -ForegroundColor Yellow
    Exit
}

# Create Task Action
$Action = New-ScheduledTaskAction -Execute "python.exe" -Argument "`"$ScriptPath`"" -WorkingDirectory $WorkingDirectory

# Create Task Trigger (every 4 hours, indefinitely)
$Time = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(1) -RepetitionInterval (New-TimeSpan -Hours 4)

# Create Task Settings (allow running on battery, wake computer if supported)
$Settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

# Register Scheduled Task
try {
    Register-ScheduledTask -TaskName $ScriptName -Action $Action -Trigger $Time -Settings $Settings -Description "Runs the Cloud-Loop job and internship scraper automatically every 4 hours." -Force
    Write-Host "Successfully registered scheduled task '$ScriptName'!" -ForegroundColor Green
    Write-Host "It is scheduled to run every 4 hours starting now." -ForegroundColor Green
    Write-Host "You can monitor and manage this task via the Windows Task Scheduler app." -ForegroundColor Yellow
} catch {
    Write-Host "Failed to register scheduled task: $_" -ForegroundColor Red
    Write-Host "Please make sure you are running this PowerShell window as an Administrator." -ForegroundColor Yellow
}
