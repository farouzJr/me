const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.role, .social-link').forEach(el => {
        observer.observe(el);
    });
};

const initSocialLinkEffects = () => {
    const links = document.querySelectorAll('.social-link');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const glow = link.querySelector('.link-glow');
            if (glow) {
                glow.style.left = `${x}px`;
                glow.style.top = `${y}px`;
            }
        });

        link.addEventListener('mousemove', (e) => {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const glow = link.querySelector('.link-glow');
            if (glow) {
                glow.style.left = `${x}px`;
                glow.style.top = `${y}px`;
            }
        });

        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    link.style.transform = '';
                }, 150);
                
                console.log(`Clicked: ${link.textContent.trim()}`);
            }
        });
    });
};

const initRoleAnimations = () => {
    const roles = document.querySelectorAll('.role');
    
    roles.forEach(role => {
        role.addEventListener('mouseenter', () => {
            roles.forEach(r => {
                if (r !== role) {
                    r.style.opacity = '0.4';
                    r.style.filter = 'blur(2px)';
                }
            });
        });

        role.addEventListener('mouseleave', () => {
            roles.forEach(r => {
                r.style.opacity = '1';
                r.style.filter = 'blur(0)';
            });
        });
    });
};

const initParallaxEffect = () => {
    const name = document.querySelector('.name');
    let ticking = false;
    
    const updateParallax = (x, y) => {
        const xOffset = (x / window.innerWidth - 0.5) * 15;
        const yOffset = (y / window.innerHeight - 0.5) * 15;
        name.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        ticking = false;
    };
    
    window.addEventListener('mousemove', (e) => {
        if (!ticking) {
            window.requestAnimationFrame(() => updateParallax(e.clientX, e.clientY));
            ticking = true;
        }
    });
};

const initCursorEffect = () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(167, 139, 250, 0.4), transparent);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.15s ease;
        display: none;
    `;
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.display = 'block';
    });

    const animateCursor = () => {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = `${cursorX - 10}px`;
        cursor.style.top = `${cursorY - 10}px`;
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    document.querySelectorAll('.social-link, .role').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initSocialLinkEffects();
    initRoleAnimations();
    initParallaxEffect();
    initCursorEffect();
    
    console.log('🚀 Portfolio initialized successfully');
});

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});