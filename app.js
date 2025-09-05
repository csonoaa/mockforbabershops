// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle functionality
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when a nav link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Smooth scrolling for hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons a');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section's nav link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });
    
    // Form submission handlers
    const quoteForm = document.querySelector('.quote-form');
    const bookingForm = document.querySelector('.booking-form');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const year = formData.get('year');
            const make = formData.get('make');
            const model = formData.get('model');
            const mileage = formData.get('mileage');
            const condition = formData.get('condition');
            const name = formData.get('name');
            const phone = formData.get('phone');
            const comments = formData.get('comments');
            
            // Basic validation
            if (!year || !make || !model || !mileage || !condition || !name || !phone) {
                alert('Please fill out all required fields.');
                return;
            }
            
            // Create message for quote request
            const message = `Quote Request:\n\nVehicle: ${year} ${make} ${model}\nMileage: ${mileage}\nCondition: ${condition}\nName: ${name}\nPhone: ${phone}\nComments: ${comments || 'None'}`;
            
            // Show success message
            alert('Thank you for your quote request! We will contact you within 24 hours with your cash offer.');
            
            // Reset form
            this.reset();
        });
    }
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const serviceType = formData.get('service-type');
            const preferredDate = formData.get('preferred-date');
            const customerName = formData.get('customer-name');
            const customerPhone = formData.get('customer-phone');
            const vehicleInfo = formData.get('vehicle-info');
            const serviceDetails = formData.get('service-details');
            
            // Basic validation
            if (!serviceType || !preferredDate || !customerName || !customerPhone || !vehicleInfo) {
                alert('Please fill out all required fields.');
                return;
            }
            
            // Check if date is in the future
            const selectedDate = new Date(preferredDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                alert('Please select a future date for your appointment.');
                return;
            }
            
            // Create message for booking request
            const message = `Service Booking:\n\nService Type: ${serviceType}\nPreferred Date: ${preferredDate}\nCustomer: ${customerName}\nPhone: ${customerPhone}\nVehicle: ${vehicleInfo}\nDetails: ${serviceDetails || 'None'}`;
            
            // Show success message
            alert('Thank you for booking with us! We will contact you shortly to confirm your appointment.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down - hide navbar
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up - show navbar
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Set minimum date for booking form to today
    const dateInput = document.getElementById('preferred-date');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowString = tomorrow.toISOString().split('T')[0];
        dateInput.setAttribute('min', tomorrowString);
    }
    
    // Phone number formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
            }
            e.target.value = value;
        });
    });
});

// Add CSS for active nav links
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #000000 !important;
        border-bottom: 2px solid #000000;
    }
`;
document.head.appendChild(style);