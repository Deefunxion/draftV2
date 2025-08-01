/**
 * Fullscreen Scribbler System - Superior Non-Intrusive Implementation
 * Based on user's technical research manual specifications
 */

class FullscreenScribbler {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.isDrawing = false;
        this.currentPath = [];
        this.allPaths = [];
        
        // Drawing settings
        this.strokeColor = '#4f46e5';
        this.baseStrokeWidth = 2;
        this.opacity = 0.7;
        
        this.init();
    }

    /**
     * Initialize the superior scribbling system
     */
    init() {
        this.setupCanvas();
        this.setupEventListeners();
        
        console.log('✅ Superior Fullscreen Scribbler initialized');
    }

    /**
     * Setup fullscreen canvas
     */
    setupCanvas() {
        this.canvas = document.getElementById('fullscreen-canvas');
        if (!this.canvas) {
            console.error('❌ Fullscreen canvas not found');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        this.setupDrawingStyles();
        
        // Handle window resize
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    /**
     * Resize canvas to match viewport
     */
    resizeCanvas() {
        this.canvas.width = window.innerWidth * window.devicePixelRatio;
        this.canvas.height = window.innerHeight * window.devicePixelRatio;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        this.setupDrawingStyles();
    }

    /**
     * Setup drawing styles
     */
    setupDrawingStyles() {
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.globalAlpha = this.opacity;
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.lineWidth = this.baseStrokeWidth;
        this.ctx.globalCompositeOperation = 'source-over';
    }

    /**
     * Setup event listeners for non-intrusive drawing
     */
    setupEventListeners() {
        // Mouse events
        document.addEventListener('mousedown', (e) => this.startDrawing(e));
        document.addEventListener('mousemove', (e) => this.draw(e));
        document.addEventListener('mouseup', () => this.stopDrawing());

        // Touch events for mobile
        document.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.startDrawing(e.touches[0]);
        });
        
        document.addEventListener('touchmove', (e) => {
            if (this.isDrawing) {
                e.preventDefault();
                this.draw(e.touches[0]);
            }
        });
        
        document.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.stopDrawing();
        });

        // Clear button
        const clearBtn = document.getElementById('clear-doodles-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearCanvas());
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'z') {
                e.preventDefault();
                this.clearCanvas();
            }
        });
    }

    /**
     * Start drawing - activate drawing mode
     */
    startDrawing(e) {
        // Only start drawing if holding Ctrl key (for non-intrusive behavior)
        if (!e.ctrlKey && !e.touches) return;
        
        this.isDrawing = true;
        
        // Activate drawing mode
        document.body.classList.add('drawing-mode');
        this.canvas.classList.add('drawing-active');
        
        const coords = this.getCoordinates(e);
        this.currentPath = [coords];
        
        this.ctx.beginPath();
        this.ctx.moveTo(coords.x, coords.y);
        
        console.log('🎨 Drawing started');
    }

    /**
     * Draw line to current position
     */
    draw(e) {
        if (!this.isDrawing) return;

        const coords = this.getCoordinates(e);
        this.currentPath.push(coords);
        
        this.ctx.lineTo(coords.x, coords.y);
        this.ctx.stroke();
    }

    /**
     * Stop drawing - deactivate drawing mode
     */
    stopDrawing() {
        if (!this.isDrawing) return;
        
        this.isDrawing = false;
        
        // Deactivate drawing mode
        document.body.classList.remove('drawing-mode');
        this.canvas.classList.remove('drawing-active');
        
        // Save the completed path
        if (this.currentPath.length > 1) {
            this.allPaths.push({
                points: [...this.currentPath],
                timestamp: Date.now()
            });
        }
        
        this.currentPath = [];
        console.log('🎨 Drawing stopped');
    }

    /**
     * Get coordinates relative to viewport
     */
    getCoordinates(e) {
        return {
            x: e.clientX,
            y: e.clientY
        };
    }

    /**
     * Clear all drawings
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.allPaths = [];
        console.log('🧹 Canvas cleared');
        
        // Visual feedback
        const clearBtn = document.getElementById('clear-doodles-btn');
        if (clearBtn) {
            clearBtn.style.transform = 'scale(1.3)';
            setTimeout(() => {
                clearBtn.style.transform = 'scale(1)';
            }, 200);
        }
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.fullscreenScribbler = new FullscreenScribbler();
});
