document.addEventListener('DOMContentLoaded', () => {
    console.log("Chest.js loaded");
    
    const chestImage = document.getElementById('chest');
    const sparklesImage = document.getElementById('sparkles');
    const messageDisplay = document.getElementById('message-display');
    const chestButton = document.getElementById('chest-button');
    
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
        sparklesImage.classList.remove('hidden');
        sparklesImage.classList.add('active');
        
        // Get a random message - try both function names for compatibility
        let message;
        if (typeof getDailyMessage === 'function') {
            message = getDailyMessage();
        } else if (typeof getRandomLoveMessage === 'function') {
            message = getRandomLoveMessage();
        } else {
            message = "I love you!"; // Default fallback
        }
        
        // Save today's data
        try {
            const today = new Date().toDateString();
            localStorage.setItem('lastOpenedDate', today);
            localStorage.setItem('currentMessage', message);
            localStorage.setItem('chestOpen', 'true');
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
        
        // Show message with slight delay for animation effect
        setTimeout(() => {
            displayMessage(message);
        }, 800);
    }
    
    function loadChestState() {
        try {
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
                sparklesImage.classList.add('hidden');
                sparklesImage.classList.remove('active');
                messageDisplay.classList.add('hidden');
                chestButton.textContent = "Open Chest";
                chestButton.disabled = false;
                
                // Clear any previous state
                if (lastOpened !== today) {
                    localStorage.removeItem('chestOpen');
                    localStorage.removeItem('currentMessage');
                }
            }
        } catch (error) {
            console.error('Error accessing localStorage:', error);
            // Reset to default state on error
            chestImage.src = "assets/chest-closed.svg";
            chestButton.textContent = "Open Chest";
        }
    }
    // Function to show the saved message if available
    function showSavedMessage() {
        try {
            const savedMessage = localStorage.getItem('currentMessage');
            if (savedMessage) {
                displayMessage(savedMessage);
            }
        } catch (error) {
            console.error('Error accessing saved message:', error);
        }
    }
    


    function showSavedMessage() {
        try {
            const savedMessage = localStorage.getItem('currentMessage');
            if (savedMessage) {
                displayMessage(savedMessage);
            }
        } catch (error) {
            console.error('Error accessing saved message:', error);
        }
    }
    
    function displayMessage(message) {
        messageDisplay.textContent = message;
        messageDisplay.classList.remove('hidden');
    }
});