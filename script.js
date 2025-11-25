// Mobile Menu Toggle - Optimisé
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('hidden');
        
        // Update button label for screen readers
        mobileMenuBtn.setAttribute('aria-label', isExpanded ? 'Ouvrir le menu de navigation' : 'Fermer le menu de navigation');
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });
}

// Navbar Scroll Effect - Throttled
const navbar = document.getElementById('navbar');
let lastScroll = 0;
let ticking = false;

const updateNavbar = () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }
    
    lastScroll = currentScroll;
    ticking = false;
};

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}, { passive: true });

// Active Navigation Link on Scroll - Throttled
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
let navTicking = false;

const updateActiveNav = () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
    
    navTicking = false;
};

window.addEventListener('scroll', () => {
    if (!navTicking) {
        window.requestAnimationFrame(updateActiveNav);
        navTicking = true;
    }
}, { passive: true });

// Smooth Scroll for Navigation Links - Optimisé
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        // Vérifier que c'est un ID valide (commence par #)
        if (targetId && targetId.length > 1) {
            const target = document.querySelector(targetId);
            
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Scroll to Top Button - Throttled
const scrollTopBtn = document.getElementById('scroll-top');
let scrollBtnTicking = false;

const updateScrollBtn = () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.remove('opacity-0', 'invisible');
        scrollTopBtn.classList.add('opacity-100', 'visible');
    } else {
        scrollTopBtn.classList.add('opacity-0', 'invisible');
        scrollTopBtn.classList.remove('opacity-100', 'visible');
    }
    scrollBtnTicking = false;
};

window.addEventListener('scroll', () => {
    if (!scrollBtnTicking) {
        window.requestAnimationFrame(updateScrollBtn);
        scrollBtnTicking = true;
    }
}, { passive: true });

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Reveal Animation on Scroll - Throttled
const revealElements = document.querySelectorAll('.reveal');
let revealTicking = false;

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
    revealTicking = false;
};

window.addEventListener('scroll', () => {
    if (!revealTicking) {
        window.requestAnimationFrame(revealOnScroll);
        revealTicking = true;
    }
}, { passive: true });

revealOnScroll(); // Initial check

// Animate Skill Bars on Scroll - Throttled and Optimized
const skillBars = document.querySelectorAll('.skill-item');
let skillTicking = false;
let skillsAnimated = false;

const animateSkills = () => {
    if (skillsAnimated) {
        skillTicking = false;
        return;
    }
    
    skillBars.forEach(skill => {
        const skillTop = skill.getBoundingClientRect().top;
        
        if (skillTop < window.innerHeight - 100) {
            const progressBar = skill.querySelector('[style*="width"]');
            if (progressBar && !progressBar.classList.contains('animated')) {
                progressBar.classList.add('animated');
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.transition = 'width 1.5s ease-out';
                    progressBar.style.width = width;
                }, 100);
                
                skillsAnimated = true;
            }
        }
    });
    
    skillTicking = false;
};

window.addEventListener('scroll', () => {
    if (!skillTicking && !skillsAnimated) {
        window.requestAnimationFrame(animateSkills);
        skillTicking = true;
    }
}, { passive: true });

animateSkills(); // Initial check

// Contact Form Handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Envoi en cours...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Success message
        submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Message envoyé !';
        submitBtn.classList.remove('bg-primary', 'hover:bg-secondary');
        submitBtn.classList.add('bg-green-500');
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.classList.remove('bg-green-500');
            submitBtn.classList.add('bg-primary', 'hover:bg-secondary');
            submitBtn.disabled = false;
        }, 3000);
        
        // Show success notification
        showNotification('Message envoyé avec succès !', 'success');
    }, 1500);
});

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 px-6 py-4 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-0 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`;
    notification.innerHTML = `
        <div class="flex items-center space-x-3">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} text-xl"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Typing Effect for Hero Section (Optional)
const typingText = document.querySelector('.typing-effect');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    typeWriter();
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('#home');
    
    if (parallax && scrolled < parallax.offsetHeight) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Project Filter (if you add categories later)
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = 'block';
            project.classList.add('animate-fade-in-up');
        } else {
            project.style.display = 'none';
        }
    });
}

// Cursor Effect (Optional - Modern Effect)
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Add custom cursor styles
const style = document.createElement('style');
style.textContent = `
    .custom-cursor {
        width: 20px;
        height: 20px;
        border: 2px solid #3b82f6;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        transform: translate(-50%, -50%);
        display: none;
    }
    
    @media (min-width: 1024px) {
        .custom-cursor {
            display: block;
        }
    }
`;
document.head.appendChild(style);

// Image Lazy Loading
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Copy to Clipboard Function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copié dans le presse-papiers !', 'success');
    }).catch(err => {
        showNotification('Erreur lors de la copie', 'error');
    });
}

// Dark Mode Toggle (Optional Feature)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load Dark Mode Preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Performance: Debounce Function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events for better performance
window.addEventListener('scroll', debounce(() => {
    // Scroll-based animations here
}, 10));

// Console Message
console.log('%c👨‍💻 Portfolio d\'Aurélien Thébault', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
console.log('%cDéveloppeur Web Full-Stack', 'color: #6b7280; font-size: 14px;');
console.log('%cVous cherchez un développeur ? Contactez-moi !', 'color: #10b981; font-size: 12px;');

// Analytics Tracking (Add your tracking code here)
// Example: Google Analytics, Matomo, etc.

// Page Load Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Prevent right-click on images (Optional)
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        // Uncomment to prevent right-click
        // e.preventDefault();
        // showNotification('Image protégée', 'info');
    });
});

// Anti-spam phone number display - obfuscated
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔐 Initialisation protection anti-spam...');
    
    const phoneElement = document.getElementById('phone-number');
    if (phoneElement) {
        // Phone number split and reversed for obfuscation
        const parts = ['06', '19', '63', '44', '14'];
        const phone = parts.join(' ');
        phoneElement.textContent = phone;
        console.log('✅ Téléphone protégé');
    }
    
    // Anti-spam email display - obfuscated
    const emailDisplay = document.getElementById('email-display');
    const emailLink = document.getElementById('email-link');
    const emailLinkHero = document.getElementById('email-link-hero');
    
    if (emailDisplay && emailLink) {
        // Email parts split for obfuscation
        const user = ['aurel', '140783'].join('');
        const domain = ['gmail', 'com'].join('.');
        const email = user + '@' + domain;
        
        emailDisplay.textContent = email;
        emailLink.href = 'mailto:' + email;
        emailLink.setAttribute('aria-label', 'Envoyer un email à ' + email);
        console.log('✅ Email section contact protégé:', email);
    }
    
    if (emailLinkHero) {
        const user = ['aurel', '140783'].join('');
        const domain = ['gmail', 'com'].join('.');
        const email = user + '@' + domain;
        
        emailLinkHero.href = 'mailto:' + email;
        console.log('✅ Email hero protégé:', emailLinkHero.href);
    }
    
    // Anti-spam GitHub profile - obfuscated
    const githubLinkHero = document.getElementById('github-link-hero');
    const githubLinkContact = document.getElementById('github-link-contact');
    
    if (githubLinkHero) {
        // GitHub username split for obfuscation
        const username = ['Aurel', '1407'].join('');
        const githubUrl = 'https://github.com/' + username;
        
        githubLinkHero.href = githubUrl;
        console.log('✅ GitHub hero protégé:', githubUrl);
    } else {
        console.warn('❌ Élément github-link-hero non trouvé');
    }
    
    if (githubLinkContact) {
        const username = ['Aurel', '1407'].join('');
        const githubUrl = 'https://github.com/' + username;
        
        githubLinkContact.href = githubUrl;
        console.log('✅ GitHub contact protégé:', githubUrl);
    } else {
        console.warn('❌ Élément github-link-contact non trouvé');
    }
    
    // Anti-spam LinkedIn profile - obfuscated
    const linkedinLinkHero = document.getElementById('linkedin-link-hero');
    const linkedinLinkContact = document.getElementById('linkedin-link-contact');
    
    if (linkedinLinkHero) {
        // LinkedIn profile split for obfuscation
        const profile = ['aurélien-thébault-', '244b84336'].join('');
        const linkedinUrl = 'https://www.linkedin.com/in/' + profile;
        
        linkedinLinkHero.href = linkedinUrl;
        console.log('✅ LinkedIn hero protégé:', linkedinUrl);
    } else {
        console.warn('❌ Élément linkedin-link-hero non trouvé');
    }
    
    if (linkedinLinkContact) {
        const profile = ['aurélien-thébault-', '244b84336'].join('');
        const linkedinUrl = 'https://www.linkedin.com/in/' + profile;
        
        linkedinLinkContact.href = linkedinUrl;
        console.log('✅ LinkedIn contact protégé:', linkedinUrl);
    } else {
        console.warn('❌ Élément linkedin-link-contact non trouvé');
    }
    
    console.log('🎉 Protection anti-spam complète !');
});

// Easter Egg - Konami Code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiPattern.length - 1, konamiCode.length - konamiPattern.length);
    
    if (konamiCode.join('').includes(konamiPattern.join(''))) {
        showNotification('🎮 Code Konami activé ! Vous êtes un vrai geek !', 'success');
        document.body.style.animation = 'rainbow 2s infinite';
    }
});

console.log('%c💡 Astuce: Essayez le code Konami !', 'color: #8b5cf6; font-size: 12px;');

// Contact Form Handler
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Afficher état d'envoi
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Envoi en cours...';
            
            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Succès
                    formStatus.className = 'block text-center p-4 rounded-xl bg-green-500/20 border border-green-500/50 text-green-300';
                    formStatus.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Message envoyé avec succès ! Je vous répondrai bientôt.';
                    form.reset();
                } else {
                    // Erreur
                    formStatus.className = 'block text-center p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-300';
                    formStatus.innerHTML = '<i class="fas fa-exclamation-circle mr-2"></i>Erreur lors de l\'envoi. Veuillez réessayer.';
                }
            } catch (error) {
                // Erreur réseau
                formStatus.className = 'block text-center p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-300';
                formStatus.innerHTML = '<i class="fas fa-exclamation-circle mr-2"></i>Erreur de connexion. Vérifiez votre connexion internet.';
            } finally {
                // Restaurer le bouton
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
                
                // Masquer le message après 5 secondes
                setTimeout(() => {
                    formStatus.className = 'hidden';
                }, 5000);
            }
        });
    }
});
