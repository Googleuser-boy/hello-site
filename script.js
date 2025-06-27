document.addEventListener('DOMContentLoaded', () => {
    // Get references to the dark mode toggle button and icons
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement; // The <html> tag
    const moonIcon = document.getElementById('moonIcon');
    const sunIcon = document.getElementById('sunIcon');

    // Set the current year in the footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Function to set dark mode
    const setDarkMode = (isDark) => {
        if (isDark) {
            htmlElement.classList.add('dark');
            moonIcon.classList.add('hidden'); // Hide moon icon
            sunIcon.classList.remove('hidden'); // Show sun icon
            localStorage.setItem('darkMode', 'enabled'); // Save preference
        } else {
            htmlElement.classList.remove('dark');
            moonIcon.classList.remove('hidden'); // Show moon icon
            sunIcon.classList.add('hidden'); // Hide sun icon
            localStorage.setItem('darkMode', 'disabled'); // Save preference
        }
    };

    // Check for saved dark mode preference on page load
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'enabled') {
        setDarkMode(true);
    } else {
        setDarkMode(false); // Default to light mode if no preference or disabled
    }

    // Add event listener for the dark mode toggle button
    darkModeToggle.addEventListener('click', () => {
        const isCurrentlyDark = htmlElement.classList.contains('dark');
        setDarkMode(!isCurrentlyDark); // Toggle the mode
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default jump

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Scroll to the target element smoothly
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll-based animations using Intersection Observer
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the animation class when element is visible
                entry.target.classList.add('animate-fadeInUp');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust the viewport margin if needed
    });

    // Observe each element marked for animation
    animateOnScrollElements.forEach(element => {
        observer.observe(element);
    });
});
