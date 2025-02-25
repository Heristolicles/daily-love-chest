document.addEventListener('DOMContentLoaded', () => {
    const hearts = ['❤️', '💖', '💗', '💓', '💝', '💕'];
    const heartsContainer = document.querySelector('.hearts-background');
    const numberOfHearts = 50;

    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        
        // Random starting position
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDelay = Math.random() * 15 + 's';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 15000);
    }

    // Initial hearts
    for (let i = 0; i < numberOfHearts; i++) {
        setTimeout(() => {
            createHeart();
        }, Math.random() * 5000);
    }

    // Continue creating hearts
    setInterval(() => {
        createHeart();
    }, 300);
});
