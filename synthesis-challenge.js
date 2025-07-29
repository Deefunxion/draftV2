/**
 * AI Orchestrator's Ascent - Synthesis Challenge System
 * Implements "Proof of Work" Learning Loop with provisional/committed points
 * Based on the Unified Blueprint's Scribe's Gambit model
 */

class SynthesisChallenge {
    constructor() {
        this.challengeCount = 0;
        this.provisionalPoints = 0;
        this.readingProgressThreshold = 0.3; // 30% reading progress to unlock challenges
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupSystem());
        } else {
            this.setupSystem();
        }
    }

    setupSystem() {
        this.injectReadingCheckboxes();
        this.createChallengeContainer();
        this.bindEvents();
        this.updateProgressDisplay();
        console.log('📚 Synthesis Challenge System initialized');
    }

    /**
     * Dynamically inject checkboxes before each <p> tag in main content
     * Following Nielsen-Norman principles: Clear, actionable micro-interactions
     */
    injectReadingCheckboxes() {
        // Target main content paragraphs (avoid navigation, headers, etc.)
        const contentSelectors = [
            'main p', 
            '.content p', 
            'article p',
            'body > p', // Fallback for simple structure
            'h1 ~ p', 'h2 ~ p', 'h3 ~ p' // Paragraphs following headers
        ];

        let paragraphs = [];
        for (const selector of contentSelectors) {
            const found = document.querySelectorAll(selector);
            if (found.length > 0) {
                paragraphs = Array.from(found);
                break;
            }
        }

        // If no specific content area found, target all paragraphs but filter out navigation
        if (paragraphs.length === 0) {
            const allP = document.querySelectorAll('p');
            paragraphs = Array.from(allP).filter(p => {
                const parent = p.closest('.nav-menu, nav, header, footer');
                return !parent; // Exclude paragraphs in navigation areas
            });
        }

        console.log(`📖 Found ${paragraphs.length} content paragraphs`);

        paragraphs.forEach((paragraph, index) => {
            // Create reading checkpoint
            const checkpoint = this.createReadingCheckpoint(index, paragraph);
            paragraph.parentNode.insertBefore(checkpoint, paragraph);
        });

        this.totalParagraphs = paragraphs.length;
    }

    /**
     * Create a reading checkpoint with FontAwesome icons (no default emojis!)
     */
    createReadingCheckpoint(index, paragraph) {
        const wrapper = document.createElement('div');
        wrapper.className = 'reading-checkpoint';
        wrapper.innerHTML = `
            <label class="reading-progress-item">
                <input type="checkbox" 
                       id="reading-${index}" 
                       class="reading-checkbox" 
                       data-paragraph="${index}">
                <span class="checkpoint-icon">
                    <i class="fa-regular fa-circle"></i>
                    <i class="fa-solid fa-check-circle"></i>
                </span>
                <span class="checkpoint-label">Παράγραφος ${index + 1}</span>
            </label>
        `;

        return wrapper;
    }

    /**
     * Create hidden challenge container that appears after sufficient reading
     */
    createChallengeContainer() {
        const challengeHtml = `
            <div id="synthesis-challenge-container" class="challenge-container hidden">
                <div class="challenge-header">
                    <h3><i class="fa-solid fa-brain"></i> Πρόκληση Σύνθεσης</h3>
                    <p class="challenge-subtitle">Μετατρέψτε την ανάγνωση σε βαθιά κατανόηση</p>
                </div>
                
                <div class="challenge-content">
                    <div class="challenge-prompt">
                        <h4><i class="fa-solid fa-lightbulb"></i> Η Πρόκλησή σας:</h4>
                        <p id="challenge-text">Συνθέστε μια παράγραφο που συνδέει 3 βασικές έννοιες από αυτό που μόλις διαβάσατε με τη δική σας επαγγελματική εμπειρία.</p>
                    </div>
                    
                    <div class="challenge-input">
                        <label for="synthesis-response">
                            <i class="fa-solid fa-pencil"></i> Η Σύνθεσή σας:
                        </label>
                        <textarea id="synthesis-response" 
                                rows="4" 
                                placeholder="Γράψτε εδώ τη σύνθεσή σας... (ελάχιστα 100 χαρακτήρες)"></textarea>
                        <div class="response-counter">
                            <span id="char-count">0</span>/100 χαρακτήρες
                        </div>
                    </div>
                    
                    <div class="challenge-actions">
                        <button id="submit-synthesis" class="challenge-btn primary" disabled>
                            <i class="fa-solid fa-upload"></i>
                            Υποβολή Σύνθεσης (+15 AI-Q)
                        </button>
                        <button id="skip-challenge" class="challenge-btn secondary">
                            <i class="fa-solid fa-forward"></i>
                            Παράλειψη (χωρίς πόντους)
                        </button>
                    </div>
                    
                    <div class="provisional-points-info">
                        <p><i class="fa-solid fa-hourglass-half"></i> 
                        <strong>Προσωρινοί Πόντοι:</strong> <span id="provisional-display">0</span> AI-Q</p>
                        <small>Οι πόντοι γίνονται μόνιμοι μόνο με την ολοκλήρωση προκλήσεων</small>
                    </div>
                </div>
            </div>
        `;

        // Insert challenge container after main content
        const body = document.body;
        const challengeDiv = document.createElement('div');
        challengeDiv.innerHTML = challengeHtml;
        body.appendChild(challengeDiv.firstElementChild);
    }

    /**
     * Bind event listeners following the Orchestrator UX principles
     */
    bindEvents() {
        // Reading progress tracking
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('reading-checkbox')) {
                this.handleReadingProgress(e.target);
            }
        });

        // Challenge submission
        const submitBtn = document.getElementById('submit-synthesis');
        const skipBtn = document.getElementById('skip-challenge');
        const textarea = document.getElementById('synthesis-response');

        if (textarea) {
            textarea.addEventListener('input', () => this.updateCharCount());
        }

        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.submitSynthesis());
        }

        if (skipBtn) {
            skipBtn.addEventListener('click', () => this.skipChallenge());
        }
    }

    /**
     * Handle reading progress and unlock challenges at threshold
     */
    handleReadingProgress(checkbox) {
        const readingProgress = this.calculateReadingProgress();
        this.updateProgressDisplay(readingProgress);

        // Award provisional points for reading
        if (checkbox.checked) {
            this.provisionalPoints += 1;
            this.updateProvisionalDisplay();
            
            // Trigger challenge unlock at threshold
            if (readingProgress >= this.readingProgressThreshold) {
                this.unlockSynthesisChallenge();
            }
        } else {
            this.provisionalPoints = Math.max(0, this.provisionalPoints - 1);
            this.updateProvisionalDisplay();
        }
    }

    /**
     * Calculate current reading progress percentage
     */
    calculateReadingProgress() {
        const totalCheckboxes = document.querySelectorAll('.reading-checkbox').length;
        const checkedBoxes = document.querySelectorAll('.reading-checkbox:checked').length;
        return totalCheckboxes > 0 ? checkedBoxes / totalCheckboxes : 0;
    }

    /**
     * Update progress display in the UI
     */
    updateProgressDisplay(progress = null) {
        if (progress === null) {
            progress = this.calculateReadingProgress();
        }

        // Update any existing progress indicators
        const progressDisplay = document.getElementById('reading-progress-display');
        if (progressDisplay) {
            progressDisplay.textContent = `${Math.round(progress * 100)}%`;
        }
    }

    /**
     * Update provisional points display
     */
    updateProvisionalDisplay() {
        const display = document.getElementById('provisional-display');
        if (display) {
            display.textContent = this.provisionalPoints;
        }
    }

    /**
     * Unlock synthesis challenge with smooth reveal animation
     */
    unlockSynthesisChallenge() {
        const container = document.getElementById('synthesis-challenge-container');
        if (container && container.classList.contains('hidden')) {
            container.classList.remove('hidden');
            container.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Trigger celebration effect
            this.triggerUnlockCelebration();
        }
    }

    /**
     * Handle challenge submission - convert provisional to committed points
     */
    submitSynthesis() {
        const response = document.getElementById('synthesis-response').value.trim();
        
        if (response.length < 100) {
            this.showFeedback('Παρακαλώ γράψτε τουλάχιστον 100 χαρακτήρες για τη σύνθεσή σας.', 'warning');
            return;
        }

        // Convert provisional to committed points via AI-Q tracker
        const commitmentPoints = 15; // Challenge completion bonus
        const totalCommitted = this.provisionalPoints + commitmentPoints;

        if (window.aiqTracker) {
            window.aiqTracker.commitProvisionalPoints(this.provisionalPoints);
            window.aiqTracker.addPoints(commitmentPoints, 'synthesis_challenge');
            window.aiqTracker.recordAchievement('completed_synthesis_challenge', {
                response: response,
                reading_progress: this.calculateReadingProgress(),
                timestamp: new Date().toISOString()
            });
        }

        this.showFeedback(`Συγχαρητήρια! Κερδίσατε ${totalCommitted} AI-Q πόντους!`, 'success');
        this.hideChallengeContainer();
        this.resetForNextChallenge();
    }

    /**
     * Handle challenge skip - lose provisional points
     */
    skipChallenge() {
        if (confirm('Σίγουρα θέλετε να παραλείψετε την πρόκληση; Θα χάσετε τους προσωρινούς πόντους.')) {
            this.provisionalPoints = 0;
            this.updateProvisionalDisplay();
            this.hideChallengeContainer();
            this.showFeedback('Πρόκληση παραλείφθηκε. Συνεχίστε την ανάγνωση!', 'info');
        }
    }

    /**
     * Update character count and submit button state
     */
    updateCharCount() {
        const textarea = document.getElementById('synthesis-response');
        const counter = document.getElementById('char-count');
        const submitBtn = document.getElementById('submit-synthesis');

        if (textarea && counter && submitBtn) {
            const count = textarea.value.length;
            counter.textContent = count;
            
            // Enable submit button at minimum length
            submitBtn.disabled = count < 100;
            
            // Visual feedback
            if (count >= 100) {
                counter.style.color = '#28a745'; // Success green
            } else {
                counter.style.color = '#6c757d'; // Neutral gray
            }
        }
    }

    /**
     * Show feedback messages to user
     */
    showFeedback(message, type = 'info') {
        // Create or update feedback element
        let feedback = document.getElementById('synthesis-feedback');
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.id = 'synthesis-feedback';
            feedback.className = 'synthesis-feedback';
            document.body.appendChild(feedback);
        }

        feedback.className = `synthesis-feedback ${type}`;
        feedback.innerHTML = `
            <i class="fa-solid fa-${this.getFeedbackIcon(type)}"></i>
            ${message}
        `;
        
        feedback.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            feedback.style.display = 'none';
        }, 5000);
    }

    getFeedbackIcon(type) {
        const icons = {
            success: 'check-circle',
            warning: 'exclamation-triangle',
            error: 'times-circle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    /**
     * Trigger celebration effect for challenge unlock
     */
    triggerUnlockCelebration() {
        // Simple CSS animation trigger
        const container = document.getElementById('synthesis-challenge-container');
        if (container) {
            container.classList.add('challenge-unlock-animation');
            setTimeout(() => {
                container.classList.remove('challenge-unlock-animation');
            }, 1000);
        }
    }

    /**
     * Hide challenge container after completion
     */
    hideChallengeContainer() {
        const container = document.getElementById('synthesis-challenge-container');
        if (container) {
            container.classList.add('hidden');
        }
    }

    /**
     * Reset system for next challenge opportunity
     */
    resetForNextChallenge() {
        this.provisionalPoints = 0;
        this.challengeCount++;
        
        // Clear textarea
        const textarea = document.getElementById('synthesis-response');
        if (textarea) {
            textarea.value = '';
            this.updateCharCount();
        }
        
        this.updateProvisionalDisplay();
    }
}

// Auto-initialize when script loads
window.SynthesisChallenge = SynthesisChallenge;

// Initialize immediately if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.synthesisChallenge = new SynthesisChallenge();
    });
} else {
    window.synthesisChallenge = new SynthesisChallenge();
}
