console.log('Interactive Reading JS file loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('Interactive Reading System Starting...');
    console.log('Current page:', window.location.pathname);

    const contentWrapper = document.getElementById('reading-content-wrapper');
    console.log('Wrapper element found:', contentWrapper);
    console.log('Wrapper tag name:', contentWrapper?.tagName);

    if (!contentWrapper) {
        console.error('ERROR: Could not find reading-content-wrapper element');
        console.log('Available elements with IDs:', Array.from(document.querySelectorAll('[id]')).map(el => el.id));
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
    
    /**
     * Calculate XP reward based on element type
     * @param {HTMLElement} element - The interactive element
     * @returns {number} XP value for this element
     */
    function getElementXP(element) {
        const tagName = element.tagName.toLowerCase();
        const textLength = element.textContent.trim().length;
        
        switch (tagName) {
            case 'h1':
                return 50; // Major section headers
            case 'h2':
                return 35; // Sub-section headers
            case 'h3':
                return 25; // Sub-sub-section headers
            case 'h4':
            case 'h5':
            case 'h6':
                return 15; // Minor headers
            case 'p':
                // Paragraphs get XP based on content length
                if (textLength < 50) return 5;
                if (textLength < 150) return 10;
                if (textLength < 300) return 15;
                return 20; // Long paragraphs
            case 'li':
                // List items based on content
                if (textLength < 30) return 3;
                if (textLength < 100) return 5;
                return 8; // Detailed list items
            default:
                return 5; // Default for any other elements
        }
    }
    
    /**
     * Create sparkling brain cell animation for committed element
     * @param {HTMLElement} element - The committed element
     */
    function createSparklingBrainCell(element) {
        const brainCell = document.createElement('span');
        brainCell.className = 'status-icon brain-cell-active';
        brainCell.innerHTML = '🧠';
        brainCell.title = `Active Brain Cell (+${getElementXP(element)} XP)`;
        
        // Position at top-left corner of element
        brainCell.style.position = 'absolute';
        brainCell.style.left = '0px';
        brainCell.style.top = '0px';
        brainCell.style.transform = 'translate(-50%, -50%)';
        brainCell.style.zIndex = '1001';
        brainCell.style.display = 'inline-block';
        
        // Ensure element has relative positioning for absolute brain cell
        if (getComputedStyle(element).position === 'static') {
            element.style.position = 'relative';
        }
        
        element.appendChild(brainCell);
        
        // Create sparkling particles around brain cell (delayed for initial load)
        setTimeout(() => {
            createSparklingParticles(brainCell);
        }, 200);
        
        return brainCell;
    }
    
    /**
     * Create sparkling particle effects around brain cell
     * @param {HTMLElement} brainCell - The brain cell element
     */
    function createSparklingParticles(brainCell) {
        const numParticles = 8;
        const rect = brainCell.getBoundingClientRect();
        
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'spark-particle';
            particle.innerHTML = '✨';
            particle.style.cssText = `
                position: fixed;
                left: ${rect.left + rect.width/2}px;
                top: ${rect.top + rect.height/2}px;
                font-size: 12px;
                pointer-events: none;
                z-index: 9999;
                animation: sparkle-burst 1.5s ease-out forwards;
                animation-delay: ${i * 0.1}s;
            `;
            
            // Random direction for each particle
            const angle = (Math.PI * 2 * i) / numParticles;
            const distance = 30 + Math.random() * 20;
            particle.style.setProperty('--spark-x', `${Math.cos(angle) * distance}px`);
            particle.style.setProperty('--spark-y', `${Math.sin(angle) * distance}px`);
            
            document.body.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => particle.remove(), 1500 + (i * 100));
        }
        
        console.log('✨ Brain cell sparkling activated!');
    }
    
    /**
     * Create electrical synapse animation from commit button to brain cell
     * @param {HTMLElement} fromElement - The commit button
     * @param {HTMLElement} toElement - The brain cell
     */
    function createElectricalSynapseAnimation(fromElement, toElement) {
        const fromRect = fromElement.getBoundingClientRect();
        const toRect = toElement.getBoundingClientRect();
        
        // Calculate positions
        const fromX = fromRect.left + fromRect.width / 2;
        const fromY = fromRect.top + fromRect.height / 2;
        const toX = toRect.left + toRect.width / 2;
        const toY = toRect.top + toRect.height / 2;
        
        // Create SVG for electrical line
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9998;
        `;
        
        // Create electrical path with zigzag pattern
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const distance = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
        const numZigzags = Math.floor(distance / 20);
        
        let pathData = `M ${fromX} ${fromY}`;
        for (let i = 1; i <= numZigzags; i++) {
            const progress = i / numZigzags;
            const x = fromX + (toX - fromX) * progress;
            const y = fromY + (toY - fromY) * progress;
            const offset = (i % 2 === 0 ? 1 : -1) * 8;
            const perpX = -(toY - fromY) / distance * offset;
            const perpY = (toX - fromX) / distance * offset;
            pathData += ` L ${x + perpX} ${y + perpY}`;
        }
        pathData += ` L ${toX} ${toY}`;
        
        path.setAttribute('d', pathData);
        path.setAttribute('stroke', '#00FFFF');
        path.setAttribute('stroke-width', '3');
        path.setAttribute('fill', 'none');
        path.setAttribute('opacity', '0');
        path.style.filter = 'drop-shadow(0 0 6px #00FFFF)';
        
        svg.appendChild(path);
        document.body.appendChild(svg);
        
        // Animate electrical current
        setTimeout(() => {
            path.style.animation = 'electrical-current 0.8s ease-out forwards';
        }, 100);
        
        // Create travelling spark
        setTimeout(() => {
            createTravellingElectricalSpark(fromX, fromY, toX, toY);
        }, 200);
        
        // Clean up
        setTimeout(() => {
            svg.remove();
        }, 1500);
        
        console.log('⚡ Electrical synapse animation: button → brain cell');
    }
    
    /**
     * Create travelling electrical spark along the synapse path
     * @param {number} fromX - Start X coordinate
     * @param {number} fromY - Start Y coordinate  
     * @param {number} toX - End X coordinate
     * @param {number} toY - End Y coordinate
     */
    function createTravellingElectricalSpark(fromX, fromY, toX, toY) {
        const spark = document.createElement('div');
        spark.style.cssText = `
            position: fixed;
            left: ${fromX}px;
            top: ${fromY}px;
            width: 8px;
            height: 8px;
            background: radial-gradient(circle, #00FFFF 0%, #0080FF 100%);
            border-radius: 50%;
            box-shadow: 0 0 12px #00FFFF, 0 0 24px #0080FF;
            z-index: 9999;
            pointer-events: none;
        `;
        
        spark.style.setProperty('--spark-start-x', `${fromX}px`);
        spark.style.setProperty('--spark-start-y', `${fromY}px`);
        spark.style.setProperty('--spark-end-x', `${toX}px`);
        spark.style.setProperty('--spark-end-y', `${toY}px`);
        
        document.body.appendChild(spark);
        
        // Animate spark travel
        setTimeout(() => {
            spark.style.animation = 'electrical-spark-travel 0.6s ease-out forwards';
        }, 50);
        
        // Remove spark
        setTimeout(() => spark.remove(), 700);
    }
    
    // =================================
    // TOUCH DEVICE DETECTION & INTERACTION
    // =================================
    
    /**
     * Detect if the user is primarily using touch (mobile/tablet)
     * @returns {boolean} True if primarily touch device
     */
    const isTouchDevice = () => {
        // More accurate detection - check for mobile patterns
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isSmallScreen = window.innerWidth <= 768;
        
        // Only use touch logic if it's actually a mobile device or small screen with touch
        return hasTouch && (isMobile || isSmallScreen);
    }
    
    const isTouch = isTouchDevice();
    console.log('Touch device detected:', isTouch);
    console.log('Screen width:', window.innerWidth);
    console.log('User agent contains mobile:', /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    
    // Touch-specific variables
    let activeTouchButton = null;
    let activeElement = null;
    let confirmationTimeout = null;
    let touchStartTime = 0;
    let isScrolling = false;
    let scrollThreshold = 25; // pixels - increased for better touch sensitivity
    
    // Two-phase touch system variables
    let pendingConfirmation = false;
    let currentPopupElement = null;

    const paragraphs = contentWrapper.querySelectorAll('p');
    console.log('Found ' + paragraphs.length + ' paragraphs to make interactive');
    
    if (paragraphs.length > 0) {
        console.log('First paragraph preview:', paragraphs[0].textContent.substring(0, 100) + '...');
        console.log('Sample paragraph IDs:', Array.from(paragraphs).slice(0, 3).map(p => p.id || 'no-id'));
    } else {
        console.warn('WARNING: No paragraphs found in wrapper!');
        console.log('Checking document structure...');
        console.log('All paragraphs in document:', document.querySelectorAll('p').length);
        console.log('Wrapper innerHTML length:', contentWrapper.innerHTML.length);
        return;
    }

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
     * Dismiss the currently active touch button with optional slide-away animation
     */
    function dismissTouchButton(withSlideAway = false) {
        if (activeTouchButton) {
            if (withSlideAway) {
                // Slide away animation with sound effect
                activeTouchButton.classList.add('slide-away');
                playSlideAwaySound();
                console.log('🌬️ Popup slid away - timeout expired');
            } else {
                activeTouchButton.classList.remove('visible');
            }
            
            setTimeout(() => {
                if (activeTouchButton) {
                    activeTouchButton.remove();
                    activeTouchButton = null;
                    currentPopupElement = null;
                    pendingConfirmation = false;
                }
            }, withSlideAway ? 600 : 300);
        }
    }
    
    /**
     * Clear any pending confirmation timeout
     */
    function clearConfirmationTimeout() {
        if (confirmationTimeout) {
            clearTimeout(confirmationTimeout);
            confirmationTimeout = null;
        }
    }
    
    /**
     * Start 2-second confirmation timeout for current popup
     */
    function startConfirmationTimeout() {
        clearConfirmationTimeout();
        confirmationTimeout = setTimeout(() => {
            if (pendingConfirmation && activeTouchButton) {
                dismissTouchButton(true); // Slide away with sound
            }
        }, 2000);
    }
    
    /**
     * Update popup position to follow element during scroll
     */
    function updatePopupPosition() {
        if (activeTouchButton && currentPopupElement) {
            const elementRect = currentPopupElement.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const buttonFromTop = elementRect.top + (elementRect.height / 2) - 22;
            
            // Ensure button stays within comfortable reach
            const maxTop = viewportHeight - 100; // 100px from bottom
            const minTop = 60; // 60px from top
            const finalTop = Math.max(minTop, Math.min(maxTop, buttonFromTop));
            
            // Update button position relative to element's current position
            activeTouchButton.style.top = `${finalTop - elementRect.top}px`;
            
            console.log('🔄 Updated popup position during scroll');
        }
    }
    
    /**
     * Play slide-away sound effect
     */
    function playSlideAwaySound() {
        // Create audio context for slide-away sound
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Sliding frequency sweep (high to low)
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3);
            
            // Volume fade out
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.type = 'sine';
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (e) {
            console.log('Audio not supported');
        }
    }

    // RCSP System: Read-Commit-Stage-Push
    const headings = contentWrapper.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const listItems = contentWrapper.querySelectorAll('li');
    
    console.log('RCSP System Elements Found:');
    console.log('- Paragraphs:', paragraphs.length);
    console.log('- Headings:', headings.length);
    console.log('- List Items:', listItems.length);
    console.log('- Total Interactive Elements:', paragraphs.length + headings.length + listItems.length);
    
    // Combine all interactive elements
    const allElements = [...paragraphs, ...headings, ...listItems];
    console.log('Setting up RCSP listeners for', allElements.length, 'elements...');
    
    allElements.forEach((element, index) => {
        if (!element.id) {
            const elementType = element.tagName.toLowerCase();
            element.id = `${elementType}-interactive-${index}`;
        }
        
        console.log(`[${index + 1}/${allElements.length}] Setting up: ${element.id} (${element.tagName})`);

        let commitButton = null;
        let interactionContainer = null;

        // Create interaction container that includes both element and button area
        function createInteractionContainer() {
            if (!interactionContainer) {
                interactionContainer = document.createElement('div');
                interactionContainer.className = 'element-interaction-container';
                element.parentNode.insertBefore(interactionContainer, element);
                interactionContainer.appendChild(element);
            }
        }

        /**
         * Create and show commit button with two-phase touch system
         * @param {boolean} isTouchInteraction - Whether this is for touch interaction
         * @param {boolean} isPersistent - Whether this popup should persist after touch lift
         */
        function showCommitButton(isTouchInteraction = false, isPersistent = false) {
            if (commitButton || element.classList.contains('element-committed') || element.classList.contains('element-pushed')) return;
            
            // Two-phase touch logic: dismiss previous popup if switching elements
            if (isTouchInteraction && currentPopupElement && currentPopupElement !== element) {
                dismissTouchButton();
                clearConfirmationTimeout();
            }
            
            // If same element is touched again during pending confirmation, just reset timeout
            if (isTouchInteraction && currentPopupElement === element && pendingConfirmation) {
                startConfirmationTimeout();
                return;
            }
            
            createInteractionContainer();
            
            commitButton = document.createElement('button');
            commitButton.className = 'commit-button';
            commitButton.innerHTML = '<i class="fa-solid fa-check"></i>';
            interactionContainer.appendChild(commitButton);

            if (isTouchInteraction) {
                // For touch: position button in a more ergonomic, fixed location
                const elementRect = element.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const buttonFromTop = elementRect.top + (elementRect.height / 2) - 22;
                
                // Ensure button stays within comfortable reach
                const maxTop = viewportHeight - 100; // 100px from bottom
                const minTop = 60; // 60px from top
                const finalTop = Math.max(minTop, Math.min(maxTop, buttonFromTop));
                
                commitButton.style.top = `${finalTop - elementRect.top}px`;
                commitButton.style.right = '10px'; // Closer for thumb reach
                
                // Set as active touch button and current popup element
                activeTouchButton = commitButton;
                currentPopupElement = element;
                
                // Immediate visibility for touch
                commitButton.classList.add('visible');
                
                // If persistent (after touch lift), start confirmation timeout
                if (isPersistent) {
                    pendingConfirmation = true;
                    startConfirmationTimeout();
                    console.log('💚 Popup persistent - waiting for confirmation within 2s');
                }
            } else {
                // For mouse: use existing positioning
                const elementRect = element.getBoundingClientRect();
                commitButton.style.top = `${(elementRect.height / 2) - 22}px`;
                
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
            // Clear any pending confirmation
            clearConfirmationTimeout();
            pendingConfirmation = false;
            
            commitButton.classList.add('clicked');
            element.classList.add('element-committed');
            
            // Apply Living Document typography level (only for paragraphs)
            const currentAIQ = getCurrentAIQ();
            const typographyLevel = getUserLevel(currentAIQ);
            if (element.tagName.toLowerCase() === 'p') {
                applyTypographyLevel(element, typographyLevel);
            }
            
            // Create sparkling brain cell instead of simple staged icon
            const brainCell = createSparklingBrainCell(element);
            
            // Create electrical synapse animation from button to brain cell
            if (commitButton && brainCell) {
                createElectricalSynapseAnimation(commitButton, brainCell);
            }

            // Calculate XP based on element type
            const xpValue = getElementXP(element);
            
            // Store enhanced progress data with typography level and XP
            localStorage.setItem(element.id, JSON.stringify({
                state: 'committed',
                level: typographyLevel,
                aiq: currentAIQ,
                xp: xpValue,
                elementType: element.tagName.toLowerCase(),
                timestamp: Date.now()
            }));

            console.log(`✨ Committed ${element.tagName.toLowerCase()}: ${element.id} (+${xpValue} XP) - Brain cell activated!`);

            // Clear active touch references
            if (activeTouchButton === commitButton) {
                activeTouchButton = null;
                currentPopupElement = null;
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
            // TWO-PHASE TOUCH SYSTEM LOGIC
            let touchStartPos = null;
            let isScrollingDetected = false;
            
            element.addEventListener('touchstart', (e) => {
                if (element.classList.contains('element-committed') || element.classList.contains('element-pushed')) return;
                
                // Store initial touch position
                touchStartPos = {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY,
                    time: Date.now()
                };
                isScrollingDetected = false;
                
                console.log('👆 Touch started on element:', element.id);
                
                // Phase 1: Show popup immediately on touch start
                showCommitButton(true, false);
            }, { passive: true });
            
            element.addEventListener('touchmove', (e) => {
                // Check if this is intentional scrolling vs accidental movement
                if (touchStartPos) {
                    const currentTouch = e.touches[0];
                    const deltaX = Math.abs(currentTouch.clientX - touchStartPos.x);
                    const deltaY = Math.abs(currentTouch.clientY - touchStartPos.y);
                    
                    // If significant movement detected, mark as scrolling but keep popup visible
                    if (deltaY > scrollThreshold || deltaX > scrollThreshold * 2) {
                        isScrollingDetected = true;
                        console.log('📜 Scrolling detected - popup stays visible, follows element');
                        
                        // Update popup position to follow the element during scroll
                        if (activeTouchButton === commitButton) {
                            updatePopupPosition();
                        }
                    }
                }
            }, { passive: true });
            
            element.addEventListener('touchend', (e) => {
                // Phase 2: Always make popup persistent with 2s timeout (both scroll and static touch)
                if (touchStartPos && activeTouchButton === commitButton) {
                    const actionType = isScrollingDetected ? 'after scroll' : 'static touch';
                    console.log(`🔒 Touch lifted ${actionType} - popup now persistent for 2s`);
                    showCommitButton(true, true); // Make persistent
                }
                
                touchStartPos = null;
                isScrollingDetected = false;
            }, { passive: true });
            
        } else {
            // DESKTOP/MOUSE LOGIC (Existing behavior)
            element.addEventListener('mouseenter', (e) => {
                console.log('MOUSE ENTERED element:', element.id);
                if (element.classList.contains('element-committed') || element.classList.contains('element-pushed')) {
                    console.log('Element already committed/pushed, skipping');
                    return;
                }

                hoverTimeout = setTimeout(() => {
                    console.log('HOVER TIMEOUT reached, showing button for:', element.id);
                    showCommitButton(false);
                }, 500);
            });

            element.addEventListener('mouseleave', (e) => {
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

    console.log('RCSP INTERACTIVE SYSTEM SETUP COMPLETE!');
    console.log('INSTRUCTIONS: Hover over any element (paragraphs, headings, lists) for 500ms to see commit button');
    console.log('MOBILE: tap any element to show button, tap button to commit');
    console.log('XP SYSTEM: Elements award different XP based on type and content length');
    console.log('STORAGE: Progress automatically saved to localStorage with XP tracking');

    // Load initial state from localStorage with Living Document support
    allElements.forEach(element => {
        const storedData = localStorage.getItem(element.id);
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
                element.classList.add('element-committed');
                
                // Apply current AI-Q typography level (upgrades on reload!) - only for paragraphs
                const currentAIQ = getCurrentAIQ();
                const currentLevel = getUserLevel(currentAIQ);
                if (element.tagName.toLowerCase() === 'p') {
                    applyTypographyLevel(element, currentLevel);
                }
                
                // Update localStorage with current level if it's outdated
                if (level !== currentLevel) {
                    localStorage.setItem(element.id, JSON.stringify({
                        state: state,
                        level: currentLevel,
                        aiq: currentAIQ,
                        xp: getElementXP(element),
                        elementType: element.tagName.toLowerCase(),
                        timestamp: Date.now()
                    }));
                }
                
                if (state === 'pushed') {
                    element.classList.add('element-pushed');
                    // Create pushed icon
                    const icon = document.createElement('span');
                    icon.className = 'status-icon icon-pushed';
                    icon.innerHTML = '✔';
                    element.insertBefore(icon, element.firstChild);
                } else {
                    // Create sparkling brain cell for committed elements
                    createSparklingBrainCell(element);
                }
            }
        }
    });

    // Handle the "Push" action
    const pushButton = document.querySelector('.aiq-completion-btn');
    if (pushButton) {
        pushButton.addEventListener('click', () => {
            const committedElements = contentWrapper.querySelectorAll('.element-committed:not(.element-pushed)');
            
            committedElements.forEach(element => {
                element.classList.add('element-pushed');
                
                // Replace brain cell with pushed checkmark
                const brainCell = element.querySelector('.brain-cell-active');
                if (brainCell) {
                    brainCell.classList.remove('brain-cell-active');
                    brainCell.classList.add('icon-pushed');
                    brainCell.innerHTML = '✔';
                    brainCell.title = 'Pushed to AI-Q System';
                }
                
                // Update localStorage with enhanced data format
                const currentAIQ = getCurrentAIQ();
                const typographyLevel = getUserLevel(currentAIQ);
                localStorage.setItem(element.id, JSON.stringify({
                    state: 'pushed',
                    level: typographyLevel,
                    aiq: currentAIQ,
                    xp: getElementXP(element),
                    elementType: element.tagName.toLowerCase(),
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

// Test function to verify system is working
window.testInteractiveReading = function() {
    console.log('TESTING RCSP INTERACTIVE SYSTEM...');
    const wrapper = document.getElementById('reading-content-wrapper');
    console.log('Wrapper found:', !!wrapper);
    if (wrapper) {
        const paragraphs = wrapper.querySelectorAll('p');
        const headings = wrapper.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const listItems = wrapper.querySelectorAll('li');
        const totalElements = paragraphs.length + headings.length + listItems.length;
        
        console.log('RCSP Elements found:');
        console.log('- Paragraphs:', paragraphs.length);
        console.log('- Headings:', headings.length);
        console.log('- List Items:', listItems.length);
        console.log('- Total Interactive Elements:', totalElements);
        
        if (paragraphs.length > 0) {
            console.log('First paragraph text:', paragraphs[0].textContent.substring(0, 50) + '...');
            console.log('First paragraph ID:', paragraphs[0].id);
            console.log('First paragraph XP:', getElementXP ? getElementXP(paragraphs[0]) : 'XP function not available');
        }
    }
    console.log('RCSP System test complete. Check console output above.');
};
