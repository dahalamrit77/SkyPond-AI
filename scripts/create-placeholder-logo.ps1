$ErrorActionPreference = 'Stop'
$publicDir = Join-Path (Join-Path $PSScriptRoot '..') 'public'
New-Item -ItemType Directory -Force -Path $publicDir | Out-Null
$out = Join-Path $publicDir 'logosymbol.png'
Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap 36, 36
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.Clear([System.Drawing.Color]::FromArgb(255, 227, 239, 246))
$g.Dispose()
$bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Output "Wrote $out"
