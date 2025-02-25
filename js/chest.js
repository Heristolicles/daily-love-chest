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
        const chestButton = document.getElementById('chest-button');
        const messageDisplay = document.getElementById('message-display');
        const sparklesElement = document.getElementById('sparkles');
        
        // Disable button immediately
        if (chestButton) {
            chestButton.disabled = true;
            chestButton.textContent = "Opened for Today";
        }
        
        // Show sparkles first
        if (sparklesElement) {
            sparklesElement.classList.remove('hidden');
            sparklesElement.classList.add('active');
        }
        
        // Get message but wait to display it
        const message = getDailyMessage();
        
        // Show message after delay
        setTimeout(() => {
            if (messageDisplay) {
                messageDisplay.textContent = message;
                messageDisplay.classList.remove('hidden');
                messageDisplay.classList.add('message-reveal');
            }
            
            // Save state after message is shown
            setLastOpenedDate(new Date().toDateString());
            setLastMessage(message);
        }, 2000); // 2 second delay for message
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