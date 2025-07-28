/**
 * AI-Q Tracker System
 * Advanced gamified progression system for AI Director Documentation
 * Manages IQ scoring, level unlocking, achievements, and visual progress indicators
 */

class AIQTracker {
    constructor() {
        this.storageKey = 'aiDirector_aiqProgress';
        this.defaultProgress = {
            iq: 85,                    // Starting AI-Q score
            unlockedLevels: ['level_0'], // Always start with level 0 unlocked
            completedLevels: [],        // Levels that have been completed
            totalPoints: 0,             // Total points earned
            achievements: [],           // Special achievements unlocked
            lastUpdated: Date.now()     // Timestamp of last progress update
        };
        
        this.iqRanks = {
            50: 'Νεόφυτος',
            70: 'Αρχάριος Στρατηγός', 
            90: 'Πρακτικός Στρατηγός',
            110: 'Έμπειρος Διευθυντής',
            130: 'Ειδικός Σύμβουλος',
            150: 'Αρχιστράτηγος ΤΝ',
            170: 'Βιζιονάριος Ηγέτης',
            200: 'Μάστερ Στρατηγός'
        };
        
        this.init();
    }

    /**
     * Initialize the AI-Q tracker system
     */
    init() {
        this.loadProgress();
        this.setupCompletionButtons();
        this.updateUIDisplay();
        
        console.log('AI-Q Tracker initialized:', this.progress);
    }

    /**
     * Load progress from localStorage
     */
    loadProgress() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            try {
                this.progress = { ...this.defaultProgress, ...JSON.parse(stored) };
            } catch (e) {
                console.error('Error loading AI-Q progress:', e);
                this.progress = { ...this.defaultProgress };
            }
        } else {
            this.progress = { ...this.defaultProgress };
        }
        
        // Ensure level_0 is always unlocked
        if (!this.progress.unlockedLevels.includes('level_0')) {
            this.progress.unlockedLevels.push('level_0');
        }
    }

    /**
     * Save progress to localStorage
     */
    saveProgress() {
        this.progress.lastUpdated = Date.now();
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
            console.log('AI-Q progress saved:', this.progress);
        } catch (e) {
            console.error('Error saving AI-Q progress:', e);
        }
    }

    /**
     * Get current progress object
     */
    getProgress() {
        return { ...this.progress };
    }

    /**
     * Complete a milestone and award IQ points
     * @param {string} milestoneId - The ID of the completed milestone
     * @param {number} iqPoints - Points to award
     * @param {string} nextLevel - Next level to unlock (optional)
     */
    completeMilestone(milestoneId, iqPoints, nextLevel = null) {
        // Check if already completed
        if (this.progress.completedLevels.includes(milestoneId)) {
            console.log('Milestone already completed:', milestoneId);
            return false;
        }

        // Award points and mark as completed
        this.progress.iq += iqPoints;
        this.progress.totalPoints += iqPoints;
        this.progress.completedLevels.push(milestoneId);

        // Auto-determine next level if not specified
        if (!nextLevel) {
            nextLevel = this.determineNextLevel(milestoneId);
        }

        // Unlock next level
        if (nextLevel && !this.progress.unlockedLevels.includes(nextLevel)) {
            this.progress.unlockedLevels.push(nextLevel);
        }

        // Check for achievements
        this.checkAchievements();

        // Save progress
        this.saveProgress();

        // Update UI
        this.updateUIDisplay();

        // Show completion notification
        this.showCompletionNotification(milestoneId, iqPoints, nextLevel);

        console.log(`Milestone completed: ${milestoneId} (+${iqPoints} AI-Q)`);
        return true;
    }

    /**
     * Determine the next level to unlock based on current milestone
     */
    determineNextLevel(currentMilestone) {
        const levelMap = {
            'level_0': 'level_1',
            'level_1': 'level_2', 
            'level_2': 'level_3',
            'level_3': 'level_4',
            'level_4': 'level_5',
            'level_5': 'level_6',
            'level_6': 'level_7',
            'level_7': 'level_8',
            'level_8': 'level_9',
            'level_9': 'level_10'
        };
        
        return levelMap[currentMilestone] || null;
    }

    /**
     * Check and unlock achievements based on progress
     */
    checkAchievements() {
        const achievements = [];
        
        // IQ Milestones
        if (this.progress.iq >= 100 && !this.progress.achievements.includes('iq_100')) {
            achievements.push('iq_100');
        }
        if (this.progress.iq >= 150 && !this.progress.achievements.includes('iq_150')) {
            achievements.push('iq_150');
        }
        
        // Completion Milestones
        if (this.progress.completedLevels.length >= 5 && !this.progress.achievements.includes('half_way')) {
            achievements.push('half_way');
        }
        if (this.progress.completedLevels.length >= 10 && !this.progress.achievements.includes('master')) {
            achievements.push('master');
        }

        // Add new achievements
        achievements.forEach(achievement => {
            if (!this.progress.achievements.includes(achievement)) {
                this.progress.achievements.push(achievement);
            }
        });
    }

    /**
     * Get current IQ rank based on score
     */
    getCurrentRank() {
        const scores = Object.keys(this.iqRanks).map(Number).sort((a, b) => a - b);
        let currentRank = this.iqRanks[50]; // Default to lowest rank
        
        for (let score of scores) {
            if (this.progress.iq >= score) {
                currentRank = this.iqRanks[score];
            }
        }
        
        return currentRank;
    }

    /**
     * Calculate IQ bar fill percentage
     */
    getIQBarPercentage() {
        const minIQ = 50;
        const maxIQ = 200;
        const currentIQ = Math.min(Math.max(this.progress.iq, minIQ), maxIQ);
        return ((currentIQ - minIQ) / (maxIQ - minIQ)) * 100;
    }

    /**
     * Update all UI elements with current progress
     */
    updateUIDisplay() {
        // Update IQ score
        const iqScoreElement = document.getElementById('iq-score');
        if (iqScoreElement) {
            iqScoreElement.textContent = this.progress.iq;
        }

        // Update IQ description/rank
        const iqDescriptionElement = document.getElementById('iq-description');
        if (iqDescriptionElement) {
            iqDescriptionElement.textContent = this.getCurrentRank();
        }

        // Update IQ bar
        const iqBarFill = document.getElementById('iq-bar-fill');
        if (iqBarFill) {
            const percentage = this.getIQBarPercentage();
            iqBarFill.style.height = `${percentage}%`;
        }

        // Update stats
        const completedLevelsElement = document.getElementById('completed-levels');
        if (completedLevelsElement) {
            completedLevelsElement.textContent = this.progress.completedLevels.length;
        }

        const totalPointsElement = document.getElementById('total-points');
        if (totalPointsElement) {
            totalPointsElement.textContent = this.progress.totalPoints;
        }

        const iqRankElement = document.getElementById('iq-rank');
        if (iqRankElement) {
            iqRankElement.textContent = this.getCurrentRank();
        }

        // Dispatch AI-Q update event for Living Margin Doodler
        document.dispatchEvent(new CustomEvent('aiq-updated', {
            detail: {
                iq: this.progress.iq,
                rank: this.getCurrentRank(),
                totalPoints: this.progress.totalPoints
            }
        }));

        // Update any cards on the page
        this.updateCardStates();
    }

    /**
     * Update card states based on current progress
     */
    updateCardStates() {
        const cards = document.querySelectorAll('.aiq-level-card');
        cards.forEach((card, index) => {
            const cardLevel = card.getAttribute('data-level');
            const statusIcon = card.querySelector('.aiq-card-status i');
            const progressText = card.querySelector('.aiq-progress-text');
            const progressFill = card.querySelector('.aiq-progress-fill');
            
            if (!cardLevel || !statusIcon || !progressText || !progressFill) return;
            
            if (this.progress.completedLevels.includes(cardLevel)) {
                // Completed state
                card.classList.remove('locked', 'unlocked');
                card.classList.add('completed');
                statusIcon.className = 'fa-solid fa-check-circle';
                progressText.textContent = 'Ολοκληρώθηκε';
                progressFill.style.width = '100%';
            } else if (this.progress.unlockedLevels.includes(cardLevel)) {
                // Unlocked state
                card.classList.remove('locked', 'completed');
                card.classList.add('unlocked');
                statusIcon.className = 'fa-solid fa-play-circle';
                progressText.textContent = 'Διαθέσιμο';
                progressFill.style.width = '0%';
            } else {
                // Locked state
                card.classList.remove('unlocked', 'completed');
                card.classList.add('locked');
                statusIcon.className = 'fa-solid fa-lock';
                progressText.textContent = 'Κλειδωμένο';
                progressFill.style.width = '0%';
            }
        });
    }

    /**
     * Setup event listeners for completion buttons
     */
    setupCompletionButtons() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.aiq-completion-btn') || e.target.closest('.aiq-completion-btn')) {
                e.preventDefault();
                
                const button = e.target.matches('.aiq-completion-btn') ? e.target : e.target.closest('.aiq-completion-btn');
                const milestoneId = button.dataset.milestoneId;
                const iqPoints = parseInt(button.dataset.iqPoints) || 5;
                
                if (milestoneId) {
                    const success = this.completeMilestone(milestoneId, iqPoints);
                    if (success) {
                        // Redirect to dashboard after a short delay
                        setTimeout(() => {
                            window.location.href = 'index.html';
                        }, 2000);
                    }
                }
            }
        });
    }

    /**
     * Show completion notification
     */
    showCompletionNotification(milestoneId, iqPoints, nextLevel) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'aiq-completion-notification';
        notification.innerHTML = `
            <div class="aiq-notification-content">
                <div class="aiq-notification-icon">
                    <i class="fa-solid fa-brain"></i>
                </div>
                <div class="aiq-notification-text">
                    <h3>Συγχαρητήρια!</h3>
                    <p>Κερδίσατε <strong>+${iqPoints} AI-Q πόντους</strong></p>
                    <p>Νέο AI-Q Score: <strong>${this.progress.iq}</strong></p>
                    ${nextLevel ? `<p>Ξεκλειδώθηκε: <strong>Επόμενο Επίπεδο</strong></p>` : ''}
                </div>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    /**
     * Reset all progress (for testing/debugging)
     */
    resetProgress() {
        this.progress = { ...this.defaultProgress };
        this.saveProgress();
        this.updateUIDisplay();
        console.log('AI-Q progress reset');
    }

    /**
     * Get detailed progress information for debugging
     */
    getProgressInfo() {
        return {
            ...this.progress,
            currentRank: this.getCurrentRank(),
            barPercentage: this.getIQBarPercentage()
        };
    }
}

// Initialize global AI-Q tracker instance
window.aiqTracker = new AIQTracker();

// Export for module use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIQTracker;
}
