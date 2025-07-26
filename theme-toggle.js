// Theme Toggle Script for Apple-inspired dual mode switching

(function() {
    'use strict';
    
    // Initialize theme system
    function initThemeToggle() {
        // Create toggle button
        createToggleButton();
        
        // Load saved theme preference
        loadThemePreference();
        
        // Set up event listeners
        setupEventListeners();
    }
    
    // Create the toggle button
    function createToggleButton() {
        // Check if button already exists
        if (document.querySelector('.mode-toggle')) {
            return;
        }
        
        const toggleButton = document.createElement('button');
        toggleButton.className = 'mode-toggle';
        toggleButton.setAttribute('aria-label', 'Toggle dark/light mode');
        toggleButton.innerHTML = getCurrentModeIcon();
        
        document.body.appendChild(toggleButton);
    }
    
    // Get appropriate icon for current mode
    function getCurrentModeIcon() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        return isDarkMode ? '☀️' : '🌙';
    }
    
    // Load theme preference from localStorage
    function loadThemePreference() {
        const savedTheme = localStorage.getItem('theme-preference');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Apply saved theme or system preference
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            enableDarkMode();
        } else {
            enableLightMode();
        }
    }
    
    // Set up event listeners
    function setupEventListeners() {
        const toggleButton = document.querySelector('.mode-toggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', toggleTheme);
        }
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme-preference')) {
                if (e.matches) {
                    enableDarkMode();
                } else {
                    enableLightMode();
                }
            }
        });
        
        // Keyboard shortcut: Ctrl/Cmd + Shift + D
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                toggleTheme();
            }
        });
    }
    
    // Toggle between themes
    function toggleTheme() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        if (isDarkMode) {
            enableLightMode();
        } else {
            enableDarkMode();
        }
    }
    
    // Enable dark mode
    function enableDarkMode() {
        document.body.classList.add('dark-mode');
        updateToggleButton();
        saveThemePreference('dark');
        
        // Announce to screen readers
        announceThemeChange('Dark mode enabled');
    }
    
    // Enable light mode
    function enableLightMode() {
        document.body.classList.remove('dark-mode');
        updateToggleButton();
        saveThemePreference('light');
        
        // Announce to screen readers
        announceThemeChange('Light mode enabled');
    }
    
    // Update toggle button appearance
    function updateToggleButton() {
        const toggleButton = document.querySelector('.mode-toggle');
        if (toggleButton) {
            toggleButton.innerHTML = getCurrentModeIcon();
            
            // Add smooth transition effect
            toggleButton.style.transform = 'scale(0.9)';
            setTimeout(() => {
                toggleButton.style.transform = 'scale(1)';
            }, 150);
        }
    }
    
    // Save theme preference to localStorage
    function saveThemePreference(theme) {
        localStorage.setItem('theme-preference', theme);
    }
    
    // Announce theme changes for accessibility
    function announceThemeChange(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initThemeToggle);
    } else {
        initThemeToggle();
    }
    
    // Expose toggle function globally for manual control
    window.toggleTheme = toggleTheme;
    
})();
