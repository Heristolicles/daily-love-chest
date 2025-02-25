document.addEventListener('DOMContentLoaded', () => {
    console.log("Chest.js loaded");
    
    const chestButton = document.getElementById('chest-button');
    const messageDisplay = document.getElementById('message-display');
    const chestImage = document.getElementById('chest');
    
    if (chestButton) {
        console.log("Chest button found, adding listener");
        
        chestButton.addEventListener('click', () => {
            console.log("Chest button clicked");
            
            if (canOpenChest()) { // Check from storage.js
                try {
                    const message = getDailyMessage(); // Use the function from messages.js
                    console.log("Message received:", message);
                    
                    if (messageDisplay) {
                        messageDisplay.textContent = message;
                        messageDisplay.classList.remove('hidden');
                    } else {
                        console.error("Message display element not found");
                    }
                    
                    // Change chest image to open
                    if (chestImage) {
                        chestImage.src = "assets/chest-open.svg";
                        console.log("Chest opened");
                    } else {
                        console.warn("Chest element not found");
                    }
                    
                    setLastOpenedDate(new Date().toDateString());
                } catch (error) {
                    console.error("Error displaying message:", error);
                    
                    if (messageDisplay) {
                        messageDisplay.textContent = "Something went wrong, but I still love you!";
                        messageDisplay.classList.remove('hidden');
                    }
                }
            } else {
                if (messageDisplay) {
                    messageDisplay.textContent = "You've already opened your love chest today!";
                    messageDisplay.classList.remove('hidden');
                }
            }
        });
    } else {
        console.error('Chest button not found in the DOM');
    }
});