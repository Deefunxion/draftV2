/**
 * Progress Tracker System
 * Manages user progression through the AI Director Documentation learning path
 * Handles level unlocking, progress persistence, and UI state management
 */

class ProgressTracker {
  constructor() {
    this.storageKey = 'aiDirector_userLevel';
    this.completedSectionsKey = 'aiDirector_completedSections';
    this.currentLevel = null;
    this.completedSections = [];
    
    // Initialize on load
    this.init();
  }

  /**
   * Initialize the progress tracker
   */
  init() {
    this.loadProgress();
    this.checkProgress();
    this.setupCompletionButtons();
    this.updateProgressDisplay();
    
    // Add progress indicator to body
    this.addProgressIndicator();
  }

  /**
   * Load progress from localStorage
   */
  loadProgress() {
    // Load current level (default to level_0)
    this.currentLevel = localStorage.getItem(this.storageKey) || 'level_0';
    
    // Load completed sections
    const storedSections = localStorage.getItem(this.completedSectionsKey);
    this.completedSections = storedSections ? JSON.parse(storedSections) : [];
    
    console.log('Progress loaded:', {
      currentLevel: this.currentLevel,
      completedSections: this.completedSections
    });
  }

  /**
   * Save progress to localStorage
   */
  saveProgress() {
    localStorage.setItem(this.storageKey, this.currentLevel);
    localStorage.setItem(this.completedSectionsKey, JSON.stringify(this.completedSections));
    
    console.log('Progress saved:', {
      currentLevel: this.currentLevel,
      completedSections: this.completedSections
    });
  }

  /**
   * Check and apply current progress to the page
   */
  checkProgress() {
    // Remove any existing level classes
    document.body.className = document.body.className
      .replace(/level-\d+-unlocked/g, '')
      .trim();

    // Add current level class to body
    const levelNumber = parseInt(this.currentLevel.replace('level_', ''));
    
    // Add classes for all unlocked levels (current and below)
    for (let i = 0; i <= levelNumber; i++) {
      document.body.classList.add(`level-${i}-unlocked`);
    }

    console.log('Progress applied to page:', this.currentLevel);
  }

  /**
   * Update user progress to a new level
   * @param {string} newLevel - The new level to unlock
   */
  updateProgress(newLevel) {
    const currentLevelNumber = parseInt(this.currentLevel.replace('level_', ''));
    const newLevelNumber = parseInt(newLevel.replace('level_', ''));

    // Only allow progression forward
    if (newLevelNumber > currentLevelNumber) {
      this.currentLevel = newLevel;
      this.saveProgress();
      this.checkProgress();
      this.updateProgressDisplay();
      
      // Show success notification
      this.showProgressNotification(newLevel);
      
      console.log('Progress updated to:', newLevel);
      return true;
    }
    
    return false;
  }

  /**
   * Mark a section as completed
   * @param {string} sectionId - The section identifier
   */
  markSectionCompleted(sectionId) {
    if (!this.completedSections.includes(sectionId)) {
      this.completedSections.push(sectionId);
      this.saveProgress();
      
      // Check if this completion unlocks next level
      this.checkForLevelUnlock(sectionId);
    }
  }

  /**
   * Check if completing a section unlocks the next level
   * @param {string} sectionId - The completed section
   */
  checkForLevelUnlock(sectionId) {
    // Find which level this section belongs to
    const allLevels = LearningPathUtils.getAllLevels();
    const currentLevelData = allLevels.find(level => level.id === sectionId);
    
    if (currentLevelData && currentLevelData.unlocks) {
      this.updateProgress(currentLevelData.unlocks);
    }
  }

  /**
   * Setup completion buttons on the current page
   */
  setupCompletionButtons() {
    const completionButtons = document.querySelectorAll('[data-unlocks]');
    
    completionButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        const unlockLevel = button.getAttribute('data-unlocks');
        const sectionId = button.getAttribute('data-section-id');
        
        if (sectionId) {
          this.markSectionCompleted(sectionId);
        }
        
        if (unlockLevel) {
          const success = this.updateProgress(unlockLevel);
          
          if (success) {
            // Small delay for user feedback, then redirect
            setTimeout(() => {
              window.location.href = 'index.html';
            }, 2000);
          }
        }
      });
    });
  }

  /**
   * Show a progress notification
   * @param {string} newLevel - The newly unlocked level
   */
  showProgressNotification(newLevel) {
    const levelData = LearningPathUtils.getLevel(newLevel);
    
    if (!levelData) return;

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'progress-notification';
    notification.innerHTML = `
      <div class="progress-notification-content">
        <div class="progress-icon">${levelData.icon}</div>
        <div class="progress-text">
          <h3>Νέο Επίπεδο Ξεκλειδώθηκε!</h3>
          <p><strong>${levelData.title}</strong></p>
          <p>${levelData.description}</p>
        </div>
      </div>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 5000);
  }

  /**
   * Add progress indicator to the page
   */
  addProgressIndicator() {
    // Skip if already exists
    if (document.querySelector('.progress-indicator')) return;

    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-indicator';
    
    const levelNumber = parseInt(this.currentLevel.replace('level_', ''));
    const totalLevels = LearningPathUtils.getTotalLevels();
    const progressPercentage = LearningPathUtils.getProgressPercentage(this.currentLevel);
    
    progressContainer.innerHTML = `
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${progressPercentage}%"></div>
      </div>
      <div class="progress-text">
        Πρόοδος: ${levelNumber + 1}/${totalLevels} επίπεδα (${progressPercentage}%)
      </div>
    `;

    // Add to top of page
    document.body.insertBefore(progressContainer, document.body.firstChild);
  }

  /**
   * Update progress display elements
   */
  updateProgressDisplay() {
    const progressIndicator = document.querySelector('.progress-indicator');
    if (!progressIndicator) return;

    const levelNumber = parseInt(this.currentLevel.replace('level_', ''));
    const totalLevels = LearningPathUtils.getTotalLevels();
    const progressPercentage = LearningPathUtils.getProgressPercentage(this.currentLevel);
    
    const progressFill = progressIndicator.querySelector('.progress-fill');
    const progressText = progressIndicator.querySelector('.progress-text');
    
    if (progressFill) {
      progressFill.style.width = `${progressPercentage}%`;
    }
    
    if (progressText) {
      progressText.textContent = `Πρόοδος: ${levelNumber + 1}/${totalLevels} επίπεδα (${progressPercentage}%)`;
    }
  }

  /**
   * Reset all progress (for testing/admin purposes)
   */
  resetProgress() {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.completedSectionsKey);
    this.currentLevel = 'level_0';
    this.completedSections = [];
    this.checkProgress();
    this.updateProgressDisplay();
    
    console.log('Progress reset to beginning');
  }

  /**
   * Get current progress info
   * @returns {object} Current progress information
   */
  getProgressInfo() {
    const levelData = LearningPathUtils.getLevel(this.currentLevel);
    const progressPercentage = LearningPathUtils.getProgressPercentage(this.currentLevel);
    
    return {
      currentLevel: this.currentLevel,
      currentLevelData: levelData,
      progressPercentage: progressPercentage,
      completedSections: this.completedSections,
      totalLevels: LearningPathUtils.getTotalLevels()
    };
  }
}

// Initialize progress tracker when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Ensure learning path is loaded
  if (typeof learningPath !== 'undefined') {
    window.progressTracker = new ProgressTracker();
  } else {
    console.error('Learning path not loaded. Make sure learning-path.js is included before progress-tracker.js');
  }
});

// Expose globally for debugging
window.ProgressTracker = ProgressTracker;
