// BioHydra Website - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Video Play Button
    const videoContainer = document.querySelector('.video-container');
    const playButton = document.querySelector('.play-button');
    const video = document.querySelector('.company-video');
    
    if (videoContainer && playButton && video) {
        playButton.addEventListener('click', () => {
            video.play();
            videoContainer.querySelector('.video-overlay').style.display = 'none';
        });
        
        video.addEventListener('play', () => {
            videoContainer.querySelector('.video-overlay').style.display = 'none';
        });
        
        video.addEventListener('pause', () => {
            videoContainer.querySelector('.video-overlay').style.display = 'flex';
        });
    }
    
    // Animated Statistics Counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const targetValue = parseInt(target.getAttribute('data-target'));
                    const suffix = target.textContent.includes('%') ? '%' : '';
                    
                    animateCounter(target, targetValue, suffix);
                    observer.unobserve(target);
                }
            });
        }, observerOptions);
        
        statNumbers.forEach(stat => observer.observe(stat));
    }
    
    // Counter Animation Function
    function animateCounter(element, target, suffix) {
        let current = 0;
        const increment = target / 100;
        const duration = 2000; // 2 seconds
        const stepTime = Math.abs(Math.floor(duration / (target / increment)));
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, stepTime);
    }
    
    // Form Validation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous errors
            clearErrors();
            
            // Validate form
            const isValid = validateForm();
            
            if (isValid) {
                // Simulate form submission
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    showSuccessMessage('Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 1500);
            }
        });
        
        // Real-time validation
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        if (nameInput) {
            nameInput.addEventListener('blur', validateName);
        }
        
        if (emailInput) {
            emailInput.addEventListener('blur', validateEmail);
        }
        
        if (messageInput) {
            messageInput.addEventListener('blur', validateMessage);
        }
    }
    
    // Form Validation Functions
    function validateForm() {
        let isValid = true;
        
        if (!validateName()) isValid = false;
        if (!validateEmail()) isValid = false;
        if (!validateMessage()) isValid = false;
        
        return isValid;
    }
    
    function validateName() {
        const nameInput = document.getElementById('name');
        const nameError = document.getElementById('name-error');
        const name = nameInput.value.trim();
        
        if (name === '') {
            showError(nameError, 'Name is required');
            nameInput.classList.add('error');
            return false;
        } else if (name.length < 2) {
            showError(nameError, 'Name must be at least 2 characters');
            nameInput.classList.add('error');
            return false;
        }
        
        clearError(nameError);
        nameInput.classList.remove('error');
        return true;
    }
    
    function validateEmail() {
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            showError(emailError, 'Email is required');
            emailInput.classList.add('error');
            return false;
        } else if (!emailRegex.test(email)) {
            showError(emailError, 'Please enter a valid email address');
            emailInput.classList.add('error');
            return false;
        }
        
        clearError(emailError);
        emailInput.classList.remove('error');
        return true;
    }
    
    function validateMessage() {
        const messageInput = document.getElementById('message');
        const messageError = document.getElementById('message-error');
        const message = messageInput.value.trim();
        
        if (message === '') {
            showError(messageError, 'Message is required');
            messageInput.classList.add('error');
            return false;
        } else if (message.length < 10) {
            showError(messageError, 'Message must be at least 10 characters');
            messageInput.classList.add('error');
            return false;
        }
        
        clearError(messageError);
        messageInput.classList.remove('error');
        return true;
    }
    
    // Error Handling Functions
    function showError(element, message) {
        if (element) {
            element.textContent = message;
            element.style.display = 'block';
        }
    }
    
    function clearError(element) {
        if (element) {
            element.textContent = '';
            element.style.display = 'none';
        }
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        const inputElements = document.querySelectorAll('input, textarea');
        
        errorElements.forEach(element => {
            clearError(element);
        });
        
        inputElements.forEach(element => {
            element.classList.remove('error');
        });
    }
    
    function showSuccessMessage(message) {
        const successElement = document.getElementById('form-success');
        if (successElement) {
            successElement.textContent = message;
            successElement.style.display = 'block';
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successElement.style.display = 'none';
            }, 5000);
        }
    }
    
    // Scroll Animation for Sections
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    sections.forEach(section => {
        section.classList.add('fade-out');
        sectionObserver.observe(section);
    });
    
    // Add CSS for fade animation
    const style = document.createElement('style');
    style.textContent = `
        .fade-out {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email === '') {
                alert('Please enter your email address');
                return;
            }
            
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Simulate subscription
            const button = newsletterForm.querySelector('button');
            const originalHtml = button.innerHTML;
            
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
                button.innerHTML = originalHtml;
                button.disabled = false;
            }, 1000);
        });
    }
    
    // Team Slider Functionality - NEW ADDITION
    const teamSliderContainer = document.getElementById('sliderContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const sliderDots = document.getElementById('sliderDots');

    let currentSlide = 0;
    const totalSlides = 5; // Number of team members

    // Initialize team slider if elements exist
    if (teamSliderContainer && sliderDots) {
        // Create dots
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            sliderDots.appendChild(dot);
        }

        // Next slide
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateSlider();
            });
        }

        // Previous slide
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                updateSlider();
            });
        }

        // Go to specific slide
        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            updateSlider();
        }

        // Update slider position
        function updateSlider() {
            teamSliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update dots
            document.querySelectorAll('.dot').forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        // Touch swipe for mobile
        let startX = 0;
        let isDragging = false;

        teamSliderContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        teamSliderContainer.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });

        teamSliderContainer.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    // Swipe left = next
                    currentSlide = (currentSlide + 1) % totalSlides;
                } else {
                    // Swipe right = previous
                    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                }
                updateSlider();
            }
            
            isDragging = false;
        });

        // Add fade animation for team section
        const teamSection = document.querySelector('.team-section');
        if (teamSection) {
            const teamObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            teamSection.classList.add('fade-out');
            teamObserver.observe(teamSection);
        }
    }
});
