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

    const paragraphs = contentWrapper.querySelectorAll('p');
    console.log('Found ' + paragraphs.length + ' paragraphs to attach listeners to.');

    let hoverTimeout;

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

        function showCommitButton() {
            if (commitButton || p.classList.contains('p-committed') || p.classList.contains('p-pushed')) return;
            
            createInteractionContainer();
            
            commitButton = document.createElement('button');
            commitButton.className = 'commit-button';
            commitButton.innerHTML = '<i class="fa-solid fa-check"></i>';
            interactionContainer.appendChild(commitButton);

            const pRect = p.getBoundingClientRect();
            commitButton.style.top = `${(pRect.height / 2) - 22}px`;
            
            setTimeout(() => {
                commitButton.classList.add('visible');
            }, 10);

            commitButton.addEventListener('click', () => {
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

                setTimeout(() => {
                    if (commitButton) commitButton.remove();
                    commitButton = null;
                }, 400);
            });
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

        p.addEventListener('mouseenter', (e) => {
            console.log('Mouse entered paragraph:', e.target);
            if (p.classList.contains('p-committed') || p.classList.contains('p-pushed')) return;

            hoverTimeout = setTimeout(() => {
                console.log('Pause detected on paragraph:', e.target);
                showCommitButton();
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

            fireworksAnimation();
        });
    }
});

function fireworksAnimation() {
    const fireworksContainer = document.createElement('div');
    fireworksContainer.style.position = 'fixed';
    fireworksContainer.style.top = '0';
    fireworksContainer.style.left = '0';
    fireworksContainer.style.width = '100%';
    fireworksContainer.style.height = '100%';
    fireworksContainer.style.pointerEvents = 'none';
    fireworksContainer.style.zIndex = '9999';
    document.body.appendChild(fireworksContainer);

    // Find all pushed checkmarks (✔) to use as origins
    const checkmarks = document.querySelectorAll('.icon-pushed');
    
    // Find AI-Q bar as destination (fallback to top-right if not found)
    const aiqBar = document.querySelector('.aiq-progress-bar, .aiq-dashboard, [class*="aiq"]');
    let targetRect;
    if (aiqBar) {
        targetRect = aiqBar.getBoundingClientRect();
    } else {
        // Default to top-right corner
        targetRect = { left: window.innerWidth - 100, top: 50, width: 80, height: 30 };
    }
    
    const targetX = targetRect.left + (targetRect.width / 2);
    const targetY = targetRect.top + (targetRect.height / 2);

    // Create particles from each checkmark
    checkmarks.forEach((checkmark, checkIndex) => {
        const checkRect = checkmark.getBoundingClientRect();
        const startX = checkRect.left + (checkRect.width / 2);
        const startY = checkRect.top + (checkRect.height / 2);
        
        // Create multiple particles per checkmark
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.width = '4px';
                particle.style.height = '4px';
                particle.style.borderRadius = '50%';
                particle.style.background = `hsl(${120 + Math.random() * 60}, 100%, 60%)`; // Green-ish colors
                particle.style.left = startX + 'px';
                particle.style.top = startY + 'px';
                particle.style.boxShadow = `0 0 6px ${particle.style.background}`;
                
                // Calculate travel path with slight randomness
                const deltaX = targetX - startX + (Math.random() - 0.5) * 40;
                const deltaY = targetY - startY + (Math.random() - 0.5) * 40;
                
                particle.style.setProperty('--start-x', '0px');
                particle.style.setProperty('--start-y', '0px');
                particle.style.setProperty('--end-x', deltaX + 'px');
                particle.style.setProperty('--end-y', deltaY + 'px');
                
                particle.style.animation = `particle-travel 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
                
                fireworksContainer.appendChild(particle);
                
                // Remove particle after animation
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.remove();
                    }
                }, 1200);
            }, i * 50 + checkIndex * 100); // Stagger particles
        }
    });
    
    // Create celebration burst at AI-Q bar after particles arrive
    setTimeout(() => {
        for (let i = 0; i < 20; i++) {
            const burst = document.createElement('div');
            burst.style.position = 'absolute';
            burst.style.width = '6px';
            burst.style.height = '6px';
            burst.style.borderRadius = '50%';
            burst.style.background = `hsl(${Math.random() * 360}, 100%, 70%)`;
            burst.style.left = targetX + 'px';
            burst.style.top = targetY + 'px';
            
            // Set random direction for burst
            const angle = (Math.PI * 2 * i) / 20; // Distribute evenly in circle
            const distance = 50 + Math.random() * 50; // Random distance
            const deltaX = Math.cos(angle) * distance;
            const deltaY = Math.sin(angle) * distance;
            
            burst.style.setProperty('--burst-x', deltaX + 'px');
            burst.style.setProperty('--burst-y', deltaY + 'px');
            burst.style.animation = `celebration-burst 0.8s ease-out forwards`;
            fireworksContainer.appendChild(burst);
        }
    }, 1000);

    setTimeout(() => {
        fireworksContainer.remove();
    }, 2000);
}
