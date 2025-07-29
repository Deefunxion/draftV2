/**
 * Living Margin Doodler System - Dual Canvas Version
 * Transforms doom scrolling into bloom scrolling through creative margin doodling
 * Features AI-Q based stroke smoothing that improves drawing quality as users progress
 */

class LivingMarginDoodler {
    constructor() {
        this.canvasLeft = null;
        this.canvasRight = null;
        this.ctxLeft = null;
        this.ctxRight = null;
        this.isDrawing = false;
        this.currentPath = [];
        this.allPaths = [];
        this.activeCanvas = null; // Track which canvas is being used
        this.activeCtx = null; // Track which context is being used
        
        // Drawing settings
        this.strokeColor = '#4f46e5';
        this.baseStrokeWidth = 1.5; // Λεπτότερη γραμμή
        this.smartOpacity = 0.7; // Smart opacity για καλή αναγνωσιμότητα
        this.currentIQ = 85; // Default starting IQ
        
        this.init();
    }

    /**
     * Initialize the doodling system
     */
    init() {
        this.setupCanvases();
        this.setupEventListeners();
        this.loadUserIQ();
        
        console.log('Living Margin Doodler initialized with dual canvas');
    }

    /**
     * Setup both canvas elements and contexts
     */
    setupCanvases() {
        // Left canvas
        this.canvasLeft = document.getElementById('living-margin-canvas');
        if (!this.canvasLeft) {
            console.error('Left Living Margin canvas not found');
            return;
        }
        this.ctxLeft = this.canvasLeft.getContext('2d');
        
        // Right canvas
        this.canvasRight = document.getElementById('living-margin-canvas-right');
        if (!this.canvasRight) {
            console.error('Right Living Margin canvas not found');
            return;
        }
        this.ctxRight = this.canvasRight.getContext('2d');
        
        // Set canvas sizes to match CSS sizes
        this.resizeCanvases();
        
        // Setup drawing styles with smart opacity for both contexts
        this.setupDrawingStyles(this.ctxLeft);
        this.setupDrawingStyles(this.ctxRight);
        
        // Handle window resize
        window.addEventListener('resize', () => this.resizeCanvases());
    }

    /**
     * Setup drawing styles for a context
     */
    setupDrawingStyles(ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = this.smartOpacity;
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = this.baseStrokeWidth;
        ctx.globalCompositeOperation = 'multiply';
    }

    /**
     * Resize both canvases to match display size
     */
    resizeCanvases() {
        // Resize left canvas
        const rectLeft = this.canvasLeft.getBoundingClientRect();
        this.canvasLeft.width = rectLeft.width * window.devicePixelRatio;
        this.canvasLeft.height = rectLeft.height * window.devicePixelRatio;
        this.ctxLeft.scale(window.devicePixelRatio, window.devicePixelRatio);
        
        // Resize right canvas
        const rectRight = this.canvasRight.getBoundingClientRect();
        this.canvasRight.width = rectRight.width * window.devicePixelRatio;
        this.canvasRight.height = rectRight.height * window.devicePixelRatio;
        this.ctxRight.scale(window.devicePixelRatio, window.devicePixelRatio);
        
        // Reapply drawing styles after resize
        this.setupDrawingStyles(this.ctxLeft);
        this.setupDrawingStyles(this.ctxRight);
    }

    /**
     * Setup event listeners for drawing
     */
    setupEventListeners() {
        // Setup events for left canvas
        this.setupCanvasEvents(this.canvasLeft, 'left');
        
        // Setup events for right canvas  
        this.setupCanvasEvents(this.canvasRight, 'right');

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
     * Setup event listeners for a specific canvas
     */
    setupCanvasEvents(canvas, canvasId) {
        // Mouse events
        canvas.addEventListener('mousedown', (e) => this.startDrawing(e, canvasId));
        canvas.addEventListener('mousemove', (e) => this.draw(e));
        canvas.addEventListener('mouseup', () => this.stopDrawing());
        canvas.addEventListener('mouseout', () => this.stopDrawing());

        // Touch events for mobile
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.startDrawing(e.touches[0], canvasId);
        });
        
        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.draw(e.touches[0]);
        });
        
        canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.stopDrawing();
        });
    }

    /**
     * Get coordinates relative to the active canvas
     */
    getCoordinates(e) {
        const rect = this.activeCanvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    /**
     * Start drawing
     */
    startDrawing(e, canvasId) {
        this.isDrawing = true;
        
        // Set active canvas and context
        if (canvasId === 'left') {
            this.activeCanvas = this.canvasLeft;
            this.activeCtx = this.ctxLeft;
        } else {
            this.activeCanvas = this.canvasRight;
            this.activeCtx = this.ctxRight;
        }
        
        const coords = this.getCoordinates(e);
        
        // Start new path
        this.currentPath = [coords];
        this.activeCtx.beginPath();
        this.activeCtx.moveTo(coords.x, coords.y);
    }

    /**
     * Draw line to current position with smart opacity and AI-Q integration
     */
    draw(e) {
        if (!this.isDrawing || !this.activeCtx) return;

        const coords = this.getCoordinates(e);
        this.currentPath.push(coords);

        // Apply AI-Q based smoothing (basic version for real-time drawing)
        const smoothedPoint = this.applyBasicSmoothing(coords);
        
        // Set smart opacity and AI-Q stroke style
        this.applySmartDrawingStyle();
        this.updateStrokeStyleForIQ();
        
        // Draw the line
        this.activeCtx.lineTo(smoothedPoint.x, smoothedPoint.y);
        this.activeCtx.stroke();
        
        // Update dynamic contrast for text under ink
        this.updateTextContrast(coords);
    }

    /**
     * Apply smart drawing style with adaptive opacity
     */
    applySmartDrawingStyle() {
        if (!this.activeCtx) return;
        
        // Smart opacity που επιτρέπει ανάγνωση κειμένου
        this.activeCtx.globalAlpha = this.smartOpacity;
        this.activeCtx.strokeStyle = this.strokeColor;
        this.activeCtx.lineWidth = this.baseStrokeWidth;
        this.activeCtx.globalCompositeOperation = 'multiply'; // Blend mode για καλύτερη αναγνωσιμότητα
    }

    /**
     * Update text contrast dynamically under ink
     */
    updateTextContrast(inkPosition) {
        // Find text elements near ink position
        const canvasRect = this.activeCanvas.getBoundingClientRect();
        const elements = document.elementsFromPoint(
            inkPosition.x + canvasRect.left, 
            inkPosition.y + canvasRect.top
        );
        
        elements.forEach(element => {
            if (this.isTextElement(element)) {
                element.classList.add('content-under-drawing', 'ink-overlay');
                
                // Remove contrast after delay
                setTimeout(() => {
                    element.classList.remove('ink-overlay');
                }, 3000);
            }
        });
    }

    /**
     * Check if element contains text content
     */
    isTextElement(element) {
        const textTags = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'DIV', 'A', 'LI'];
        return textTags.includes(element.tagName) && 
               element.textContent && 
               element.textContent.trim().length > 0;
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
                timestamp: Date.now(),
                canvas: this.activeCanvas === this.canvasLeft ? 'left' : 'right'
            });
        }
        
        this.currentPath = [];
        this.activeCanvas = null;
        this.activeCtx = null;
    }

    /**
     * Basic smoothing: Simple point averaging
     */
    applyBasicSmoothing(point) {
        if (this.currentPath.length < 3) return point;
        
        const lastPoints = this.currentPath.slice(-3);
        const avgX = lastPoints.reduce((sum, p) => sum + p.x, 0) / lastPoints.length;
        const avgY = lastPoints.reduce((sum, p) => sum + p.y, 0) / lastPoints.length;
        
        return { x: avgX, y: avgY };
    }

    /**
     * Enhanced stroke styling based on AI-Q level
     */
    updateStrokeStyleForIQ() {
        if (!this.activeCtx) return;
        
        let strokeWidth = this.baseStrokeWidth;
        let opacity = this.smartOpacity;
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
            this.activeCtx.shadowColor = strokeColor;
            this.activeCtx.shadowBlur = 2;
        } 
        else if (this.currentIQ >= 110) {
            // Μάστερ: Artistic, beautiful strokes
            strokeWidth = this.baseStrokeWidth * 1.4;
            opacity = 0.9;
            strokeColor = '#059669'; // Emerald
            this.activeCtx.shadowColor = strokeColor;
            this.activeCtx.shadowBlur = 4;
        }

        this.activeCtx.lineWidth = strokeWidth;
        this.activeCtx.globalAlpha = opacity;
        this.activeCtx.strokeStyle = strokeColor;
    }

    /**
     * Load current user AI-Q from storage
     */
    loadUserIQ() {
        try {
            const progress = JSON.parse(localStorage.getItem('aiDirector_aiqProgress'));
            if (progress && progress.iq) {
                this.currentIQ = progress.iq;
                console.log('Loaded AI-Q:', this.currentIQ);
            }
        } catch (e) {
            console.log('Could not load AI-Q, using default:', this.currentIQ);
        }
    }

    /**
     * Clear all doodles from both canvases
     */
    clearCanvas() {
        this.ctxLeft.clearRect(0, 0, this.canvasLeft.width, this.canvasLeft.height);
        this.ctxRight.clearRect(0, 0, this.canvasRight.width, this.canvasRight.height);
        this.allPaths = [];
        
        // Add a subtle animation feedback
        const clearBtn = document.getElementById('clear-doodles-btn');
        if (clearBtn) {
            clearBtn.style.transform = 'scale(1.3)';
            setTimeout(() => {
                clearBtn.style.transform = 'scale(1)';
            }, 200);
        }
        
        console.log('All doodles cleared from both canvases');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.livingMarginDoodler = new LivingMarginDoodler();
});
