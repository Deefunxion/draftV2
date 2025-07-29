/**
 * Professional Living Margin Doodler
 * Built with Paper.js for smooth, natural drawing experience
 * Features non-intrusive pointer events and performance optimization
 */

class ProfessionalDoodler {
    constructor() {
        this.canvas = null;
        this.isDrawing = false;
        this.currentPath = null;
        this.strokeColor = '#4f46e5';
        this.strokeWidth = 2;
        this.smartOpacity = 0.7;
        this.paths = [];
        
        // AI-Q Integration
        this.currentIQ = 85;
        
        this.init();
    }
    
    /**
     * Initialize the professional doodling system
     */
    init() {
        this.setupCanvas();
        this.setupPaperJS();
        this.setupEventListeners();
        this.loadUserIQ();
        
        console.log('Professional Living Margin Doodler initialized with Paper.js');
    }
    
    /**
     * Setup canvas element
     */
    setupCanvas() {
        this.canvas = document.getElementById('living-margin-canvas');
        if (!this.canvas) {
            console.error('Living Margin canvas not found');
            return;
        }
        
        // Set canvas to full viewport
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    /**
     * Initialize Paper.js scope and tools
     */
    setupPaperJS() {
        // Setup Paper.js scope
        paper.setup(this.canvas);
        
        // Configure drawing style
        this.updateStrokeStyle();
        
        // Handle window resize
        paper.view.onResize = () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        };
    }
    
    /**
     * Setup professional event handling with pointer events toggle
     */
    setupEventListeners() {
        // Mouse events with pointer events management
        this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        document.addEventListener('mousemove', (e) => this.draw(e));
        document.addEventListener('mouseup', () => this.stopDrawing());
        
        // Touch events for mobile
        this.canvas.addEventListener('touchstart', (e) => {
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
        
        // AI-Q updates
        document.addEventListener('aiq-updated', (e) => {
            this.currentIQ = e.detail.iq;
            this.updateStrokeStyle();
        });
        
        // Prevent context menu on right-click while drawing
        this.canvas.addEventListener('contextmenu', (e) => {
            if (this.isDrawing) e.preventDefault();
        });
    }
    
    /**
     * Start drawing - Enable pointer events
     */
    startDrawing(e) {
        // **KEY: Enable pointer events when drawing starts**
        this.canvas.classList.add('drawing-active');
        
        this.isDrawing = true;
        
        // Create new Paper.js path
        this.currentPath = new paper.Path();
        this.currentPath.strokeColor = this.getAIQColor();
        this.currentPath.strokeWidth = this.getAIQStrokeWidth();
        this.currentPath.strokeCap = 'round';
        this.currentPath.strokeJoin = 'round';
        this.currentPath.opacity = this.smartOpacity;
        
        // Start path at mouse/touch position
        const point = this.getCanvasPoint(e);
        this.currentPath.moveTo(point);
        this.currentPath.lineTo(point); // Create initial segment
        
        console.log('Started drawing at:', point);
    }
    
    /**
     * Draw - Using requestAnimationFrame for smooth performance
     */
    draw(e) {
        if (!this.isDrawing || !this.currentPath) return;
        
        // **Performance Optimization: Use requestAnimationFrame**
        requestAnimationFrame(() => {
            const point = this.getCanvasPoint(e);
            
            // Add smooth point to path
            this.currentPath.lineTo(point);
            
            // Apply path smoothing for natural feel
            if (this.currentPath.segments.length > 2) {
                this.currentPath.smooth();
            }
            
            // Redraw canvas
            paper.view.draw();
        });
    }
    
    /**
     * Stop drawing - Disable pointer events
     */
    stopDrawing() {
        if (!this.isDrawing) return;
        
        // **KEY: Disable pointer events when drawing stops**
        this.canvas.classList.remove('drawing-active');
        
        this.isDrawing = false;
        
        if (this.currentPath) {
            // Save completed path
            this.paths.push({
                path: this.currentPath,
                iq: this.currentIQ,
                timestamp: Date.now()
            });
            
            this.currentPath = null;
        }
        
        console.log('Stopped drawing');
    }
    
    /**
     * Get canvas coordinates from mouse/touch event
     */
    getCanvasPoint(e) {
        const rect = this.canvas.getBoundingClientRect();
        return new paper.Point(
            e.clientX - rect.left,
            e.clientY - rect.top
        );
    }
    
    /**
     * Update stroke style based on AI-Q level
     */
    updateStrokeStyle() {
        // Dynamic styling based on AI-Q progression
        if (this.currentIQ < 70) {
            this.strokeColor = '#6b7280'; // Gray - Νεόφυτος
            this.strokeWidth = 1.5;
        } else if (this.currentIQ < 90) {
            this.strokeColor = '#3b82f6'; // Blue - Αρχάριος
            this.strokeWidth = 2;
        } else if (this.currentIQ < 110) {
            this.strokeColor = '#7c3aed'; // Purple - Έμπειρος
            this.strokeWidth = 2.5;
        } else {
            this.strokeColor = '#059669'; // Emerald - Μάστερ
            this.strokeWidth = 3;
        }
    }
    
    /**
     * Get current AI-Q appropriate color
     */
    getAIQColor() {
        return this.strokeColor;
    }
    
    /**
     * Get current AI-Q appropriate stroke width
     */
    getAIQStrokeWidth() {
        return this.strokeWidth;
    }
    
    /**
     * Load user AI-Q from storage
     */
    loadUserIQ() {
        try {
            const progress = JSON.parse(localStorage.getItem('aiDirector_aiqProgress'));
            if (progress && progress.iq) {
                this.currentIQ = progress.iq;
                this.updateStrokeStyle();
                console.log('Loaded AI-Q:', this.currentIQ);
            }
        } catch (e) {
            console.log('Using default AI-Q:', this.currentIQ);
        }
    }
    
    /**
     * Clear all drawings
     */
    clearCanvas() {
        // Clear all Paper.js paths
        paper.project.clear();
        this.paths = [];
        
        // Visual feedback
        const clearBtn = document.getElementById('clear-doodles-btn');
        if (clearBtn) {
            clearBtn.style.transform = 'scale(1.3)';
            setTimeout(() => {
                clearBtn.style.transform = 'scale(1)';
            }, 200);
        }
        
        console.log('Canvas cleared');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.professionalDoodler = new ProfessionalDoodler();
});

// Fallback for pages that load scripts before DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (!window.professionalDoodler) {
            window.professionalDoodler = new ProfessionalDoodler();
        }
    });
} else {
    // DOM already loaded
    window.professionalDoodler = new ProfessionalDoodler();
}
