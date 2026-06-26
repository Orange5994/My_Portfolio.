// ============================================
// PORTFOLIO JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initParticles();
    initCursorGlow();
    initNavigation();
    initTypingEffect();
    initScrollReveal();
    initSkillBars();
    initCountUp();
    initContactForm();
    lucide.createIcons();
});

// ============================================
// PARTICLE SYSTEM
// ============================================
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.4 + 0.1;
            this.hue = Math.random() > 0.5 ? 264 : 187; // purple or cyan
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue}, 80%, 65%, ${this.opacity})`;
            ctx.fill();
        }
    }

    function init() {
        resize();
        particles = [];
        const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    const opacity = (1 - dist / 150) * 0.08;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(124, 58, 237, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        drawConnections();
        animationId = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resize();
    });

    init();
    animate();
}

// ============================================
// CURSOR GLOW
// ============================================
function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow) return;

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateGlow() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(updateGlow);
    }

    updateGlow();
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-link');

    // Scroll handler
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;

        // Active section tracking
        updateActiveLink();
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    function updateActiveLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                const id = section.getAttribute('id');
                links.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// ============================================
// TYPING EFFECT
// ============================================
function initTypingEffect() {
    const element = document.getElementById('typingText');
    if (!element) return;

    const roles = [
        'Data Analyst',
        'Data Science Student',
        'Machine Learning Enthusiast',
        'Power BI Specialist',
        'Python & SQL Developer'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            element.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            element.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 400; // Pause before typing next
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
function initScrollReveal() {
    // Add reveal class to elements
    const revealSelectors = [
        '.section-header',
        '.about-text',
        '.about-image',
        '.timeline-item',
        '.project-card',
        '.skill-category',
        '.education-card',
        '.contact-card',
        '.contact-form',
        '.highlight-item'
    ];

    revealSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ============================================
// SKILL BARS ANIMATION
// ============================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => observer.observe(bar));
}

// ============================================
// COUNT UP ANIMATION
// ============================================
function initCountUp() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => observer.observe(counter));

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 60;
        const duration = 1500;
        const stepTime = duration / 60;

        function step() {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                return;
            }
            element.textContent = Math.floor(current);
            setTimeout(step, stepTime);
        }

        step();
    }
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = document.getElementById('submitBtn');
        const originalHTML = btn.innerHTML;

        // Show loading state
        btn.innerHTML = '<span style="display:flex;align-items:center;gap:8px;justify-content:center;"><i data-lucide="loader" class="btn-icon spin"></i> Sending...</span>';
        btn.style.opacity = '0.7';
        btn.disabled = true;
        lucide.createIcons();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        const targetEmail = "Sahilkrsingh5994@gmail.com";

        try {
            // Using FormSubmit.co for sending emails without backend
            const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    _subject: `Portfolio Contact: ${subject}`,
                    message: message,
                    _template: "table", // Uses a nice table format for the email
                    _captcha: false // Disable CAPTCHA to ensure smooth AJAX flow
                })
            });

            if (response.ok) {
                // Update button to show success
                btn.innerHTML = '<span style="display:flex;align-items:center;gap:8px;justify-content:center;"><i data-lucide="check-circle"></i> Message Sent!</span>';
                btn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';
                btn.style.opacity = '1';
                form.reset();
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error("Error sending message:", error);
            btn.innerHTML = '<span style="display:flex;align-items:center;gap:8px;justify-content:center;"><i data-lucide="x-circle"></i> Failed to send</span>';
            btn.style.background = 'linear-gradient(135deg, #ef4444, #b91c1c)';
            btn.style.opacity = '1';
        }

        lucide.createIcons();

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            btn.disabled = false;
            lucide.createIcons();
        }, 4000);
    });

    // Add focus effects to form inputs
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
}

// ============================================
// SMOOTH ANCHOR SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Get the navbar height
            const navbarHeight = document.getElementById('navbar').offsetHeight;
            
            // Get the padding top of the section (so we can scroll past it)
            const computedStyle = window.getComputedStyle(target);
            const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
            
            // Calculate exact position: 
            // Section top + Section padding (to reach the text) - Navbar height - 24px buffer
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const scrollPosition = targetPosition + paddingTop - navbarHeight - 24;
            
            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add spin animation for loading state
const style = document.createElement('style');
style.textContent = `
    @keyframes spin-loader {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    .spin { animation: spin-loader 1s linear infinite; }
`;
document.head.appendChild(style);
