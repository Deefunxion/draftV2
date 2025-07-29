# PowerShell script to apply Living Margin system to remaining HTML files

$files = @(
    "didaskalia.html",
    "themelion.html", 
    "digital_assets\index.html",
    "neo\index.html"
)

$headerAddition = @'
    <link rel="stylesheet" href="assets/fontawesome/css/all.min.css">
</head>
<body>
    <!-- Living Margin Canvas - The Creative Edge for Reading -->
    <canvas id="living-margin-canvas"></canvas>
    
    <!-- Clear Doodles Button -->
    <button id="clear-doodles-btn" title="Καθαρισμός Σκίτσων">
        <i class="fa-solid fa-eraser"></i>
    </button>
'@

$scriptAddition = @'
    <script src="learning-path.js"></script>
    <script src="aiq-tracker.js"></script>
    <script src="doodler.js"></script>
'@

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Processing $file..."
        
        $content = Get-Content $file -Raw
        
        # Add FontAwesome and Living Margin elements  
        $content = $content -replace '</head>\s*<body>', $headerAddition
        
        # Add scripts before closing body tag
        $content = $content -replace '</body>', "$scriptAddition`n</body>"
        
        Set-Content $file $content
        Write-Host "Updated $file"
    } else {
        Write-Host "File not found: $file"
    }
}

Write-Host "Living Margin system applied to all files!"
