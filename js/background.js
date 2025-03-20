document.addEventListener('DOMContentLoaded', () => {
    const hearts = ['❤️', '💖', '💗', '💓', '💝', '💕'];
    const heartsContainer = document.querySelector('.hearts-background');
    const numberOfHearts = 50;

    // Create animated heart background
    for (let i = 0; i < numberOfHearts; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        
        // More distributed positioning
        heart.style.left = (Math.random() * 90 + 5) + 'vw';  // Keep hearts away from edges
        heart.style.top = (Math.random() * 90 + 5) + 'vh';   // Keep hearts away from edges
        
        // Varied sizes for depth effect
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        
        // Varied opacity for depth effect
        heart.style.opacity = (Math.random() * 0.2 + 0.2).toString();
        
        // Add pulse animation with random delays and durations
        heart.style.animation = `heartbeat ${Math.random() * 2 + 3}s infinite ${Math.random() * 5}s`;
        
        // Add subtle floating movement
        heart.style.transition = 'transform 10s ease-in-out';
        
        heartsContainer.appendChild(heart);
        
        // Subtle random movement every few seconds
        setInterval(() => {
            const xMove = (Math.random() * 20 - 10);
            const yMove = (Math.random() * 20 - 10);
            heart.style.transform = `translate(${xMove}px, ${yMove}px)`;
        }, 10000);
    }
    
    // Occasionally add a floating heart for extra effect
    setInterval(() => {
        // Only add new hearts 50% of the time to avoid overwhelming the screen
        if (Math.random() > 0.5) return;
        
        const heart = document.createElement('div');
        heart.className = 'floating-background-heart';
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = (Math.random() * 90 + 5) + 'vw';
        heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
        heartsContainer.appendChild(heart);
        
        // Remove the floating heart after animation completes
        setTimeout(() => {
            if (heart.parentNode === heartsContainer) {
                heartsContainer.removeChild(heart);
            }
        }, 10000);
    }, 5000);
});
