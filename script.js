/* =========================
   CURSOR GLOW FOLLOW
========================= */

const cursorGlow = document.getElementById('cursor-glow');

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});


/* =========================
   NAVBAR SCROLL
========================= */

const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (window.scrollY >= top && window.scrollY < bottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});


/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById('menu-btn');
const navMenu = document.getElementById('nav-menu');

menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const spans = menuBtn.querySelectorAll('span');
    spans.forEach(s => s.style.background = navMenu.classList.contains('active') ? '#6366f1' : '');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});


/* =========================
   DARK / LIGHT MODE
========================= */

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light');
    themeIcon.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    themeIcon.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});


/* =========================
   TYPEWRITER EFFECT
========================= */

const roles = [
    'Computer Engineering Student',
    'Web Developer',
    'Programmer',
    'Tech Enthusiast'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const roleEl = document.getElementById('role-text');

function typeRole() {
    const current = roles[roleIndex];
    
    if (isDeleting) {
        roleEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        roleEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 50 : 90;

    if (!isDeleting && charIndex === current.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
    }

    setTimeout(typeRole, speed);
}

typeRole();


/* =========================
   SCROLL ANIMATIONS
========================= */

const animateEls = document.querySelectorAll('[data-animate], [data-animate-delay]');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

animateEls.forEach(el => observer.observe(el));


/* =========================
   SKILL BAR ANIMATION
========================= */

const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));


/* =========================
   CONTACT FORM
========================= */

const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert('Mohon isi semua field yang wajib diisi.');
        return;
    }

    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Mengirim...</span>';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.innerHTML = '<span>✓ Pesan Terkirim!</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        contactForm.reset();

        setTimeout(() => {
            submitBtn.innerHTML = originalHTML;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    }, 1200);
});