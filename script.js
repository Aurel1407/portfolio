// Menu mobile - Optimisé
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('hidden');
        
        // Mettre à jour le label du bouton pour les lecteurs d'écran
        mobileMenuBtn.setAttribute('aria-label', isExpanded ? 'Ouvrir le menu de navigation' : 'Fermer le menu de navigation');
    });

    // Fermer le menu mobile en cliquant sur un lien
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });
}

// Effet de défilement de la navbar - Optimisé
const navbar = document.getElementById('navbar');
let lastScroll = 0;
let ticking = false;

const updateNavbar = () => {
    const currentScroll = window.pageYOffset;
    
    // Ajouter une ombre au défilement
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

// Lien de navigation actif au défilement - Optimisé
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
let navTicking = false;

// Mettre en cache les positions des sections pour éviter les reflows
const sectionPositions = Array.from(sections).map(section => ({
    id: section.getAttribute('id'),
    offsetTop: section.offsetTop
}));

const updateActiveNav = () => {
    let current = '';
    const scrollPos = pageYOffset;
    
    sectionPositions.forEach(section => {
        if (scrollPos >= section.offsetTop - 200) {
            current = section.id;
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

// Défilement fluide pour les liens de navigation - Optimisé
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

// Bouton retour en haut - Optimisé
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

// Animation de révélation au défilement - Optimisé
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

// Animation des barres de compétences au défilement - Optimisé
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

animateSkills(); // Vérification initiale

// Gestion du formulaire de contact
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Afficher l'état de chargement
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Envoi en cours...';
    submitBtn.disabled = true;
    
    // Simuler l'envoi du formulaire (à remplacer par un véritable appel API)
    setTimeout(() => {
        // Message de succès
        submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Message envoyé !';
        submitBtn.classList.remove('bg-primary', 'hover:bg-secondary');
        submitBtn.classList.add('bg-green-500');
        
        // Réinitialiser le formulaire
        contactForm.reset();
        
        // Réinitialiser le bouton après 3 secondes
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.classList.remove('bg-green-500');
            submitBtn.classList.add('bg-primary', 'hover:bg-secondary');
            submitBtn.disabled = false;
        }, 3000);
        
        // Afficher la notification de succès
        showNotification('Message envoyé avec succès !', 'success');
    }, 1500);
});

// Système de notifications
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
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Supprimer après 5 secondes
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Effet de frappe pour la section Hero (Optionnel)
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

// Effet parallaxe pour la section hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('#home');
    
    if (parallax && scrolled < parallax.offsetHeight) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Filtre de projets (si vous ajoutez des catégories plus tard)
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

// Effet de curseur (Optionnel - Effet moderne)
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Ajouter des styles de curseur personnalisé
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

// Chargement différé des images
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

// Fonction pour copier dans le presse-papiers
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copié dans le presse-papiers !', 'success');
    }).catch(err => {
        showNotification('Erreur lors de la copie', 'error');
    });
}

// Basculer le mode sombre (Fonctionnalité optionnelle)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Charger la préférence du mode sombre
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Performance: Fonction Debounce
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

// Appliquer debounce aux événements de défilement pour de meilleures performances
window.addEventListener('scroll', debounce(() => {
    // Animations basées sur le défilement ici
}, 10));

// Message dans la console
console.log('%c👨‍💻 Portfolio d\'Aurélien Thébault', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
console.log('%cDéveloppeur Web Full-Stack', 'color: #6b7280; font-size: 14px;');
console.log('%cVous cherchez un développeur ? Contactez-moi !', 'color: #10b981; font-size: 12px;');

// Suivi analytique (Ajoutez votre code de suivi ici)
// Exemple : Google Analytics, Matomo, etc.

// Animation au chargement de la page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Empêcher le clic droit sur les images (Optionnel)
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        // Décommenter pour empêcher le clic droit
        // e.preventDefault();
        // showNotification('Image protégée', 'info');
    });
});

// Affichage du numéro de téléphone anti-spam - obfusqué
document.addEventListener('DOMContentLoaded', () => {
    const phoneElement = document.getElementById('phone-number');
    if (phoneElement) {
        // Numéro de téléphone divisé et inversé pour l'obfuscation
        const parts = ['06', '19', '63', '44', '14'];
        const phone = parts.join(' ');
        phoneElement.textContent = phone;
    }
    
    // Affichage de l'email anti-spam - obfusqué
    const emailDisplay = document.getElementById('email-display');
    const emailLink = document.getElementById('email-link');
    const emailLinkHero = document.getElementById('email-link-hero');
    
    if (emailDisplay && emailLink) {
        // Parties de l'email divisées pour l'obfuscation
        const user = ['aurel', '140783'].join('');
        const domain = ['gmail', 'com'].join('.');
        const email = user + '@' + domain;
        
        emailDisplay.textContent = email;
        emailLink.href = 'mailto:' + email;
        emailLink.setAttribute('aria-label', 'Envoyer un email à ' + email);
    }
    
    if (emailLinkHero) {
        const user = ['aurel', '140783'].join('');
        const domain = ['gmail', 'com'].join('.');
        const email = user + '@' + domain;
        
        emailLinkHero.href = 'mailto:' + email;
    }
    
    // Profil GitHub anti-spam - obfusqué
    const githubLinkHero = document.getElementById('github-link-hero');
    const githubLinkContact = document.getElementById('github-link-contact');
    
    if (githubLinkHero) {
        // Nom d'utilisateur GitHub divisé pour l'obfuscation
        const username = ['Aurel', '1407'].join('');
        const githubUrl = 'https://github.com/' + username;
        
        githubLinkHero.href = githubUrl;
    }
    
    if (githubLinkContact) {
        const username = ['Aurel', '1407'].join('');
        const githubUrl = 'https://github.com/' + username;
        
        githubLinkContact.href = githubUrl;
    }
    
    // Profil LinkedIn anti-spam - obfusqué
    const linkedinLinkHero = document.getElementById('linkedin-link-hero');
    const linkedinLinkContact = document.getElementById('linkedin-link-contact');
    
    if (linkedinLinkHero) {
        // Profil LinkedIn divisé pour l'obfuscation
        const profile = ['aurélien-thébault-', '244b84336'].join('');
        const linkedinUrl = 'https://www.linkedin.com/in/' + profile;
        
        linkedinLinkHero.href = linkedinUrl;
    }
    
    if (linkedinLinkContact) {
        const profile = ['aurélien-thébault-', '244b84336'].join('');
        const linkedinUrl = 'https://www.linkedin.com/in/' + profile;
        
        linkedinLinkContact.href = linkedinUrl;
    }
});

// Code Konami - Easter Egg
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

// Gestionnaire de formulaire de contact
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
