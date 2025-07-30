/**
 * SVG Marginalia System - AI Orchestrator's Ascent
 * 
 * Revolutionary annotation system that creates document-anchored drawings
 * with intelligent zone-based interaction and AI-Q progression.
 * 
 * Constitution Compliance:
 * - Article 2: Nielsen/Norman clarity with cyberpunk sophistication
 * - Article 3: AI-Q progression affects stroke quality
 * - Article 4: Font Awesome 7 icons, "Cookie Monster" data persistence
 */

class SVGMarginalia {
    constructor() {
        this.svg = null;
        this.currentPath = null;
        this.isDrawing = false;
        this.currentAIQ = 85; // Default starting AI-Q
        this.annotations = new Map(); // Page-specific annotations storage
        this.currentPage = window.location.pathname;
        
        // Zone definitions for smart interaction
        this.marginWidth = 120; // px from each edge
        this.fadeZoneWidth = 200; // px fade transition zone
        
        // Drawing state
        this.strokeCount = 0;
        this.lastPoint = null;
        
        this.init();
    }
    
    /**
     * Initialize the SVG marginalia system
     */
    init() {
        this.loadAIQ();
        this.createSVGOverlay();
        this.setupEventListeners();
        this.loadStoredAnnotations();
        this.createControls();
        
        console.log('SVG Marginalia System initialized - AI-Q:', this.currentAIQ);
    }
    
    /**
     * Create full-document SVG overlay
     */
    createSVGOverlay() {
        // Create SVG element that spans the entire document
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        
        // Critical: Make SVG follow document flow, not viewport
        this.svg.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1000;
            overflow: visible;
        `;
        
        // Set SVG attributes for full document coverage
        this.svg.setAttribute('width', '100%');
        this.svg.setAttribute('height', '100%');
        this.svg.setAttribute('id', 'marginalia-svg');
        
        // Insert SVG into document body
        document.body.appendChild(this.svg);
        
        // Ensure SVG covers full document height
        this.updateSVGDimensions();
        window.addEventListener('resize', () => this.updateSVGDimensions());
    }
    
    /**
     * Update SVG dimensions to match document
     */
    updateSVGDimensions() {
        const docHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        );
        
        this.svg.style.height = docHeight + 'px';
        this.svg.setAttribute('viewBox', `0 0 ${window.innerWidth} ${docHeight}`);
    }
    
    /**
     * Setup intelligent event listeners with zone detection
     */
    setupEventListeners() {
        // Use document for global event handling
        document.addEventListener('mousedown', (e) => this.handleStart(e));
        document.addEventListener('mousemove', (e) => this.handleMove(e));
        document.addEventListener('mouseup', (e) => this.handleEnd(e));
        
        // Touch events for mobile
        document.addEventListener('touchstart', (e) => this.handleStart(e.touches[0]));
        document.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.handleMove(e.touches[0]);
        });
        document.addEventListener('touchend', (e) => this.handleEnd(e));
        
        // AI-Q updates
        document.addEventListener('aiq-updated', (e) => {
            this.currentAIQ = e.detail.iq;
            console.log('AI-Q updated:', this.currentAIQ);
        });
        
        // Save annotations on page unload
        window.addEventListener('beforeunload', () => this.saveAnnotations());
    }
    
    /**
     * Determine if point is in drawing-enabled zone (margins)
     */
    isInMarginZone(x, y) {
        const viewportWidth = window.innerWidth;
        const leftMargin = x <= this.marginWidth;
        const rightMargin = x >= (viewportWidth - this.marginWidth);
        
        return leftMargin || rightMargin;
    }
    
    /**
     * Calculate opacity based on position (fade over text)
     */
    getOpacityForPosition(x, y) {
        const viewportWidth = window.innerWidth;
        
        // Full opacity in margins
        if (x <= this.marginWidth || x >= (viewportWidth - this.marginWidth)) {
            return 1.0;
        }
        
        // Calculate fade based on distance from margin
        const distanceFromLeftMargin = x - this.marginWidth;
        const distanceFromRightMargin = (viewportWidth - this.marginWidth) - x;
        const minDistance = Math.min(distanceFromLeftMargin, distanceFromRightMargin);
        
        // Fade over text content (fade zone)
        if (minDistance <= this.fadeZoneWidth) {
            const fadeRatio = minDistance / this.fadeZoneWidth;
            return Math.max(0.2, fadeRatio); // Minimum 20% opacity
        }
        
        // Deep in content area - very faded
        return 0.15;
    }
    
    /**
     * Handle drawing start with zone-based permission
     */
    handleStart(e) {
        const point = this.getDocumentPoint(e);
        
        // Only allow drawing to start from margin zones
        if (!this.isInMarginZone(point.x, point.y)) {
            return; // Ignore clicks in content area
        }
        
        this.isDrawing = true;
        this.currentPath = this.createNewPath(point);
        this.lastPoint = point;
        
        // Enable pointer events on SVG for drawing
        this.svg.style.pointerEvents = 'auto';
        
        console.log('Started drawing from margin zone:', point);
    }
    
    /**
     * Handle drawing movement
     */
    handleMove(e) {
        if (!this.isDrawing || !this.currentPath) return;
        
        const point = this.getDocumentPoint(e);
        
        // Add point to path
        this.addPointToPath(this.currentPath, point);
        
        // Update path opacity based on current position
        const opacity = this.getOpacityForPosition(point.x, point.y);
        this.currentPath.setAttribute('opacity', opacity);
        
        this.lastPoint = point;
    }
    
    /**
     * Handle drawing end
     */
    handleEnd(e) {
        if (!this.isDrawing) return;
        
        this.isDrawing = false;
        
        // Disable pointer events to restore text interaction
        this.svg.style.pointerEvents = 'none';
        
        // Store completed path
        if (this.currentPath) {
            this.storeAnnotation(this.currentPath);
            this.currentPath = null;
        }
        
        this.lastPoint = null;
        console.log('Drawing completed');
    }
    
    /**
     * Create new SVG path with AI-Q styling
     */
    createNewPath(startPoint) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const style = this.getAIQStrokeStyle();
        
        // Apply AI-Q based styling
        path.setAttribute('d', `M ${startPoint.x} ${startPoint.y}`);
        path.setAttribute('stroke', style.color);
        path.setAttribute('stroke-width', style.width);
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        path.setAttribute('fill', 'none');
        path.setAttribute('opacity', this.getOpacityForPosition(startPoint.x, startPoint.y));
        
        // Add AI-Q specific effects
        if (style.filter) {
            path.setAttribute('filter', style.filter);
        }
        
        // Smooth transitions (Constitution Article 2)
        path.style.transition = 'opacity 0.3s ease-in-out';
        
        this.svg.appendChild(path);
        return path;
    }
    
    /**
     * Add point to SVG path
     */
    addPointToPath(path, point) {
        const currentD = path.getAttribute('d');
        const newD = `${currentD} L ${point.x} ${point.y}`;
        path.setAttribute('d', newD);
    }
    
    /**
     * Get AI-Q appropriate stroke styling (Constitution Article 3)
     */
    getAIQStrokeStyle() {
        if (this.currentAIQ < 70) {
            // Νεόφυτος - Simple, basic strokes
            return {
                width: 1.5,
                color: '#6b7280', // Gray
                filter: null
            };
        } else if (this.currentAIQ < 90) {
            // Αρχάριος - Clean, defined strokes
            return {
                width: 2,
                color: '#3b82f6', // Blue
                filter: null
            };
        } else if (this.currentAIQ < 110) {
            // Έμπειρος - Refined strokes with subtle glow
            return {
                width: 2.5,
                color: '#7c3aed', // Purple
                filter: 'url(#glow-filter)'
            };
        } else {
            // Μάστερ - Artistic, beautiful strokes
            return {
                width: 3,
                color: '#059669', // Emerald
                filter: 'url(#master-glow-filter)'
            };
        }
    }
    
    /**
     * Get document coordinates from event
     */
    getDocumentPoint(e) {
        return {
            x: e.clientX,
            y: e.clientY + window.scrollY
        };
    }
    
    /**
     * Load current AI-Q from tracking system
     */
    loadAIQ() {
        try {
            const progress = JSON.parse(localStorage.getItem('aiDirector_aiqProgress'));
            if (progress && progress.iq) {
                this.currentAIQ = progress.iq;
            }
        } catch (e) {
            console.log('Using default AI-Q:', this.currentAIQ);
        }
    }
    
    /**
     * Store annotation with page association ("Cookie Monster" - Constitution Article 4)
     */
    storeAnnotation(pathElement) {
        const pathData = {
            d: pathElement.getAttribute('d'),
            stroke: pathElement.getAttribute('stroke'),
            strokeWidth: pathElement.getAttribute('stroke-width'),
            opacity: pathElement.getAttribute('opacity'),
            filter: pathElement.getAttribute('filter'),
            timestamp: Date.now(),
            aiq: this.currentAIQ
        };
        
        // Store in page-specific collection
        if (!this.annotations.has(this.currentPage)) {
            this.annotations.set(this.currentPage, []);
        }
        
        this.annotations.get(this.currentPage).push(pathData);
    }
    
    /**
     * Save annotations to localStorage ("Cookie Monster" philosophy)
     */
    saveAnnotations() {
        try {
            const annotationsObj = Object.fromEntries(this.annotations);
            localStorage.setItem('svg_marginalia_annotations', JSON.stringify(annotationsObj));
            console.log('Annotations saved for', this.annotations.size, 'pages');
        } catch (e) {
            console.error('Failed to save annotations:', e);
        }
    }
    
    /**
     * Load stored annotations for current page
     */
    loadStoredAnnotations() {
        try {
            const stored = localStorage.getItem('svg_marginalia_annotations');
            if (stored) {
                const annotationsObj = JSON.parse(stored);
                this.annotations = new Map(Object.entries(annotationsObj));
                
                // Restore annotations for current page
                const pageAnnotations = this.annotations.get(this.currentPage);
                if (pageAnnotations) {
                    this.restorePageAnnotations(pageAnnotations);
                    console.log('Restored', pageAnnotations.length, 'annotations');
                }
            }
        } catch (e) {
            console.error('Failed to load annotations:', e);
        }
    }
    
    /**
     * Restore annotations for current page
     */
    restorePageAnnotations(annotations) {
        annotations.forEach(pathData => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            
            path.setAttribute('d', pathData.d);
            path.setAttribute('stroke', pathData.stroke);
            path.setAttribute('stroke-width', pathData.strokeWidth);
            path.setAttribute('stroke-linecap', 'round');
            path.setAttribute('stroke-linejoin', 'round');
            path.setAttribute('fill', 'none');
            path.setAttribute('opacity', pathData.opacity);
            
            if (pathData.filter) {
                path.setAttribute('filter', pathData.filter);
            }
            
            path.style.transition = 'opacity 0.3s ease-in-out';
            this.svg.appendChild(path);
        });
    }
    
    /**
     * Create control UI with Font Awesome 7 icons (Constitution Article 4)
     */
    createControls() {
        // Clear annotations button
        const clearBtn = document.createElement('button');
        clearBtn.id = 'marginalia-clear-btn';
        clearBtn.title = 'Καθαρισμός Σημειώσεων';
        clearBtn.innerHTML = '<i class="fa-solid fa-eraser"></i>';
        clearBtn.className = 'marginalia-control-btn';
        
        clearBtn.addEventListener('click', () => this.clearCurrentPageAnnotations());
        
        document.body.appendChild(clearBtn);
    }
    
    /**
     * Clear annotations for current page
     */
    clearCurrentPageAnnotations() {
        // Remove SVG paths
        const paths = this.svg.querySelectorAll('path');
        paths.forEach(path => path.remove());
        
        // Clear from storage
        this.annotations.delete(this.currentPage);
        this.saveAnnotations();
        
        console.log('Cleared annotations for current page');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.svgMarginalia = new SVGMarginalia();
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SVGMarginalia;
}