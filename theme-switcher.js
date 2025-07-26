// Live Theme Switcher JavaScript
// Advanced theme management system for AI Orchestrator documentation

class ThemeSwitcher {
    constructor() {
        this.themes = [
            'nielsen-norman', 'apple', 'conversion', 'performance',
            'cinematic', 'mobile-social', 'accessibility', 'micro-interactions',
            'futuristic', 'modular', 'eco-natural', 'editorial'
        ];
        
        this.themeNames = {
            'nielsen-norman': 'Nielsen & Norman',
            'apple': 'Apple Luxury',
            'conversion': 'Conversion Psychology',
            'performance': 'Performance Optimized',
            'cinematic': 'Cinematic Storytelling',
            'mobile-social': 'Mobile Social',
            'accessibility': 'Accessibility WCAG',
            'micro-interactions': 'Micro-Interactions',
            'futuristic': '3D Futuristic',
            'modular': 'Modular Variables',
            'eco-natural': 'Eco Natural',
            'editorial': 'Editorial Magazine'
        };
        
        this.currentTheme = localStorage.getItem('selected-theme') || 'nielsen-norman';
        this.init();
    }
    
    init() {
        this.createThemeSwitcher();
        this.applyTheme(this.currentTheme);
        this.bindEvents();
        this.addKeyboardShortcuts();
    }
    
    createThemeSwitcher() {
        const switcher = document.createElement('div');
        switcher.className = 'theme-switcher';
        switcher.innerHTML = `
            <h4>🎨 Theme Switcher</h4>
            <div class="theme-grid">
                ${this.themes.map(theme => `
                    <div class="theme-option" 
                         data-theme="${theme}" 
                         title="${this.themeNames[theme]}"
                         role="button"
                         tabindex="0"
                         aria-label="Switch to ${this.themeNames[theme]} theme">
                    </div>
                `).join('')}
            </div>
            <div class="theme-info">
                <small id="current-theme-name">${this.themeNames[this.currentTheme]}</small>
            </div>
        `;
        
        document.body.appendChild(switcher);
    }
    
    applyTheme(themeName) {
        // Remove all theme classes
        this.themes.forEach(theme => {
            document.body.classList.remove(`theme-${theme}`);
            document.documentElement.removeAttribute('data-theme');
        });
        
        // Apply new theme
        if (themeName !== 'nielsen-norman') {
            document.documentElement.setAttribute('data-theme', themeName);
        }
        
        this.currentTheme = themeName;
        localStorage.setItem('selected-theme', themeName);
        
        // Update UI
        this.updateActiveTheme();
        this.updateThemeName();
        
        // Add smooth transition
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
        
        // Fire custom event
        document.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: themeName, themeName: this.themeNames[themeName] }
        }));
        
        console.log(`🎨 Theme switched to: ${this.themeNames[themeName]}`);
    }
    
    updateActiveTheme() {
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.remove('active');
            if (option.dataset.theme === this.currentTheme) {
                option.classList.add('active');
            }
        });
    }
    
    updateThemeName() {
        const nameElement = document.getElementById('current-theme-name');
        if (nameElement) {
            nameElement.textContent = this.themeNames[this.currentTheme];
        }
    }
    
    bindEvents() {
        document.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const theme = e.target.dataset.theme;
                this.applyTheme(theme);
            });
            
            // Keyboard support
            option.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const theme = e.target.dataset.theme;
                    this.applyTheme(theme);
                }
            });
        });
    }
    
    addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Shift + T to toggle theme switcher
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggleSwitcher();
            }
            
            // Ctrl/Cmd + Shift + Number to switch themes
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key >= '1' && e.key <= '9') {
                e.preventDefault();
                const themeIndex = parseInt(e.key) - 1;
                if (this.themes[themeIndex]) {
                    this.applyTheme(this.themes[themeIndex]);
                }
            }
            
            // Ctrl/Cmd + Shift + 0 for random theme
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === '0') {
                e.preventDefault();
                this.applyRandomTheme();
            }
        });
    }
    
    toggleSwitcher() {
        const switcher = document.querySelector('.theme-switcher');
        if (switcher) {
            switcher.style.display = switcher.style.display === 'none' ? 'block' : 'none';
        }
    }
    
    applyRandomTheme() {
        const randomTheme = this.themes[Math.floor(Math.random() * this.themes.length)];
        this.applyTheme(randomTheme);
    }
    
    // API for external use
    getAvailableThemes() {
        return this.themes.map(theme => ({
            id: theme,
            name: this.themeNames[theme],
            active: theme === this.currentTheme
        }));
    }
    
    getCurrentTheme() {
        return {
            id: this.currentTheme,
            name: this.themeNames[this.currentTheme]
        };
    }
    
    setTheme(themeId) {
        if (this.themes.includes(themeId)) {
            this.applyTheme(themeId);
            return true;
        }
        return false;
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.themeSwitcher = new ThemeSwitcher();
    
    // Add helpful console messages
    console.log('🎨 Theme Switcher Initialized!');
    console.log('📋 Available keyboard shortcuts:');
    console.log('   Ctrl/Cmd + Shift + T: Toggle theme switcher');
    console.log('   Ctrl/Cmd + Shift + 1-9: Switch to theme by number');
    console.log('   Ctrl/Cmd + Shift + 0: Random theme');
    console.log('💡 API: window.themeSwitcher.setTheme("theme-name")');
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeSwitcher;
}
