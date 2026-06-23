# ============================================================
# fix-gitignore.ps1 - node_modules ko git se nikaalo
# RUN IN PROJECT ROOT: C:\Users\arsh\Documents\projex\portfolio-next
#   powershell -ExecutionPolicy Bypass -File .\fix-gitignore.ps1
# ============================================================
$ErrorActionPreference = 'Stop'
if (-not (Test-Path 'package.json')) { Write-Host 'Galat folder. Project root se chala.' -ForegroundColor Red; exit 1 }

# 1) proper .gitignore likho
$gi = @'
# deps
/node_modules
# next build
/.next
/out
# env (Supabase keys yahan - kabhi commit mat karo)
.env*.local
# misc
.DS_Store
*.log
npm-debug.log*
/build
.vercel
'@
Set-Content -Path '.gitignore' -Value $gi -Encoding UTF8
Write-Host '  .gitignore written' -ForegroundColor Green

# 2) git cache se hata do (disk pe rahenge, sirf git se nikalenge)
git rm -r --cached node_modules 2>$null
git rm -r --cached .next 2>$null
git rm --cached .env.local 2>$null
git rm --cached .env 2>$null

# 3) commit + push
git add .gitignore
git add -A
git commit -m "chore: gitignore node_modules, .next, env"
git push

Write-Host ''
Write-Host 'Done. node_modules ab GitHub se hat gaya (local pe safe hai).' -ForegroundColor Cyan
