import Lenis from '@studio-freight/lenis';

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll behavior for the entire page
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Create dynamic paint spots
    const createPaintSpot = () => {
        const spot = document.createElement('div');
        spot.className = 'paint-spot';
        
        // Random size between 300px and 600px
        const size = Math.random() * 300 + 300;
        spot.style.width = `${size}px`;
        spot.style.height = `${size}px`;
        
        // Random position
        spot.style.left = `${Math.random() * 100}vw`;
        spot.style.top = `${Math.random() * 100}vh`;
        
        // Random animation duration between 20s and 30s
        const duration = Math.random() * 10 + 20;
        spot.style.animation = `float ${duration}s infinite ease-in-out ${Math.random() * 10}s, pulse ${duration/2}s infinite ease-in-out`;
        
        document.body.appendChild(spot);
    };

    // Create graffiti elements
    const createGraffiti = () => {
        const graffiti = document.createElement('div');
        graffiti.className = 'graffiti';
        
        // Random size between 200px and 400px
        const width = Math.random() * 200 + 200;
        const height = Math.random() * 200 + 200;
        graffiti.style.width = `${width}px`;
        graffiti.style.height = `${height}px`;
        
        // Random position in darker areas
        const footer = document.querySelector('footer');
        const inspiration = document.querySelector('.inspiration');
        const target = Math.random() > 0.5 ? footer : inspiration;
        
        graffiti.style.left = `${Math.random() * 100}%`;
        graffiti.style.top = `${Math.random() * 100}%`;
        
        target.appendChild(graffiti);
    };

    // Create initial paint spots and graffiti
    for (let i = 0; i < 6; i++) {
        createPaintSpot();
    }
    
    for (let i = 0; i < 4; i++) {
        createGraffiti();
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                lenis.scrollTo(target, {
                    offset: 0,
                    duration: 1.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            }
        });
    });

    // Add animation on scroll for feature cards
    const cards = document.querySelectorAll('.feature-card');
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

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});