/**
 * Learning Path Configuration
 * Defines the complete progression structure for the AI Director Documentation System
 * Each level represents a logical learning milestone with dependencies
 */

const learningPath = {
  // Level 0: Foundation Entry Point
  level_0: {
    id: 'alfavitarion',
    title: 'Το Αλφαβητάριον',
    subtitle: 'Στρατηγικός Οδηγός για την ΤΝ',
    description: 'Ξεκινήστε εδώ αν η ΤΝ σας κατακλύζει. Οδηγός χωρίς τεχνική ορολογία.',
    entry_point: 'ai-smart-dummies-guide.html',
    icon: '●',
    color: '#2563eb', // Blue
    unlocks: 'level_1',
    estimated_time: '45 λεπτά',
    difficulty: 'Αρχάριος'
  },

  // Level 1: Quick Reference and Navigation
  level_1: {
    id: 'egkolpion',
    title: 'Το Εγκόλπιον',
    subtitle: 'Οδηγός Γρήγορης Αναφοράς',
    description: 'Συμπυκνωμένος οδηγός με τις βασικότερες τεχνικές και εργαλεία.',
    entry_point: 'quick_reference_guide.html',
    icon: '►',
    color: '#059669', // Green
    unlocks: 'level_2',
    estimated_time: '30 λεπτά',
    difficulty: 'Αρχάριος'
  },

  // Level 2: Visual Learning and Media
  level_2: {
    id: 'vivliothiki',
    title: 'Η Βιντεοθήκη',
    subtitle: 'Επιμελημένη Συλλογή Εκπαίδευσης',
    description: 'Συλλογή 49+ εκπαιδευτικών βίντεο οργανωμένων σε 6 κατηγορίες.',
    entry_point: 'videos.html',
    icon: '●',
    color: '#dc2626', // Red
    unlocks: 'level_3',
    estimated_time: '2-4 ώρες',
    difficulty: 'Αρχάριος-Μέσος'
  },

  // Level 3: Digital Assets and Tools
  level_3: {
    id: 'epoptika_mesa',
    title: 'Εποπτικά Μέσα',
    subtitle: 'Εργαλεία και Αναφορές',
    description: 'Οπτικοποιήσεις, εργαλεία ΤΝ και επιμελημένη συλλογή πόρων.',
    entry_point: 'digital_assets/index.html',
    icon: '◉',
    color: '#7c3aed', // Purple
    unlocks: 'level_4',
    estimated_time: '1-2 ώρες',
    difficulty: 'Μέσος'
  },

  // Level 4: Practical Application
  level_4: {
    id: 'tetradion',
    title: 'Τετράδιον Εργασιών',
    subtitle: 'Πρακτικές Ασκήσεις',
    description: 'Πρακτικές ασκήσεις, εργαλεία αυτοαξιολόγησης και εφαρμογές.',
    entry_point: 'student_workbook_enhanced.html',
    icon: '▪',
    color: '#ea580c', // Orange
    unlocks: 'level_5',
    estimated_time: '3-5 ώρες',
    difficulty: 'Μέσος'
  },

  // Level 5: Core Curriculum
  level_5: {
    id: 'kyrion_vivlion',
    title: 'Κύριο Βιβλίον',
    subtitle: 'The AI Orchestrator Curriculum',
    description: 'Πλήρες περιεχόμενο προγράμματος AI Orchestrator (Κεφάλαια 1-11).',
    entry_point: 'main-book.html',
    icon: '■',
    color: '#1f2937', // Dark Gray
    unlocks: 'level_6',
    estimated_time: '8-12 ώρες',
    difficulty: 'Μέσος-Προχωρημένος'
  },

  // Level 6: Educator Resources
  level_6: {
    id: 'odigos_ekpaideuton',
    title: 'Οδηγός Εκπαιδευτών',
    subtitle: 'Υλοποίηση και Αξιολόγηση',
    description: 'Οδηγός υλοποίησης για εκπαιδευτικούς με πλαίσια αξιολόγησης.',
    entry_point: 'instructor_implementation_guide_parts_1_2.html',
    icon: '◆',
    color: '#0891b2', // Cyan
    unlocks: 'level_7',
    estimated_time: '2-3 ώρες',
    difficulty: 'Προχωρημένος'
  },

  // Level 7: Interactive Platform
  level_7: {
    id: 'diadrastiki_platforma',
    title: 'Διαδραστική Πλατφόρμα',
    subtitle: 'Έδρα Διευθυντή ΑΙ',
    description: 'Πλατφόρμα ανάπτυξης και διαχείρισης οικοσυστήματος με κοινότητα.',
    entry_point: 'neo/index.html',
    icon: '★',
    color: '#be185d', // Pink
    unlocks: 'level_8',
    estimated_time: '1-2 ώρες',
    difficulty: 'Προχωρημένος'
  },

  // Level 8: Advanced Philosophy
  level_8: {
    id: 'didaskalia',
    title: 'Neo-Monday Διδασκαλία',
    subtitle: 'Θεμελιώδης Φιλοσοφία',
    description: 'Η φιλοσοφία και μεθοδολογία του AI Orchestrator.',
    entry_point: 'didaskalia.html',
    icon: '◈',
    color: '#374151', // Gray
    unlocks: 'level_9',
    estimated_time: '2-4 ώρες',
    difficulty: 'Προχωρημένος'
  },

  // Level 9: Technical Foundation
  level_9: {
    id: 'themelion',
    title: 'Θεμέλιον',
    subtitle: 'Τεχνική Τεκμηρίωση',
    description: 'Τεχνική τεκμηρίωση, πρωτόκολλα ασφαλείας και άμυνα κατά prompt injection.',
    entry_point: 'themelion.html',
    icon: '⬟',
    color: '#065f46', // Dark Green
    unlocks: 'level_10',
    estimated_time: '3-5 ώρες',
    difficulty: 'Εξπέρ'
  },

  // Level 10: Leadership Mastery
  level_10: {
    id: 'agogi',
    title: 'Neo-Monday Αγωγή',
    subtitle: 'Στρατηγική για C-level',
    description: 'Στρατηγική για ανώτερα διοικητικά στελέχη και οργανωσιακός μετασχηματισμός.',
    entry_point: 'https://deefunxion.github.io/AILEADER/',
    icon: '▲',
    color: '#7c2d12', // Brown
    unlocks: null, // Final level
    estimated_time: '4-6 ώρες',
    difficulty: 'Εξπέρ'
  }
};

/**
 * Helper functions for learning path management
 */
const LearningPathUtils = {
  /**
   * Get the current level data
   * @param {string} levelId - The level identifier
   * @returns {object} Level data object
   */
  getLevel: (levelId) => {
    return learningPath[levelId] || null;
  },

  /**
   * Get the next level in progression
   * @param {string} currentLevelId - Current level identifier
   * @returns {object|null} Next level data or null if at final level
   */
  getNextLevel: (currentLevelId) => {
    const currentLevel = learningPath[currentLevelId];
    return currentLevel?.unlocks ? learningPath[currentLevel.unlocks] : null;
  },

  /**
   * Get total number of levels
   * @returns {number} Total levels count
   */
  getTotalLevels: () => {
    return Object.keys(learningPath).length;
  },

  /**
   * Get all levels as an array
   * @returns {Array} Array of level objects with keys
   */
  getAllLevels: () => {
    return Object.keys(learningPath).map(key => ({
      key,
      ...learningPath[key]
    }));
  },

  /**
   * Calculate progress percentage
   * @param {string} currentLevelId - Current level identifier
   * @returns {number} Progress percentage (0-100)
   */
  getProgressPercentage: (currentLevelId) => {
    const levelNumber = parseInt(currentLevelId.replace('level_', ''));
    const totalLevels = LearningPathUtils.getTotalLevels();
    return Math.round(((levelNumber + 1) / totalLevels) * 100);
  },

  /**
   * Check if a level is unlocked based on current progress
   * @param {string} levelToCheck - Level to check
   * @param {string} currentProgress - Current user progress level
   * @returns {boolean} True if level is unlocked
   */
  isLevelUnlocked: (levelToCheck, currentProgress) => {
    const checkNumber = parseInt(levelToCheck.replace('level_', ''));
    const progressNumber = parseInt(currentProgress.replace('level_', ''));
    return checkNumber <= progressNumber;
  }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { learningPath, LearningPathUtils };
}
