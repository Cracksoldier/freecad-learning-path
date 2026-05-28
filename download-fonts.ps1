# Run this script once to download self-hosted font files into assets/fonts/.
# Usage: ! .\download-fonts.ps1
#
# Latin-subset woff2 files sourced from Google Fonts (Inter v20, JetBrains Mono v24).
# Re-run this script if you need to refresh the fonts after a version bump.

$dir = Join-Path $PSScriptRoot "assets\fonts"
if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }

$fonts = @(
  @{ name = "inter-400.woff2";          url = "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2" },
  @{ name = "inter-500.woff2";          url = "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2" },
  @{ name = "inter-600.woff2";          url = "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2" },
  @{ name = "inter-700.woff2";          url = "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2" },
  @{ name = "jetbrains-mono-400.woff2"; url = "https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxDcwg.woff2" },
  @{ name = "jetbrains-mono-500.woff2"; url = "https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxDcwg.woff2" }
)

foreach ($f in $fonts) {
  $out = Join-Path $dir $f.name
  Write-Host "Downloading $($f.name)..."
  Invoke-WebRequest -Uri $f.url -OutFile $out -UseBasicParsing
  $size = (Get-Item $out).Length
  Write-Host "  -> $size bytes"
}

Write-Host ""
Write-Host "Done. Font files are in $dir"
