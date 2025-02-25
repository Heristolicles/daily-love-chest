document.addEventListener('DOMContentLoaded', () => {
    console.log("Chest.js loaded");
    
    // DOM Elements
    const chestContainer = document.getElementById('chest-container');
    const messageDisplay = document.getElementById('message-display');
    const chestButton = document.getElementById('chest-button');
    const chestClosed = document.getElementById('chest-closed');
    const chestOpen = document.getElementById('chest-open');
    
    // Check if chest is already open today
    loadChestState();
    
    chestButton.addEventListener('click', handleChestClick);
    
    function handleChestClick() {
        const today = new Date().toDateString();
        const lastOpened = localStorage.getItem('lastOpenedDate');
        
        if (lastOpened === today) {
            showSavedMessage();
            return;
        }
        
        openChestWithAnimation();
    }
    
    function openChestWithAnimation() {
        // Hide closed chest, show open chest
        chestClosed.classList.add('hidden');
        chestOpen.classList.remove('hidden');
        
        // Wait for SVG to load then trigger animation
        chestOpen.addEventListener('load', function() {
            const openChestSvg = chestOpen.contentDocument;
            if (openChestSvg) {
                const trigger = openChestSvg.getElementById('chest-trigger');
                if (trigger) {
                    trigger.beginElement();
                    
                    // Add sparkles with fixed positioning
                    setTimeout(() => {
                        const sparklesContainer = document.createElement('div');
                        sparklesContainer.className = 'sparkles';
                        
                        const sparkles = document.createElement('object');
                        sparkles.setAttribute('type', 'image/svg+xml');
                        sparkles.setAttribute('data', 'assets/sparkles.svg');
                        sparkles.className = 'sparkles-svg';
                        
                        sparklesContainer.appendChild(sparkles);
                        chestContainer.appendChild(sparklesContainer);
                        
                        // Add active class after a brief delay to trigger animation
                        requestAnimationFrame(() => {
                            sparklesContainer.classList.add('active');
                        });
                        
                        // Show message
                        setTimeout(() => {
                            const message = getDailyMessage();
                            messageDisplay.textContent = message;
                            messageDisplay.classList.remove('hidden');
                            messageDisplay.classList.add('message-reveal');
                            
                            // Save state
                            localStorage.setItem('lastOpenedDate', new Date().toDateString());
                            localStorage.setItem('currentMessage', message);
                            localStorage.setItem('chestOpen', 'true');
                            
                            // Update button state
                            chestButton.textContent = "Komm morgen wieder 😘";
                            chestButton.disabled = true;
                        }, 1500);
                    }, 500); // Reduced from 1000 to 500
                }
            }
        });
    }
    
    function loadChestState() {
        const today = new Date().toDateString();
        const lastOpened = localStorage.getItem('lastOpenedDate');
        const chestIsOpen = localStorage.getItem('chestOpen') === 'true';
        
        if (lastOpened === today && chestIsOpen) {
            // Restore open state
            chestClosed.classList.add('hidden');
            chestOpen.classList.remove('hidden');
            chestButton.textContent = "Komm morgen wieder 😘";
            chestButton.disabled = true;
            showSavedMessage();
        } else {
            // Reset for new day
            chestClosed.classList.remove('hidden');
            chestOpen.classList.add('hidden');
            messageDisplay.classList.add('hidden');
            chestButton.textContent = "Schatz öffnen";
            chestButton.disabled = false;
            
            if (lastOpened !== today) {
                localStorage.removeItem('chestOpen');
                localStorage.removeItem('currentMessage');
            }
        }
    }
    
    function showSavedMessage() {
        const savedMessage = localStorage.getItem('currentMessage');
        if (savedMessage) {
            messageDisplay.textContent = savedMessage;
            messageDisplay.classList.remove('hidden');
            messageDisplay.classList.add('message-reveal');
        }
    }
});