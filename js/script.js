// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      emailjs.sendForm("service_00ofsaz", "template_dbs8vie", this)
        .then(() => {
          alert("Enviar");
          this.reset();
        }, (err) => {
          alert("Error al enviar: " + JSON.stringify(err));
        });
    });
  }
});


function initializePortfolio() {
    // Initialize all functionality
    setupMobileMenu();
    setupSmoothScrolling();
    setupActiveNavigation();
    setupScrollAnimations();
    setupSkillBars();
    setupFormHandling();
    setupFloatingIcons();
    setupBackgroundShapes();
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });

        // Close menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }
}

// Smooth Scrolling
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    const aboutBtn = document.querySelector('.about-btn');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // About Me button scrolling
    if (aboutBtn) {
        aboutBtn.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = aboutSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Active Navigation Highlighting
function setupActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger skill bars animation
                if (entry.target.classList.contains('about-section')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const animatedSections = document.querySelectorAll('section');
    animatedSections.forEach(section => {
        observer.observe(section);
    });
}

// Animación de barras de habilidades
function setupSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const targetWidth = bar.getAttribute('data-width');
            bar.style.width = targetWidth;
        }, index * 200);
    });
}

// Form Handling
function setupFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[placeholder="Nombre"]').value;
            const email = contactForm.querySelector('input[placeholder="Email"]').value;
            const message = contactForm.querySelector('textarea[placeholder="Mensaje"]').value;
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simular el envío del formulario
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('¡Mensaje enviado correctamente! Te responderé pronto.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// validacion Email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Agregar estilos
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#2ECC71' : '#E74C3C'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Eliminar despues del restraso 
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Floating Icons Animation Enhancement
function setupFloatingIcons() {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    floatingIcons.forEach((icon, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = Math.random() * 10 - 5;
            const randomY = Math.random() * 10 - 5;
            
            icon.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + index * 1000);
    });
}

// Background Shapes Animation Enhancement
function setupBackgroundShapes() {
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        // Add mouse interaction
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const moveX = (mouseX - 0.5) * 50;
            const moveY = (mouseY - 0.5) * 50;
            
            shape.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX}deg)`;
        });
    });
}

// Efecto de desplazamiento del encabezado
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 500) {
        header.style.background = 'rgba(195, 198, 201, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(13, 13, 14, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Efecto de paralaje para la sección de hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const bgShapes = document.querySelector('.bg-shapes');
    
    if (heroContent && bgShapes) {
        const rate = scrolled * -0.5;
        bgShapes.style.transform = `translateY(${rate}px)`;
    }
});

// Agregar CSS para animaciones
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .portfolio-item:hover .portfolio-image {
        transform: scale(1.05);
    }
    
    .portfolio-image {
        transition: transform 0.3s ease;
    }
    
    .social-link:hover {
        animation: bounce 0.6s ease;
    }
    
    @keyframes bounce {
        0%, 20%, 60%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        80% {
            transform: translateY(-5px);
        }
    }
`;

document.head.appendChild(animationStyles);

// Loading animation for images
function setupImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.8s ease'; // un poco más suave

        const showImage = () => {
            requestAnimationFrame(() => {
                img.style.opacity = '1';
            });
        };

        if (img.complete) {
            // Si ya estaba cargada (cacheada), igual hacemos el fade-in
            setTimeout(showImage, 100); 
        } else {
            img.addEventListener('load', showImage);
        }
    });
}

// Initialize image loading
setupImageLoading();

// Agregar indicador de progreso scroll(deslizamiento)
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-orange), var(--primary-green));
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Inicaiar progreso scroll
createScrollProgress();

console.log('Portfolio initialized successfully!');

// Add click effects
document.addEventListener('click', function(e) {
    // Add ripple effect to buttons
    if (e.target.matches('button') || e.target.matches('.btn')) {
        const button = e.target;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add ripple animation
const rippleAnimation = document.createElement('style');
rippleAnimation.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleAnimation);