<#
.SYNOPSIS
    SpecForge — Universal Global Installer for Windows (PowerShell)
    Supports: Google Antigravity (Full Plugin + Hook + Rules), Claude Code, Cursor, Windsurf
.PARAMETER Uninstall
    Removes SpecForge global installations.
#>
param(
    [switch]$Uninstall
)

$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$PluginName = "spec-forge"
$Skills = @("spec-init", "spec-slice", "spec-evolve", "spec-audit")
$UserHome = [Environment]::GetFolderPath("UserProfile")

function Install-SkillsInto {
    param([string]$TargetDir, [string]$Label)
    if (-not (Test-Path $TargetDir)) {
        New-Item -ItemType Directory -Force -Path $TargetDir | Out-Null
    }
    foreach ($skill in $Skills) {
        $dest = Join-Path $TargetDir $skill
        if (Test-Path $dest) { Remove-Item -Recurse -Force $dest }
        Copy-Item -Recurse -Force (Join-Path $ScriptDir "skills\$skill") $dest
    }
    Write-Host "  [OK] Installed 4 SpecForge skills for $Label -> $TargetDir" -ForegroundColor Green
}

function Uninstall-SkillsFrom {
    param([string]$TargetDir, [string]$Label)
    if (Test-Path $TargetDir) {
        foreach ($skill in $Skills) {
            $dest = Join-Path $TargetDir $skill
            if (Test-Path $dest) { Remove-Item -Recurse -Force $dest }
        }
        Write-Host "  [OK] Removed SpecForge skills from $Label ($TargetDir)" -ForegroundColor Yellow
    }
}

$AgyPluginDir = Join-Path $UserHome ".gemini\config\plugins\$PluginName"

if ($Uninstall) {
    Write-Host "Uninstalling $PluginName..." -ForegroundColor Cyan
    if (Get-Command agy -ErrorAction SilentlyContinue) {
        try { agy plugin uninstall $PluginName | Out-Null } catch {}
    }
    if (Test-Path $AgyPluginDir) {
        Remove-Item -Recurse -Force $AgyPluginDir
    }
    Write-Host "  [OK] Removed Antigravity global plugin ($AgyPluginDir)" -ForegroundColor Yellow
    Uninstall-SkillsFrom (Join-Path $UserHome ".claude\skills") "Claude Code"
    Uninstall-SkillsFrom (Join-Path $UserHome ".cursor\skills") "Cursor"
    Uninstall-SkillsFrom (Join-Path $UserHome ".codeium\windsurf\skills") "Windsurf"
    Write-Host "Done! Restart your AI IDE / CLI to complete removal." -ForegroundColor Cyan
    exit 0
}

Write-Host "==============================================================" -ForegroundColor Cyan
Write-Host "  SpecForge — Global Spec-Driven AI Development Installer" -ForegroundColor Cyan
Write-Host "==============================================================" -ForegroundColor Cyan

$InstalledViaCli = $false
if (Get-Command agy -ErrorAction SilentlyContinue) {
    try {
        agy plugin install $ScriptDir | Out-Null
        if ($LASTEXITCODE -eq 0) {
            $InstalledViaCli = $true
            Write-Host "  [OK] Installed full Antigravity plugin via 'agy plugin install'" -ForegroundColor Green
        }
    } catch {}
}

if (-not $InstalledViaCli) {
    if (Test-Path $AgyPluginDir) { Remove-Item -Recurse -Force $AgyPluginDir }
    New-Item -ItemType Directory -Force -Path $AgyPluginDir | Out-Null
    foreach ($item in @("plugin.json", "hooks.json", "assets", "rules", "scripts", "skills", "README.md")) {
        Copy-Item -Recurse -Force (Join-Path $ScriptDir $item) (Join-Path $AgyPluginDir $item)
    }
    Write-Host "  [OK] Installed full Antigravity plugin -> $AgyPluginDir" -ForegroundColor Green
}

if (Test-Path (Join-Path $UserHome ".claude")) {
    Install-SkillsInto (Join-Path $UserHome ".claude\skills") "Claude Code"
}
if (Test-Path (Join-Path $UserHome ".cursor")) {
    Install-SkillsInto (Join-Path $UserHome ".cursor\skills") "Cursor"
}
if (Test-Path (Join-Path $UserHome ".codeium\windsurf")) {
    Install-SkillsInto (Join-Path $UserHome ".codeium\windsurf\skills") "Windsurf"
}

Write-Host ""
Write-Host "SpecForge v1.0.0 is installed globally!" -ForegroundColor Green
Write-Host "-> Restart Antigravity / your AI IDE so the new plugin, Smart Gate hook, and skills load."
Write-Host "-> Start any new project by asking: 'Use spec-init to specify my project'"
