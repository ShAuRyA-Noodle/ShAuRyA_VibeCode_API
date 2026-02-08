document.addEventListener('DOMContentLoaded', function() {
    const particlesContainer = document.getElementById('particles');
    
    if (particlesContainer) {
        for (let i = 0; i < 50; i++) {
            createParticle();
        }
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(${Math.random() > 0.5 ? '0, 240, 255' : '255, 0, 128'}, ${Math.random() * 0.5 + 0.3})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.pointerEvents = 'none';
        particle.style.boxShadow = `0 0 ${Math.random() * 20 + 10}px rgba(0, 240, 255, 0.5)`;
        
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.animation = `particleMove ${duration}s ${delay}s infinite ease-in-out`;
        
        particlesContainer.appendChild(particle);
    }
    
    const cards = document.querySelectorAll('.mega-card, .info-card, .news-panel, .analytics-card, .metrics-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            card.style.setProperty('--mouse-x', x + '%');
            card.style.setProperty('--mouse-y', y + '%');
        });
    });
    
    const numbers = document.querySelectorAll('.mega-number, .card-value, .rank-number');
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'none';
                setTimeout(() => {
                    entry.target.style.animation = '';
                }, 10);
            }
        });
    }, observerOptions);
    
    numbers.forEach(num => observer.observe(num));
    
    const newsItems = document.querySelectorAll('.news-item');
    newsItems.forEach((item, index) => {
        item.style.animationDelay = (index * 0.1) + 's';
    });
    
    const analyzeBtn = document.querySelector('.analyze-btn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', function(e) {
            const particles = document.querySelector('.btn-particles');
            if (particles) {
                particles.style.opacity = '0.6';
                setTimeout(() => {
                    particles.style.opacity = '0';
                }, 300);
            }
        });
    }
    
    setInterval(() => {
        const statusDot = document.querySelector('.status-dot');
        if (statusDot) {
            statusDot.style.background = Math.random() > 0.5 ? '#00f0ff' : '#ff0080';
        }
    }, 3000);
    
    const rankProgress = document.querySelector('.progress-ring');
    if (rankProgress) {
        const circle = rankProgress;
        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        const offset = circumference - (75 / 100) * circumference;
        
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = offset;
    }
});

const style = document.createElement('style');
style.textContent = `
    @keyframes particleMove {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);