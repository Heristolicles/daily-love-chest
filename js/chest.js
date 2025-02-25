document.addEventListener('DOMContentLoaded', () => {
    console.log("Chest.js loaded");
    
    const chestButton = document.getElementById('chest-button');
    const messageDisplay = document.getElementById('message-display');
    
    if (chestButton) {
        console.log("Chest button found, adding listener");
        
        chestButton.addEventListener('click', () => {
            console.log("Chest button clicked");
            
            try {
                const message = getDailyMessage(); // Use the function from messages.js
                console.log("Message received:", message);
                
                if (messageDisplay) {
                    messageDisplay.textContent = message;
                    messageDisplay.style.display = 'block';
                } else {
                    console.error("Message display element not found");
                }
                
                // Optional: animate the chest
                const chest = document.getElementById('chest');
                if (chest) {
                    chest.classList.add('open');
                    console.log("Chest opened");
                } else {
                    console.warn("Chest element not found");
                }
            } catch (error) {
                console.error("Error displaying message:", error);
                
                // Fallback message in case of error
                if (messageDisplay) {
                    messageDisplay.textContent = "Something went wrong, but I still love you!";
                    messageDisplay.style.display = 'block';
                }
            }
        });
    } else {
        console.error('Chest button not found in the DOM');
    }
});