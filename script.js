document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
    initNavigation();
    initTypingEffect();
    initScrollReveal();
});

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
        const pos = window.scrollY + 200;
        sections.forEach(s => {
            if (pos >= s.offsetTop && pos < s.offsetTop + s.offsetHeight) {
                links.forEach(l => l.classList.toggle('active', l.dataset.section === s.id));
            }
        });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
    });
    links.forEach(l => l.addEventListener('click', () => {
        toggle.classList.remove('active');
        menu.classList.remove('active');
    }));
}

function initTypingEffect() {
    const el = document.getElementById('typingText');
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const roles = ['Vibe Coder', 'AI Automation Engineer', 'Data Analyst', 'Lead Research Intern', 'SaaS Builder'];
    // Starts with roles[0] already rendered in the HTML, so begin by deleting it.
    let i = 0, n = roles[0].length, deleting = true;

    setTimeout(function tick() {
        const word = roles[i];
        n += deleting ? -1 : 1;
        el.textContent = word.slice(0, n);
        let wait = deleting ? 40 : 90;
        if (!deleting && n === word.length) { deleting = true; wait = 2200; }
        else if (deleting && n === 0) { deleting = false; i = (i + 1) % roles.length; wait = 400; }
        setTimeout(tick, wait);
    }, 2200);
}

function initScrollReveal() {
    const els = document.querySelectorAll('.section-head, .section-label, .about-body, .row, .project, .skill-group, .contact-title, .contact-links');
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => { el.classList.add('reveal'); io.observe(el); });
}
