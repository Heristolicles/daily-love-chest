document.addEventListener('DOMContentLoaded', () => {
    // Disable scrolling
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    
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
    
    // Create floating hearts - 2.5x the original amount
    setInterval(() => {
        // Add 2-3 hearts at a time with 80% chance
        if (Math.random() > 0.2) {
            // Create 2-3 hearts per batch
            const heartsPerBatch = Math.random() > 0.5 ? 3 : 2;
            
            for (let i = 0; i < heartsPerBatch; i++) {
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
            }
        }
    }, 2000); // 2 seconds between batches
    
    // Prevent scrolling with keyboard as well
    window.addEventListener('keydown', function(e) {
        // Space, Page Up, Page Down, End, Home, Left, Up, Right, Down
        const keys = {32: 1, 33: 1, 34: 1, 35: 1, 36: 1, 37: 1, 38: 1, 39: 1, 40: 1};
        if (keys[e.keyCode]) {
            e.preventDefault();
            return false;
        }
    });
    
    // Prevent mouse wheel scrolling
    window.addEventListener('wheel', function(e) {
        e.preventDefault();
    }, { passive: false });
    
    // Prevent touch scrolling
    window.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, { passive: false });
});
