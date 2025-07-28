// Mobile Navigation Handler
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
    
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger-menu';
    hamburger.innerHTML = '☰';
    hamburger.setAttribute('aria-label', 'Open Menu');
    
    // Create mobile overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    
    // Create mobile nav
    const mobileNav = document.createElement('nav');
    mobileNav.className = 'mobile-nav';
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-mobile-nav';
    closeBtn.innerHTML = '×';
    closeBtn.setAttribute('aria-label', 'Close Menu');
    
    // Clone navigation links
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        const mobileLink = link.cloneNode(true);
        mobileNav.appendChild(mobileLink);
    });
    
    // Add close button to mobile nav
    mobileNav.appendChild(closeBtn);
    
    // Add elements to body
    document.body.appendChild(hamburger);
    document.body.appendChild(overlay);
    document.body.appendChild(mobileNav);
    
    // Event listeners
    hamburger.addEventListener('click', openMobileNav);
    closeBtn.addEventListener('click', closeMobileNav);
    overlay.addEventListener('click', closeMobileNav);
    
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });
}

function openMobileNav() {
    const overlay = document.querySelector('.mobile-overlay');
    const mobileNav = document.querySelector('.mobile-nav');
    
    overlay.classList.add('active');
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
    const overlay = document.querySelector('.mobile-overlay');
    const mobileNav = document.querySelector('.mobile-nav');
    
    overlay.classList.remove('active');
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
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
