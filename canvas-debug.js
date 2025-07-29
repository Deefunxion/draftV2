// Debug Script for Canvas Issues
console.log('=== CANVAS DEBUG START ===');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    const leftCanvas = document.getElementById('living-margin-canvas');
    const rightCanvas = document.getElementById('living-margin-canvas-right');
    
    console.log('Left canvas found:', !!leftCanvas);
    console.log('Right canvas found:', !!rightCanvas);
    
    if (leftCanvas) {
        const rect = leftCanvas.getBoundingClientRect();
        console.log('Left canvas rect:', rect);
        alert(`Left Canvas: ${rect.width}x${rect.height} at (${rect.left}, ${rect.top})`);
    } else {
        alert('Left canvas NOT FOUND!');
    }
    
    if (rightCanvas) {
        const rect = rightCanvas.getBoundingClientRect();
        console.log('Right canvas rect:', rect);
        alert(`Right Canvas: ${rect.width}x${rect.height} at (${rect.left}, ${rect.top})`);
    } else {
        alert('Right canvas NOT FOUND!');
    }
});

console.log('=== CANVAS DEBUG END ===');
