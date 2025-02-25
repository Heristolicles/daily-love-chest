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
        
        // Add sparkles
        const sparkles = document.createElement('div');
        sparkles.className = 'sparkles';
        sparkles.innerHTML = `<object type="image/svg+xml" data="assets/sparkles.svg"></object>`;
        chestContainer.appendChild(sparkles);
        
        // Trigger sparkles animation after a short delay
        setTimeout(() => {
            sparkles.classList.add('active');
        }, 100);

        // Update button state
        chestButton.textContent = "Opened for Today";
        chestButton.disabled = true;
        
        // Get and show message after animation
        const message = getDailyMessage();
        setTimeout(() => {
            messageDisplay.textContent = message;
            messageDisplay.classList.remove('hidden');
            messageDisplay.classList.add('message-reveal');
            
            // Save state
            localStorage.setItem('lastOpenedDate', new Date().toDateString());
            localStorage.setItem('currentMessage', message);
            localStorage.setItem('chestOpen', 'true');
        }, 1000);
    }
    
    function loadChestState() {
        const today = new Date().toDateString();
        const lastOpened = localStorage.getItem('lastOpenedDate');
        const chestIsOpen = localStorage.getItem('chestOpen') === 'true';
        
        if (lastOpened === today && chestIsOpen) {
            // Restore open state
            chestClosed.classList.add('hidden');
            chestOpen.classList.remove('hidden');
            chestButton.textContent = "Opened for Today";
            chestButton.disabled = true;
            showSavedMessage();
        } else {
            // Reset for new day
            chestClosed.classList.remove('hidden');
            chestOpen.classList.add('hidden');
            messageDisplay.classList.add('hidden');
            chestButton.textContent = "Open Chest";
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