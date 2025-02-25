// This file contains the main JavaScript code for the Daily Love Chest application.

document.addEventListener('DOMContentLoaded', () => {
    const chestButton = document.getElementById('chest-button');
    const messageDisplay = document.getElementById('message-display');
    const lastOpenedDate = localStorage.getItem('lastOpenedDate');
    const today = new Date().toISOString().split('T')[0];

    if (lastOpenedDate === today) {
        chestButton.disabled = true;
        messageDisplay.textContent = "You've already opened your love chest today!";
    } else {
        chestButton.disabled = false;
    }

    chestButton.addEventListener('click', () => {
        openChest();
        localStorage.setItem('lastOpenedDate', today);
    });

    function openChest() {
        // Logic to open the chest and reveal a message
        const message = getRandomMessage();
        messageDisplay.textContent = message;
        // Add animation for opening the chest
        chestButton.classList.add('open-animation');
        setTimeout(() => {
            chestButton.classList.remove('open-animation');
        }, 1000); // Duration of the animation
    }

    function getRandomMessage() {
        const messages = [
            "You are loved more than you know!",
            "Your smile brightens my day!",
            "You are a treasure in my life!",
            "Every moment with you is a gift!",
            "You make my heart sparkle!"
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    }

    // Check if the element exists before setting properties
    const element = document.getElementById('your-element-id');
    if (element) {
        element.disabled = true; // or whatever you're trying to do
    }
    
    // Add console.log to debug which element is missing
    console.log('Elements check:', {
        button: document.getElementById('chest-button'),
        message: document.getElementById('message-display'),
        chest: document.getElementById('chest')
    });
});