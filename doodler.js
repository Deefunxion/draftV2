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
            this.updateStrokeStyleForIQ();
            console.log(`AI-Q updated to ${this.currentIQ} - stroke style enhanced!`);
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
     * AI-Q based stroke smoothing algorithm - THE MAGIC HAPPENS HERE
     */
    applyIQSmoothing(rawPoints, currentIQ) {
        if (rawPoints.length < 2) return rawPoints;

        // IQ-based smoothing levels
        if (currentIQ < 70) {
            // Νεόφυτος: Raw, unprocessed strokes
            return rawPoints;
        } 
        else if (currentIQ >= 70 && currentIQ < 90) {
            // Αρχάριος: Basic averaging smoothing
            return this.applyBasicSmoothing(rawPoints);
        } 
        else if (currentIQ >= 90 && currentIQ < 110) {
            // Έμπειρος: Advanced smoothing with variable width
            return this.applyAdvancedSmoothing(rawPoints);
        } 
        else if (currentIQ >= 110) {
            // Μάστερ: Artistic Bezier curve smoothing
            return this.applyMasterSmoothing(rawPoints);
        }
    }

    /**
     * Basic smoothing: Simple point averaging
     */
    applyBasicSmoothing(points) {
        if (points.length < 3) return points;
        
        const smoothed = [points[0]]; // Keep first point
        
        for (let i = 1; i < points.length - 1; i++) {
            const prev = points[i - 1];
            const curr = points[i];
            const next = points[i + 1];
            
            // Average with neighbors
            const smoothPoint = {
                x: (prev.x + curr.x + next.x) / 3,
                y: (prev.y + curr.y + next.y) / 3
            };
            smoothed.push(smoothPoint);
        }
        
        smoothed.push(points[points.length - 1]); // Keep last point
        return smoothed;
    }

    /**
     * Advanced smoothing: Quadratic interpolation with variable width
     */
    applyAdvancedSmoothing(points) {
        if (points.length < 4) return this.applyBasicSmoothing(points);
        
        const smoothed = [];
        
        for (let i = 0; i < points.length - 1; i++) {
            const p0 = points[Math.max(0, i - 1)];
            const p1 = points[i];
            const p2 = points[i + 1];
            const p3 = points[Math.min(points.length - 1, i + 2)];
            
            // Catmull-Rom interpolation for smoothness
            for (let t = 0; t < 1; t += 0.2) {
                const x = this.catmullRom(p0.x, p1.x, p2.x, p3.x, t);
                const y = this.catmullRom(p0.y, p1.y, p2.y, p3.y, t);
                smoothed.push({ x, y });
            }
        }
        
        return smoothed;
    }

    /**
     * Master smoothing: Artistic Bezier curves with dynamic width
     */
    applyMasterSmoothing(points) {
        if (points.length < 3) return points;
        
        const smoothed = [];
        
        for (let i = 0; i < points.length - 2; i += 2) {
            const p0 = points[i];
            const p1 = points[i + 1];
            const p2 = points[Math.min(points.length - 1, i + 2)];
            
            // Create control point for smooth curve
            const cp = {
                x: (p0.x + p2.x) / 2,
                y: (p0.y + p2.y) / 2
            };
            
            // Generate smooth curve points
            for (let t = 0; t <= 1; t += 0.1) {
                const x = this.quadraticBezier(p0.x, cp.x, p2.x, t);
                const y = this.quadraticBezier(p0.y, cp.y, p2.y, t);
                smoothed.push({ x, y });
            }
        }
        
        return smoothed;
    }

    /**
     * Catmull-Rom spline interpolation
     */
    catmullRom(p0, p1, p2, p3, t) {
        const t2 = t * t;
        const t3 = t2 * t;
        return 0.5 * (
            (2 * p1) +
            (-p0 + p2) * t +
            (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
            (-p0 + 3 * p1 - 3 * p2 + p3) * t3
        );
    }

    /**
     * Quadratic Bezier curve
     */
    quadraticBezier(p0, p1, p2, t) {
        const u = 1 - t;
        return u * u * p0 + 2 * u * t * p1 + t * t * p2;
    }

    /**
     * Enhanced draw function with IQ-based smoothing
     */
    draw(e) {
        if (!this.isDrawing) return;

        const coords = this.getCoordinates(e);
        this.currentPath.push(coords);

        // Apply IQ-based stroke styling
        this.updateStrokeStyleForIQ();

        // Only apply smoothing if we have enough points
        if (this.currentPath.length > 2) {
            // Get smoothed version of current path
            const smoothedPath = this.applyIQSmoothing([...this.currentPath], this.currentIQ);
            
            // Redraw the current stroke with smoothed path
            this.redrawCurrentStroke(smoothedPath);
        } else {
            // For first few points, draw normally
            this.ctx.lineTo(coords.x, coords.y);
            this.ctx.stroke();
        }
    }

    /**
     * Redraw current stroke with smoothed path
     */
    redrawCurrentStroke(smoothedPath) {
        if (smoothedPath.length < 2) return;
        
        this.ctx.beginPath();
        this.ctx.moveTo(smoothedPath[0].x, smoothedPath[0].y);
        
        for (let i = 1; i < smoothedPath.length; i++) {
            this.ctx.lineTo(smoothedPath[i].x, smoothedPath[i].y);
        }
        
        this.ctx.stroke();
    }

    /**
     * Enhanced stroke styling based on AI-Q level
     */
    updateStrokeStyleForIQ() {
        let strokeWidth = this.baseStrokeWidth;
        let opacity = 0.7;
        let strokeColor = this.strokeColor;

        if (this.currentIQ < 70) {
            // Νεόφυτος: Rough, basic strokes
            strokeWidth = this.baseStrokeWidth * 0.8;
            opacity = 0.6;
            strokeColor = '#6b7280'; // Gray
        } 
        else if (this.currentIQ >= 70 && this.currentIQ < 90) {
            // Αρχάριος: Cleaner strokes
            strokeWidth = this.baseStrokeWidth;
            opacity = 0.7;
            strokeColor = '#3b82f6'; // Blue
        } 
        else if (this.currentIQ >= 90 && this.currentIQ < 110) {
            // Έμπειρος: Refined strokes with slight glow
            strokeWidth = this.baseStrokeWidth * 1.2;
            opacity = 0.8;
            strokeColor = '#7c3aed'; // Purple
            this.ctx.shadowColor = strokeColor;
            this.ctx.shadowBlur = 2;
        } 
        else if (this.currentIQ >= 110) {
            // Μάστερ: Artistic, beautiful strokes
            strokeWidth = this.baseStrokeWidth * 1.4;
            opacity = 0.9;
            strokeColor = '#059669'; // Emerald
            this.ctx.shadowColor = strokeColor;
            this.ctx.shadowBlur = 4;
        }

        this.ctx.lineWidth = strokeWidth;
        this.ctx.globalAlpha = opacity;
        this.ctx.strokeStyle = strokeColor;
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
