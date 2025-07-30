document.addEventListener('DOMContentLoaded', function() {
    console.log('interactive-reading.js loaded and running.');

    const contentWrapper = document.getElementById('reading-content-wrapper');
    console.log('Wrapper element found:', contentWrapper);

    if (!contentWrapper) {
        console.error('Error: Could not find the #reading-content-wrapper element.');
        return;
    }

    const paragraphs = contentWrapper.querySelectorAll('p');
    console.log('Found ' + paragraphs.length + ' paragraphs to attach listeners to.');

    let hoverTimeout;

    paragraphs.forEach((p, index) => {
        if (!p.id) {
            p.id = `p-interactive-${index}`;
        }

        let commitButton = null;

        p.addEventListener('mouseenter', (e) => {
            console.log('Mouse entered paragraph:', e.target);
            if (p.classList.contains('p-committed') || p.classList.contains('p-pushed')) return;

            hoverTimeout = setTimeout(() => {
                console.log('Pause detected on paragraph:', e.target);
                if (commitButton) return; // Button already exists

                commitButton = document.createElement('button');
                commitButton.className = 'commit-button';
                commitButton.innerHTML = '<i class="fa-solid fa-check"></i>';
                document.body.appendChild(commitButton);

                const pRect = p.getBoundingClientRect();
                commitButton.style.top = `${pRect.top + window.scrollY + (pRect.height / 2) - 22}px`;
                
                setTimeout(() => {
                    commitButton.classList.add('visible');
                }, 10);

                commitButton.addEventListener('click', () => {
                    commitButton.classList.add('clicked');
                    p.classList.add('p-committed');
                    
                    const stagedIcon = document.createElement('span');
                    stagedIcon.className = 'status-icon icon-staged';
                    stagedIcon.innerHTML = '●';
                    p.insertBefore(stagedIcon, p.firstChild);

                    localStorage.setItem(p.id, 'committed');

                    setTimeout(() => {
                        if (commitButton) commitButton.remove();
                        commitButton = null;
                    }, 400); // Match animation duration
                });

            }, 500);
        });

        p.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimeout);
            if (commitButton && !commitButton.classList.contains('clicked')) {
                commitButton.classList.remove('visible');
                setTimeout(() => {
                    if (commitButton) {
                        commitButton.remove();
                        commitButton = null;
                    }
                }, 300);
            }
        });
    });

    // Load initial state from localStorage
    paragraphs.forEach(p => {
        const state = localStorage.getItem(p.id);
        if (state === 'committed' || state === 'pushed') {
            p.classList.add('p-committed');
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
                localStorage.setItem(p.id, 'pushed');
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

    for (let i = 0; i < 30; i++) {
        const firework = document.createElement('div');
        firework.style.position = 'absolute';
        firework.style.width = '5px';
        firework.style.height = '5px';
        firework.style.borderRadius = '50%';
        firework.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        firework.style.left = `${Math.random() * 100}%`;
        firework.style.top = `${Math.random() * 100}%`;
        firework.style.animation = `firework-explode 0.7s ease-out forwards`;
        fireworksContainer.appendChild(firework);
    }

    setTimeout(() => {
        fireworksContainer.remove();
    }, 1000);
}
