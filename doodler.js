/**
 * Living Margin Doodler System
 * Transforms doom scrolling into bloom scrolling through creative margin doodling
 * Features AI-Q based stroke smoothing that improves drawing quality as users progress
 */

class LivingMarginDoodler {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.isDrawing = false;
        this.currentPath = [];
        this.allPaths = [];
        
        // Drawing settings
        this.strokeColor = '#4f46e5';
        this.baseStrokeWidth = 2;
        this.currentIQ = 85; // Default starting IQ
        
        this.init();
    }

    /**
     * Initialize the doodling system
     */
    init() {
        this.setupCanvas();
        this.setupEventListeners();
        this.loadUserIQ();
        
        console.log('Living Margin Doodler initialized');
    }

    /**
     * Setup canvas element and context
     */
    setupCanvas() {
        this.canvas = document.getElementById('living-margin-canvas');
        if (!this.canvas) {
            console.error('Living Margin canvas not found');
            return;
        }

        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size to match CSS size
        this.resizeCanvas();
        
        // Setup drawing styles
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.lineWidth = this.baseStrokeWidth;
        
        // Handle window resize
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    /**
     * Resize canvas to match display size
     */
    resizeCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * window.devicePixelRatio;
        this.canvas.height = rect.height * window.devicePixelRatio;
        
        // Scale context to match device pixel ratio
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        
        // Reapply styles after resize
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.lineWidth = this.baseStrokeWidth;
        
        // Redraw all paths
        this.redrawAllPaths();
    }

    /**
     * Setup event listeners for drawing
     */
    setupEventListeners() {
        // Mouse events
        this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('mouseout', () => this.stopDrawing());

        // Touch events for mobile
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

        // Clear button
        const clearBtn = document.getElementById('clear-doodles-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearCanvas());
        }

        // Listen for AI-Q updates
        document.addEventListener('aiq-updated', (e) => {
            this.currentIQ = e.detail.iq;
            this.updateStrokeStyle();
        });
    }

    /**
     * Get coordinates relative to canvas
     */
    getCoordinates(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    /**
     * Start drawing
     */
    startDrawing(e) {
        this.isDrawing = true;
        const coords = this.getCoordinates(e);
        
        // Start new path
        this.currentPath = [coords];
        this.ctx.beginPath();
        this.ctx.moveTo(coords.x, coords.y);
    }

    /**
     * Draw line to current position
     */
    draw(e) {
        if (!this.isDrawing) return;

        const coords = this.getCoordinates(e);
        this.currentPath.push(coords);

        // Apply AI-Q based smoothing (basic version for now)
        const smoothedPoint = this.applyBasicSmoothing(coords);
        
        // Draw the line
        this.ctx.lineTo(smoothedPoint.x, smoothedPoint.y);
        this.ctx.stroke();
    }

    /**
     * Stop drawing and save path
     */
    stopDrawing() {
        if (!this.isDrawing) return;
        
        this.isDrawing = false;
        
        // Save the completed path
        if (this.currentPath.length > 1) {
            this.allPaths.push({
                points: [...this.currentPath],
                iq: this.currentIQ,
                timestamp: Date.now()
            });
        }
        
        this.currentPath = [];
    }

    /**
     * Basic smoothing algorithm (will be enhanced in Phase 3)
     */
    applyBasicSmoothing(point) {
        if (this.currentPath.length < 3) {
            return point;
        }

        // For now, just return the original point
        // This will be replaced with AI-Q based smoothing
        return point;
    }

    /**
     * Update stroke style based on current AI-Q
     */
    updateStrokeStyle() {
        // Basic implementation - will be enhanced
        let strokeWidth = this.baseStrokeWidth;
        let opacity = 0.7;

        if (this.currentIQ >= 90) {
            strokeWidth = this.baseStrokeWidth * 1.2;
            opacity = 0.8;
        }

        if (this.currentIQ >= 110) {
            strokeWidth = this.baseStrokeWidth * 1.5;
            opacity = 0.9;
        }

        this.ctx.lineWidth = strokeWidth;
        this.ctx.globalAlpha = opacity;
    }

    /**
     * Load current user AI-Q from storage
     */
    loadUserIQ() {
        try {
            const progress = JSON.parse(localStorage.getItem('aiDirector_aiqProgress'));
            if (progress && progress.iq) {
                this.currentIQ = progress.iq;
                this.updateStrokeStyle();
            }
        } catch (e) {
            console.log('Could not load AI-Q, using default:', this.currentIQ);
        }
    }

    /**
     * Clear all doodles from canvas
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.allPaths = [];
        
        // Add a subtle animation feedback
        const clearBtn = document.getElementById('clear-doodles-btn');
        if (clearBtn) {
            clearBtn.style.transform = 'scale(1.3)';
            setTimeout(() => {
                clearBtn.style.transform = 'scale(1)';
            }, 150);
        }
        
        console.log('Canvas cleared - ready for new creative expressions');
    }

    /**
     * Redraw all saved paths (used after resize)
     */
    redrawAllPaths() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.allPaths.forEach(path => {
            if (path.points.length < 2) return;
            
            this.ctx.beginPath();
            this.ctx.moveTo(path.points[0].x, path.points[0].y);
            
            for (let i = 1; i < path.points.length; i++) {
                this.ctx.lineTo(path.points[i].x, path.points[i].y);
            }
            
            this.ctx.stroke();
        });
    }

    /**
     * Get current drawing statistics
     */
    getDrawingStats() {
        return {
            totalPaths: this.allPaths.length,
            currentIQ: this.currentIQ,
            canvasSize: {
                width: this.canvas.width,
                height: this.canvas.height
            }
        };
    }
}

// Initialize the Living Margin Doodler when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure canvas is properly rendered
    setTimeout(() => {
        window.livingMarginDoodler = new LivingMarginDoodler();
    }, 500);
});

// Export for module use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LivingMarginDoodler;
}
