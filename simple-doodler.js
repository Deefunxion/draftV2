/**
 * Simple Doodler - Minimal Working Version
 */

class SimpleDoodler {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.isDrawing = false;
        this.strokeColor = '#4f46e5';
        this.strokeWidth = 2;
        
        this.init();
    }
    
    init() {
        // Find canvas
        this.canvas = document.getElementById('living-margin-canvas');
        if (!this.canvas) {
            console.log('Canvas not found!');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.setupCanvas();
        this.setupEvents();
        
        console.log('Simple Doodler initialized');
    }
    
    setupCanvas() {
        // Set canvas size
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        
        // Set drawing style
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.lineWidth = this.strokeWidth;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        
        console.log(`Canvas size: ${this.canvas.width}x${this.canvas.height}`);
    }
    
    setupEvents() {
        // Mouse events
        this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('mouseout', () => this.stopDrawing());
        
        // Touch events
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.startDrawing(e.touches[0]);
        });
        
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.draw(e.touches[0]);
        });
        
        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.stopDrawing();
        });
        
        console.log('Events setup complete');
    }
    
    getCoords(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }
    
    startDrawing(e) {
        this.isDrawing = true;
        const coords = this.getCoords(e);
        this.ctx.beginPath();
        this.ctx.moveTo(coords.x, coords.y);
        console.log('Started drawing at:', coords);
    }
    
    draw(e) {
        if (!this.isDrawing) return;
        
        const coords = this.getCoords(e);
        this.ctx.lineTo(coords.x, coords.y);
        this.ctx.stroke();
    }
    
    stopDrawing() {
        this.isDrawing = false;
        console.log('Stopped drawing');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Creating Simple Doodler...');
    window.simpleDoodler = new SimpleDoodler();
});
