document.addEventListener('DOMContentLoaded', () => {
    console.log("Chest.js loaded");
    
    // DOM Elements
    const chestContainer = document.getElementById('chest-container');
    const messageDisplay = document.getElementById('message-display');
    const chestButton = document.getElementById('chest-button');
    const chestClosed = document.getElementById('chest-closed');
    const chestOpen = document.getElementById('chest-open');
    
    // Debug element check
    console.log("chestContainer found:", chestContainer !== null);
    console.log("messageDisplay found:", messageDisplay !== null);
    console.log("chestButton found:", chestButton !== null);
    console.log("chestClosed found:", chestClosed !== null);
    console.log("chestOpen found:", chestOpen !== null);
    
    // Check if chest is already open today
    loadChestState();
    
    chestButton.addEventListener('click', handleChestClick);
    console.log("Click listener added to chest button");
    
    function handleChestClick() {
        console.log("Chest button clicked");
        const today = new Date().toDateString();
        const lastOpened = localStorage.getItem('lastOpenedDate');
        console.log("Last opened:", lastOpened, "Today:", today);
        
        if (lastOpened === today) {
            console.log("Chest already opened today, showing saved message");
            showSavedMessage();
            return;
        }
        
        // Add button press animation
        chestButton.classList.add('button-pressed');
        setTimeout(() => {
            chestButton.classList.remove('button-pressed');
            openChest();
        }, 300);
    }
    
    function openChest() {
        console.log("Opening chest");
        
        // Hide closed chest, show open chest
        chestClosed.classList.add('hidden');
        chestOpen.classList.remove('hidden');
        
        // Animation is now built into the SVG itself
        console.log("Using built-in SVG animation");
        
        // Add sparkles after a delay
        setTimeout(() => {
            console.log("Adding sparkles");
            const sparkles = document.createElement('object');
            sparkles.setAttribute('type', 'image/svg+xml');
            sparkles.setAttribute('data', 'assets/sparkles.svg');
            sparkles.className = 'sparkles';
            chestContainer.appendChild(sparkles);
            
            sparkles.addEventListener('load', () => {
                console.log("Sparkles loaded");
                requestAnimationFrame(() => {
                    sparkles.classList.add('active');
                });
            });
        }, 600);
        
        // Show message after animation completes
        setTimeout(() => {
            showMessage();
        }, 1500);
    }
    
    function showMessage() {
        console.log("Showing message");
        try {
            // Get message with fallback
            let message;
            try {
                message = getRandomLoveMessage(); // Use the original function
            } catch(e) {
                console.error("Error calling getRandomLoveMessage:", e);
                try {
                    message = loveMessages[Math.floor(Math.random() * loveMessages.length)];
                } catch(e2) {
                    console.error("Error accessing loveMessages directly:", e2);
                    message = "Ich liebe dich!";
                }
            }
            
            console.log("Message retrieved:", message);
            
            // Display message
            messageDisplay.style.width = '250px';
            messageDisplay.style.maxWidth = '250px';
            messageDisplay.textContent = message;
            messageDisplay.classList.remove('hidden');
            messageDisplay.classList.add('message-reveal');
            
            // Check if it's a special message
            const isSpecial = message.includes('❤️') || 
                              message.includes('💖') || 
                              message.includes('✨') || 
                              message.includes('🌹') || 
                              message.includes('💝') || 
                              message.includes('🎁') || 
                              message.includes('🌟');
            
            if (isSpecial) {
                // Add extra special effects for special messages
                addSpecialEffects();
                messageDisplay.classList.add('special-message');
            }
            
            // Save state
            localStorage.setItem('lastOpenedDate', new Date().toDateString());
            localStorage.setItem('currentMessage', message);
            localStorage.setItem('chestOpen', 'true');
            localStorage.setItem('messageIsSpecial', isSpecial ? 'true' : 'false');
        } catch (error) {
            console.error("Error showing message:", error);
            messageDisplay.textContent = "Ich liebe dich!"; // Error fallback
            messageDisplay.classList.remove('hidden');
            messageDisplay.classList.add('message-reveal');
        }
        
        // Update button state with smooth transition
        updateButtonText("Komm morgen wieder 😘", true);
    }
    
    // Function to update button text with a smooth transition
    function updateButtonText(newText, disabled) {
        // Add transition class
        chestButton.classList.add('changing-text');
        
        // After fade out, change text and fade back in
        setTimeout(() => {
            chestButton.textContent = newText;
            chestButton.disabled = disabled;
            
            // Remove transition class to fade back in
            setTimeout(() => {
                chestButton.classList.remove('changing-text');
            }, 50);
        }, 300);
    }
    
    function loadChestState() {
        const today = new Date().toDateString();
        const lastOpened = localStorage.getItem('lastOpenedDate');
        const chestIsOpen = localStorage.getItem('chestOpen') === 'true';
        
        if (lastOpened === today && chestIsOpen) {
            // Restore open state
            chestClosed.classList.add('hidden');
            chestOpen.classList.remove('hidden');
            updateButtonText("Komm morgen wieder 😘", true);
            showSavedMessage();
        } else {
            // Reset for new day
            chestClosed.classList.remove('hidden');
            chestOpen.classList.add('hidden');
            messageDisplay.classList.add('hidden');
            updateButtonText("Schatz öffnen", false);
            
            if (lastOpened !== today) {
                localStorage.removeItem('chestOpen');
                localStorage.removeItem('currentMessage');
                localStorage.removeItem('messageIsSpecial');
            }
        }
    }
    
    function showSavedMessage() {
        const savedMessage = localStorage.getItem('currentMessage');
        const isSpecial = localStorage.getItem('messageIsSpecial') === 'true';
        
        if (savedMessage) {
            messageDisplay.style.width = '250px';
            messageDisplay.style.maxWidth = '250px';
            messageDisplay.textContent = savedMessage;
            messageDisplay.classList.remove('hidden');
            messageDisplay.classList.add('message-reveal');
            
            if (isSpecial) {
                messageDisplay.classList.add('special-message');
            }
        }
    }
    
    // Add special visual effects for special messages
    function addSpecialEffects() {
        // Add floating hearts around the message
        const heartsCount = 12;
        for (let i = 0; i < heartsCount; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = ['❤️', '💖', '💕', '💓', '💗'][Math.floor(Math.random() * 5)];
            heart.style.left = (Math.random() * 80 + 10) + '%';
            heart.style.animationDelay = (Math.random() * 2) + 's';
            heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
            chestContainer.appendChild(heart);
            
            // Remove hearts after animation completes
            setTimeout(() => {
                if (heart.parentNode === chestContainer) {
                    chestContainer.removeChild(heart);
                }
            }, 6000);
        }
        
        // Create a glowing effect on the message
        messageDisplay.style.boxShadow = '0 0 15px rgba(255, 105, 180, 0.8)';
        
        // Add a subtle pulse animation to the message
        messageDisplay.style.animation = 'messageReveal 1s ease-out forwards, messagePulse 3s infinite 1s';
    }
});