document.addEventListener('DOMContentLoaded', () => {
    console.log("Chest.js loaded");
    
    const chestButton = document.getElementById('chest-button');
    const messageDisplay = document.getElementById('message-display');
    const chestImage = document.getElementById('chest');
    const sparklesElement = document.getElementById('sparkles');
    
    // Check if chest is already open today
    loadChestState();
    
    chestButton.addEventListener('click', handleChestClick);
    
    function handleChestClick() {
        const today = new Date().toDateString();
        const lastOpened = localStorage.getItem('lastOpenedDate');
        
        // Allow opening once per day
        if (lastOpened === today) {
            // Already opened today, just show the saved message
            showSavedMessage();
            return;
        }
        
        // Open chest with animation and show new message
        openChestWithAnimation();
    }
    
    function openChestWithAnimation() {
        // Change button text
        chestButton.textContent = "Opened for Today";
        chestButton.disabled = true;
        
        // Change chest image to open
        chestImage.src = "assets/chest-open.svg";
        
        // Show sparkles with animation
        sparklesElement.classList.remove('hidden');
        sparklesElement.classList.add('active');
        
        // Get a random message
        const message = getRandomMessage();
        
        // Save today's data
        const today = new Date().toDateString();
        localStorage.setItem('lastOpenedDate', today);
        localStorage.setItem('currentMessage', message);
        localStorage.setItem('chestOpen', 'true');
        
        // Show message with slight delay for animation effect
        setTimeout(() => {
            displayMessage(message);
        }, 800);
    }
    
    function loadChestState() {
        const today = new Date().toDateString();
        const lastOpened = localStorage.getItem('lastOpenedDate');
        const chestOpen = localStorage.getItem('chestOpen') === 'true';
        
        if (lastOpened === today && chestOpen) {
            // If chest was opened today, restore the open state
            chestImage.src = "assets/chest-open.svg";
            chestButton.textContent = "Opened for Today";
            chestButton.disabled = true;
            
            // Show saved message
            showSavedMessage();
        } else {
            // Reset for a new day
            chestImage.src = "assets/chest-closed.svg";
            sparklesElement.classList.add('hidden');
            sparklesElement.classList.remove('active');
            messageDisplay.classList.add('hidden');
            chestButton.textContent = "Open Chest";
            chestButton.disabled = false;
            
            // Clear any previous state
            if (lastOpened !== today) {
                localStorage.removeItem('chestOpen');
                localStorage.removeItem('currentMessage');
            }
        }
    }
    
    function showSavedMessage() {
        const savedMessage = localStorage.getItem('currentMessage');
        if (savedMessage) {
            displayMessage(savedMessage);
        }
    }
    
    function displayMessage(message) {
        messageDisplay.textContent = message;
        messageDisplay.classList.remove('hidden');
    }
    
    function getRandomMessage() {
        // This function should be defined in messages.js
        // Fallback implementation if not available
        if (typeof getRandomLoveMessage === 'function') {
            return getRandomLoveMessage();
        } else {
            const defaultMessages = [
                "I love you more each day!",
                "You make my heart smile.",
                "Forever yours, always.",
                "You're my favorite person."
            ];
            return defaultMessages[Math.floor(Math.random() * defaultMessages.length)];
        }
    }
});