# ============================================================
# setup-env.ps1 — Supabase keys for guestbook
# RUN IN PROJECT ROOT: C:\Users\arsh\Documents\projex\portfolio-next
#   powershell -ExecutionPolicy Bypass -File .\setup-env.ps1
# ============================================================
$ErrorActionPreference = 'Stop'
if (-not (Test-Path 'package.json')) { Write-Host 'Galat folder. Project root se chala.' -ForegroundColor Red; exit 1 }

$env = @'
NEXT_PUBLIC_SUPABASE_URL=https://ksmwnhmzvhdzawynnjnz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzbXduaG16dmhkemF3eW5uam56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMTMzMjMsImV4cCI6MjA5Nzc4OTMyM30.nvHqxMud6v0yTRjrmW6TFaAj1xAWavU-e4fL2YtZgrw
'@

Set-Content -Path '.env.local' -Value $env -Encoding UTF8
Write-Host '  created .env.local' -ForegroundColor Green
Write-Host ''
Write-Host 'Baaki: Supabase me table bana + Realtime ON, phir: npm run dev' -ForegroundColor Cyan
