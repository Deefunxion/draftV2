document.addEventListener('DOMContentLoaded', function() {
    console.log('interactive-reading.js loaded and running.');

    const contentWrapper = document.getElementById('reading-content-wrapper');
    console.log('Wrapper element found:', contentWrapper);

    if (!contentWrapper) {
        console.error('Error: Could not find the #reading-content-wrapper element.');
        return;
    }
    
    // =================================
    // LIVING DOCUMENT SYSTEM
    // =================================
    
    /**
     * Get user's current AI-Q typography level based on their score
     * @param {number} aiq - Current AI-Q score
     * @returns {number} Typography tier (0-4)
     */
    function getUserLevel(aiq) {
        if (aiq < 100) return 0;      // Baseline
        if (aiq < 120) return 1;      // Clarity & Justification
        if (aiq < 140) return 2;      // Intentional Indentation
        if (aiq < 160) return 3;      // Typographic Sophistication
        return 4;                     // The Polished Manuscript
    }
    
    /**
     * Get current AI-Q score from the tracker system
     * @returns {number} Current AI-Q score
     */
    function getCurrentAIQ() {
        try {
            // Check if aiqTracker is available globally
            if (window.aiqTracker && window.aiqTracker.progress) {
                return window.aiqTracker.progress.iq;
            }
            
            // Fallback: read from localStorage directly
            const stored = localStorage.getItem('aiDirector_aiqProgress');
            if (stored) {
                const progress = JSON.parse(stored);
                return progress.iq || 85;
            }
            
            // Final fallback: default starting score
            return 85;
        } catch (error) {
            console.warn('Could not read AI-Q score, using default:', error);
            return 85;
        }
    }
    
    /**
     * Apply the appropriate typography level class to a paragraph
     * @param {HTMLElement} paragraph - The paragraph element
     * @param {number} level - Typography level (0-4)
     */
    function applyTypographyLevel(paragraph, level) {
        // Remove any existing level classes
        paragraph.classList.remove('level-0', 'level-1', 'level-2', 'level-3', 'level-4');
        
        // Add the appropriate level class
        paragraph.classList.add(`level-${level}`);
        
        console.log(`Applied typography level ${level} to paragraph:`, paragraph.id);
    }
    
    // =================================
    // TOUCH DEVICE DETECTION & INTERACTION
    // =================================
    
    /**
     * Detect if the user is on a touch-enabled device
     * @returns {boolean} True if touch device
     */
    const isTouchDevice = () => {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
    
    const isTouch = isTouchDevice();
    console.log('Touch device detected:', isTouch);
    
    // Touch-specific variables
    let activeTouchButton = null;
    let touchStartTime = 0;
    let isScrolling = false;
    let scrollThreshold = 10; // pixels

    const paragraphs = contentWrapper.querySelectorAll('p');
    console.log('Found ' + paragraphs.length + ' paragraphs to attach listeners to.');

    let hoverTimeout;

    // Global touch event handlers for dismissing buttons
    if (isTouch) {
        let initialTouchY = 0;
        
        document.addEventListener('touchstart', (e) => {
            initialTouchY = e.touches[0].clientY;
            isScrolling = false;
        }, { passive: true });
        
        document.addEventListener('touchmove', (e) => {
            const currentTouchY = e.touches[0].clientY;
            const deltaY = Math.abs(currentTouchY - initialTouchY);
            
            if (deltaY > scrollThreshold) {
                isScrolling = true;
                // Dismiss any active touch button when scrolling
                if (activeTouchButton) {
                    dismissTouchButton();
                }
            }
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            // Dismiss button if touching outside of paragraph or button
            if (activeTouchButton && !isScrolling) {
                const touch = e.changedTouches[0];
                const element = document.elementFromPoint(touch.clientX, touch.clientY);
                
                // Check if touch ended on the paragraph or the button
                const touchedParagraph = element?.closest('p');
                const touchedButton = element?.closest('.commit-button');
                const activeParagraph = activeTouchButton.parentElement?.querySelector('p');
                
                if (touchedParagraph !== activeParagraph && !touchedButton) {
                    dismissTouchButton();
                }
            }
            
            setTimeout(() => {
                isScrolling = false;
            }, 100);
        }, { passive: true });
    }
    
    /**
     * Dismiss the currently active touch button
     */
    function dismissTouchButton() {
        if (activeTouchButton) {
            activeTouchButton.classList.remove('visible');
            setTimeout(() => {
                if (activeTouchButton) {
                    activeTouchButton.remove();
                    activeTouchButton = null;
                }
            }, 300);
        }
    }

    paragraphs.forEach((p, index) => {
        if (!p.id) {
            p.id = `p-interactive-${index}`;
        }

        let commitButton = null;
        let interactionContainer = null;

        // Create interaction container that includes both paragraph and button area
        function createInteractionContainer() {
            if (!interactionContainer) {
                interactionContainer = document.createElement('div');
                interactionContainer.className = 'paragraph-interaction-container';
                p.parentNode.insertBefore(interactionContainer, p);
                interactionContainer.appendChild(p);
            }
        }

        /**
         * Create and show commit button with device-appropriate positioning
         * @param {boolean} isTouch - Whether this is for touch interaction
         */
        function showCommitButton(isTouchInteraction = false) {
            if (commitButton || p.classList.contains('p-committed') || p.classList.contains('p-pushed')) return;
            
            // Dismiss any existing touch button first
            if (isTouchInteraction && activeTouchButton && activeTouchButton !== commitButton) {
                dismissTouchButton();
            }
            
            createInteractionContainer();
            
            commitButton = document.createElement('button');
            commitButton.className = 'commit-button';
            commitButton.innerHTML = '<i class="fa-solid fa-check"></i>';
            interactionContainer.appendChild(commitButton);

            if (isTouchInteraction) {
                // For touch: position button in a more ergonomic, fixed location
                const pRect = p.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const buttonFromTop = pRect.top + (pRect.height / 2) - 22;
                
                // Ensure button stays within comfortable reach
                const maxTop = viewportHeight - 100; // 100px from bottom
                const minTop = 60; // 60px from top
                const finalTop = Math.max(minTop, Math.min(maxTop, buttonFromTop));
                
                commitButton.style.top = `${finalTop - pRect.top}px`;
                commitButton.style.right = '10px'; // Closer for thumb reach
                
                // Set as active touch button
                activeTouchButton = commitButton;
                
                // Immediate visibility for touch
                commitButton.classList.add('visible');
            } else {
                // For mouse: use existing positioning
                const pRect = p.getBoundingClientRect();
                commitButton.style.top = `${(pRect.height / 2) - 22}px`;
                
                setTimeout(() => {
                    commitButton.classList.add('visible');
                }, 10);
            }

            commitButton.addEventListener('click', handleCommitClick);
        }
        
        /**
         * Handle commit button click - shared between touch and mouse
         */
        function handleCommitClick() {
            commitButton.classList.add('clicked');
            p.classList.add('p-committed');
            
            // Apply Living Document typography level
            const currentAIQ = getCurrentAIQ();
            const typographyLevel = getUserLevel(currentAIQ);
            applyTypographyLevel(p, typographyLevel);
            
            const stagedIcon = document.createElement('span');
            stagedIcon.className = 'status-icon icon-staged';
            stagedIcon.innerHTML = '●';
            p.insertBefore(stagedIcon, p.firstChild);

            // Store enhanced progress data with typography level
            localStorage.setItem(p.id, JSON.stringify({
                state: 'committed',
                level: typographyLevel,
                aiq: currentAIQ,
                timestamp: Date.now()
            }));

            // Clear active touch button reference
            if (activeTouchButton === commitButton) {
                activeTouchButton = null;
            }

            setTimeout(() => {
                if (commitButton) commitButton.remove();
                commitButton = null;
            }, 400);
        }

        function hideCommitButton() {
            if (commitButton && !commitButton.classList.contains('clicked')) {
                commitButton.classList.remove('visible');
                setTimeout(() => {
                    if (commitButton) {
                        commitButton.remove();
                        commitButton = null;
                    }
                }, 300);
            }
        }

        // =================================
        // DUAL INTERACTION SYSTEM
        // Touch vs Mouse Event Handling
        // =================================
        
        if (isTouch) {
            // TOUCH DEVICE LOGIC
            let touchStartPos = null;
            
            p.addEventListener('touchstart', (e) => {
                if (p.classList.contains('p-committed') || p.classList.contains('p-pushed')) return;
                
                // Store initial touch position
                touchStartPos = {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY,
                    time: Date.now()
                };
                
                console.log('Touch started on paragraph:', p.id);
                
                // Show button immediately on touch start
                showCommitButton(true);
            }, { passive: true });
            
            p.addEventListener('touchmove', (e) => {
                // Check if this is intentional scrolling vs accidental movement
                if (touchStartPos) {
                    const currentTouch = e.touches[0];
                    const deltaX = Math.abs(currentTouch.clientX - touchStartPos.x);
                    const deltaY = Math.abs(currentTouch.clientY - touchStartPos.y);
                    
                    // If significant movement detected, it's likely scrolling
                    if (deltaY > scrollThreshold || deltaX > scrollThreshold * 2) {
                        if (activeTouchButton === commitButton) {
                            dismissTouchButton();
                        }
                    }
                }
            }, { passive: true });
            
            p.addEventListener('touchend', (e) => {
                touchStartPos = null;
            }, { passive: true });
            
        } else {
            // DESKTOP/MOUSE LOGIC (Existing behavior)
            p.addEventListener('mouseenter', (e) => {
                console.log('Mouse entered paragraph:', e.target);
                if (p.classList.contains('p-committed') || p.classList.contains('p-pushed')) return;

                hoverTimeout = setTimeout(() => {
                    console.log('Pause detected on paragraph:', e.target);
                    showCommitButton(false);
                }, 500);
            });

            p.addEventListener('mouseleave', (e) => {
                // Check if mouse is moving to the commit button
                const relatedTarget = e.relatedTarget;
                if (relatedTarget && (relatedTarget === commitButton || commitButton?.contains(relatedTarget))) {
                    return; // Don't hide if moving to button
                }
                
                clearTimeout(hoverTimeout);
                // Delay hiding to allow mouse movement to button
                setTimeout(() => {
                    // Double-check if mouse is still not over button
                    if (!commitButton?.matches(':hover')) {
                        hideCommitButton();
                    }
                }, 100);
            });
        }
    });

    // Load initial state from localStorage with Living Document support
    paragraphs.forEach(p => {
        const storedData = localStorage.getItem(p.id);
        if (storedData) {
            let progressData;
            
            try {
                // Try to parse as new JSON format
                progressData = JSON.parse(storedData);
                if (typeof progressData === 'string') {
                    // Handle old format (just state string)
                    progressData = { state: progressData, level: null };
                }
            } catch (error) {
                // Handle old format (just state string)
                progressData = { state: storedData, level: null };
            }
            
            const { state, level } = progressData;
            
            if (state === 'committed' || state === 'pushed') {
                p.classList.add('p-committed');
                
                // Apply current AI-Q typography level (upgrades on reload!)
                const currentAIQ = getCurrentAIQ();
                const currentLevel = getUserLevel(currentAIQ);
                applyTypographyLevel(p, currentLevel);
                
                // Update localStorage with current level if it's outdated
                if (level !== currentLevel) {
                    localStorage.setItem(p.id, JSON.stringify({
                        state: state,
                        level: currentLevel,
                        aiq: currentAIQ,
                        timestamp: Date.now()
                    }));
                }
                
                const icon = document.createElement('span');
                icon.className = 'status-icon';
                p.insertBefore(icon, p.firstChild);

                if (state === 'pushed') {
                    p.classList.add('p-pushed');
                    icon.classList.add('icon-pushed');
                    icon.innerHTML = '✔';
                } else {
                    icon.classList.add('icon-staged');
                    icon.innerHTML = '●';
                }
            }
        }
    });

    // Handle the "Push" action
    const pushButton = document.querySelector('.aiq-completion-btn');
    if (pushButton) {
        pushButton.addEventListener('click', () => {
            const committedParagraphs = contentWrapper.querySelectorAll('.p-committed:not(.p-pushed)');
            
            committedParagraphs.forEach(p => {
                p.classList.add('p-pushed');
                const stagedIcon = p.querySelector('.icon-staged');
                if (stagedIcon) {
                    stagedIcon.classList.remove('icon-staged');
                    stagedIcon.classList.add('icon-pushed');
                    stagedIcon.innerHTML = '✔';
                }
                
                // Update localStorage with enhanced data format
                const currentAIQ = getCurrentAIQ();
                const typographyLevel = getUserLevel(currentAIQ);
                localStorage.setItem(p.id, JSON.stringify({
                    state: 'pushed',
                    level: typographyLevel,
                    aiq: currentAIQ,
                    timestamp: Date.now()
                }));
            });

            synapticPushAnimation();
        });
    }
});

/**
 * Synaptic Push Animation - Brain Neural Network Simulation
 * Creates a sequential chain reaction from Push button through all brain cells
 */
function synapticPushAnimation() {
    const synapticContainer = document.createElement('div');
    synapticContainer.className = 'synaptic-animation-container';
    synapticContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
    `;
    document.body.appendChild(synapticContainer);

    // Find the Push button (origin)
    const pushButton = document.querySelector('.aiq-completion-btn');
    if (!pushButton) {
        console.error('Push button not found for synaptic animation');
        return;
    }
    
    const pushRect = pushButton.getBoundingClientRect();
    const originX = pushRect.left + (pushRect.width / 2);
    const originY = pushRect.top + (pushRect.height / 2);

    // Find all brain cells (staged icons) in document order
    const brainCells = Array.from(document.querySelectorAll('.icon-staged')).sort((a, b) => {
        const aRect = a.getBoundingClientRect();
        const bRect = b.getBoundingClientRect();
        return aRect.top - bRect.top; // Top to bottom order
    });
    
    console.log(`Synaptic animation: ${brainCells.length} brain cells detected`);
    
    if (brainCells.length === 0) {
        synapticContainer.remove();
        return;
    }

    // Find AI-Q bar as final destination
    const aiqBar = document.querySelector('.aiq-progress-bar, .aiq-dashboard, [class*="aiq"]');
    let finalTargetX, finalTargetY;
    if (aiqBar) {
        const aiqRect = aiqBar.getBoundingClientRect();
        finalTargetX = aiqRect.left + (aiqRect.width / 2);
        finalTargetY = aiqRect.top + (aiqRect.height / 2);
    } else {
        finalTargetX = window.innerWidth - 100;
        finalTargetY = 50;
    }

    // Create initial pulse from Push button
    createEnergyPulse(synapticContainer, originX, originY, 'origin-pulse');
    
    // Sequential activation of brain cells
    let previousX = originX;
    let previousY = originY;
    
    brainCells.forEach((cell, index) => {
        const cellRect = cell.getBoundingClientRect();
        const cellX = cellRect.left + (cellRect.width / 2);
        const cellY = cellRect.top + (cellRect.height / 2);
        
        setTimeout(() => {
            // Create synapse connection from previous position to current cell
            createSynapseConnection(synapticContainer, previousX, previousY, cellX, cellY, index);
            
            // Activate the brain cell after connection arrives
            setTimeout(() => {
                activateBrainCell(cell, index);
                createEnergyPulse(synapticContainer, cellX, cellY, 'cell-activation');
            }, 300 + (index * 50)); // Stagger activations
            
            previousX = cellX;
            previousY = cellY;
            
            // If this is the last cell, send final pulse to AI-Q bar
            if (index === brainCells.length - 1) {
                setTimeout(() => {
                    createSynapseConnection(synapticContainer, cellX, cellY, finalTargetX, finalTargetY, 'final');
                    
                    setTimeout(() => {
                        createFinalBurst(synapticContainer, finalTargetX, finalTargetY);
                    }, 600);
                }, 800);
            }
        }, index * 400); // Sequential timing
    });

    // Cleanup after animation completes
    setTimeout(() => {
        synapticContainer.remove();
    }, brainCells.length * 400 + 3000);
}

/**
 * Create an energy pulse at specific coordinates
 */
function createEnergyPulse(container, x, y, type) {
    const pulse = document.createElement('div');
    pulse.className = `energy-pulse ${type}`;
    pulse.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 10px;
        height: 10px;
        background: radial-gradient(circle, #10B981 0%, #34D399 70%, transparent 100%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: synaptic-pulse 0.8s ease-out;
        box-shadow: 0 0 20px #10B981;
    `;
    container.appendChild(pulse);
    
    setTimeout(() => pulse.remove(), 800);
}

/**
 * Create synapse connection between two points
 */
function createSynapseConnection(container, x1, y1, x2, y2, index) {
    const connection = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    connection.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
    `;
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
    // Create curved path for more organic feel
    const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * 50;
    const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * 30;
    const pathD = `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`;
    
    line.setAttribute('d', pathD);
    line.setAttribute('stroke', '#34D399');
    line.setAttribute('stroke-width', '2');
    line.setAttribute('fill', 'none');
    line.setAttribute('opacity', '0');
    line.style.filter = 'drop-shadow(0 0 4px #10B981)';
    
    connection.appendChild(line);
    container.appendChild(connection);
    
    // Animate the connection
    setTimeout(() => {
        line.style.animation = `synapse-connection 0.6s ease-out forwards`;
    }, 50);
    
    // Create traveling energy particle
    setTimeout(() => {
        createTravelingParticle(container, pathD, index);
    }, 100);
    
    // Fade out connection after animation
    setTimeout(() => {
        line.style.animation = `synapse-fade 1s ease-out forwards`;
        setTimeout(() => connection.remove(), 1000);
    }, 1200);
}

/**
 * Create particle that travels along the synapse path
 */
function createTravelingParticle(container, pathD, index) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 6px;
        height: 6px;
        background: #10B981;
        border-radius: 50%;
        box-shadow: 0 0 10px #10B981;
        animation: particle-travel-path 0.5s ease-out;
    `;
    
    // Set CSS custom properties for path animation
    particle.style.setProperty('--path', `"${pathD}"`);
    
    container.appendChild(particle);
    
    setTimeout(() => particle.remove(), 500);
}

/**
 * Activate a brain cell (change from staged to pushed)
 */
function activateBrainCell(cell, index) {
    // Create activation flash
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: absolute;
        left: 50%;
        top: 50%;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #10B981 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: cell-activation-flash 0.4s ease-out;
        pointer-events: none;
        z-index: 10;
    `;
    
    cell.style.position = 'relative';
    cell.appendChild(flash);
    
    // Transform the cell
    setTimeout(() => {
        cell.classList.remove('icon-staged');
        cell.classList.add('icon-pushed');
        cell.innerHTML = '✔';
        cell.style.animation = 'cell-transformation 0.3s ease-out';
        flash.remove();
    }, 200);
}

/**
 * Create final burst at AI-Q bar
 */
function createFinalBurst(container, x, y) {
    for (let i = 0; i < 12; i++) {
        const burst = document.createElement('div');
        const angle = (Math.PI * 2 * i) / 12;
        const distance = 60 + Math.random() * 40;
        
        burst.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 8px;
            height: 8px;
            background: hsl(${120 + Math.random() * 60}, 100%, 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 10px currentColor;
        `;
        
        burst.style.setProperty('--burst-x', `${Math.cos(angle) * distance}px`);
        burst.style.setProperty('--burst-y', `${Math.sin(angle) * distance}px`);
        burst.style.animation = `final-neural-burst 1s ease-out forwards`;
        
        container.appendChild(burst);
        
        setTimeout(() => burst.remove(), 1000);
    }
}
