document.addEventListener('DOMContentLoaded', () => {
    console.log("Chest.js loaded");
    
    const chestButton = document.getElementById('chest-button');
    const messageDisplay = document.getElementById('message-display');
    const chestImage = document.getElementById('chest');
    const sparklesElement = document.getElementById('sparkles');
    
    // Function to handle chest opening animation and message display
    function openChest(message) {
        // Change chest image to open
        chestImage.src = "assets/chest-open.svg";
        
        // Add animation classes
        chestImage.classList.add('chest-opening');
        
        // After chest opens, show sparkles
        setTimeout(() => {
            sparklesElement.classList.add('sparkles-animate');
            
            // Show the message after a short delay
            setTimeout(() => {
                messageDisplay.textContent = message;
                messageDisplay.classList.remove('hidden');
                messageDisplay.classList.add('message-reveal');
                
                // Disable the button
                chestButton.disabled = true;
                chestButton.textContent = "Already Opened Today";
                
                // Save the state
                setLastOpenedDate(new Date().toDateString());
                setLastMessage(message);
            }, 500);
        }, 800);
    }
    
    // Check if chest was already opened today
    if (!canOpenChest()) {
        // Get the message from yesterday and show it
        const lastMessage = getLastMessage();
        chestButton.disabled = true;
        chestButton.textContent = "Already Opened Today";
        chestImage.src = "assets/chest-open.svg";
        
        // Show the message
        messageDisplay.textContent = lastMessage;
        messageDisplay.classList.remove('hidden');
    }
    
    if (chestButton) {
        console.log("Chest button found, adding listener");
        
        chestButton.addEventListener('click', () => {
            console.log("Chest button clicked");
            
            if (canOpenChest()) { // Check from storage.js
                try {
                    const message = getDailyMessage(); // Use the function from messages.js
                    console.log("Message received:", message);
                    openChest(message);
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