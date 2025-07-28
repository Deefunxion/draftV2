// Enhanced Mobile Navigation Handler with Touch Gestures
document.addEventListener('DOMContentLoaded', function() {
    // Only run on mobile devices
    if (window.innerWidth <= 768) {
        initializeMobileNav();
    }
    
    // Re-initialize on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            initializeMobileNav();
        } else {
            removeMobileNav();
        }
    });
});

function initializeMobileNav() {
    // Check if mobile nav already exists
    if (document.querySelector('.hamburger-menu')) return;
    
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) return;
    
    // Create hamburger button with improved accessibility
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger-menu';
    hamburger.innerHTML = '☰';
    hamburger.setAttribute('aria-label', 'Άνοιγμα μενού πλοήγησης');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('role', 'button');
    
    // Create mobile overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    
    // Create mobile nav with improved structure
    const mobileNav = document.createElement('nav');
    mobileNav.className = 'mobile-nav';
    mobileNav.setAttribute('aria-label', 'Κύριο μενού πλοήγησης');
    mobileNav.setAttribute('role', 'navigation');
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-mobile-nav';
    closeBtn.innerHTML = '×';
    closeBtn.setAttribute('aria-label', 'Κλείσιμο μενού πλοήγησης');
    closeBtn.setAttribute('role', 'button');
    
    // Clone navigation links with enhanced handling
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach((link, index) => {
        const mobileLink = link.cloneNode(true);
        mobileLink.setAttribute('tabindex', '0');
        mobileNav.appendChild(mobileLink);
    
    // Add close button to mobile nav
    mobileNav.appendChild(closeBtn);
    
    // Add elements to body
    document.body.appendChild(hamburger);
    document.body.appendChild(overlay);
    document.body.appendChild(mobileNav);
    
    // Enhanced event listeners
    hamburger.addEventListener('click', openMobileNav);
    closeBtn.addEventListener('click', closeMobileNav);
    overlay.addEventListener('click', closeMobileNav);
    
    // Touch gesture support for swipe to close
    let touchStartX = 0;
    let touchEndX = 0;
    
    mobileNav.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    mobileNav.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipeGesture();
    });
    
    function handleSwipeGesture() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        // Swipe right to close (since menu slides in from right)
        if (swipeDistance > swipeThreshold) {
            closeMobileNav();
        }
    }
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            closeMobileNav();
        }
    });
    
    // Close on link click with smooth animation
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            // Add slight delay for better UX
            setTimeout(closeMobileNav, 150);
        });
    });
}

function openMobileNav() {
    const overlay = document.querySelector('.mobile-overlay');
    const mobileNav = document.querySelector('.mobile-nav');
    const hamburger = document.querySelector('.hamburger-menu');
    
    overlay.classList.add('active');
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Update accessibility attributes
    hamburger.setAttribute('aria-expanded', 'true');
    overlay.setAttribute('aria-hidden', 'false');
    
    // Focus management
    setTimeout(() => {
        const firstLink = mobileNav.querySelector('a');
        if (firstLink) firstLink.focus();
    }, 100);
}

function closeMobileNav() {
    const overlay = document.querySelector('.mobile-overlay');
    const mobileNav = document.querySelector('.mobile-nav');
    const hamburger = document.querySelector('.hamburger-menu');
    
    overlay.classList.remove('active');
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
    
    // Update accessibility attributes
    hamburger.setAttribute('aria-expanded', 'false');
    overlay.setAttribute('aria-hidden', 'true');
    
    // Return focus to hamburger button
    hamburger.focus();
}

function removeMobileNav() {
    const hamburger = document.querySelector('.hamburger-menu');
    const overlay = document.querySelector('.mobile-overlay');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (hamburger) hamburger.remove();
    if (overlay) overlay.remove();
    if (mobileNav) mobileNav.remove();
    
    document.body.style.overflow = '';
}
