@echo off
echo.
echo ========================================
echo   🎨 Live Theme System - Quick Start
echo ========================================
echo.

echo 📁 Checking files...
if not exist "theme-switcher.css" (
    echo ❌ theme-switcher.css not found!
    pause
    exit /b 1
)

if not exist "theme-switcher.js" (
    echo ❌ theme-switcher.js not found!
    pause
    exit /b 1
)

if not exist "live-theme-demo.html" (
    echo ❌ live-theme-demo.html not found!
    pause
    exit /b 1
)

echo ✅ All theme system files found!
echo.

echo 🚀 Starting live theme demo...
echo.
echo The demo will open in your default browser.
echo You can then:
echo   • Use the theme switcher in the top-right corner
echo   • Try keyboard shortcuts (Ctrl+Shift+1-9)
echo   • Experience all 12 design themes instantly
echo.

start "" "live-theme-demo.html"

echo ✅ Demo launched successfully!
echo.
echo 📋 Quick Reference:
echo   • Ctrl/Cmd + Shift + T = Toggle theme switcher
echo   • Ctrl/Cmd + Shift + 1-9 = Switch to specific theme
echo   • Ctrl/Cmd + Shift + 0 = Random theme
echo.
echo 🔗 Integration:
echo   1. Include theme-switcher.css in your HTML
echo   2. Include theme-switcher.js before closing body tag
echo   3. The theme switcher will auto-initialize!
echo.
echo 🎨 Enjoy exploring the 12 professional themes!
echo.
pause
