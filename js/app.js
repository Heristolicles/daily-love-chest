// This file contains the main JavaScript code for the Daily Love Chest application.

document.addEventListener('DOMContentLoaded', () => {
    console.log("App.js loaded");
    
    // Initialize the UI based on whether the chest was opened today
    const chestButton = document.getElementById('chest-button');
    const messageDisplay = document.getElementById('message-display');
    const chestImage = document.getElementById('chest');
    
    if (!canOpenChest()) {
        // If the chest was already opened today, show the last message and opened chest
        if (chestButton) chestButton.disabled = true;
        if (messageDisplay) {
            messageDisplay.textContent = "You've already opened your love chest today!";
            messageDisplay.classList.remove('hidden');
        }
        if (chestImage) chestImage.src = "assets/chest-open.svg";
    }

    // Debug which elements exist
    console.log("Elements check:", {
        chestButton: document.getElementById('chest-button'),
        messageDisplay: document.getElementById('message-display'),
        chest: document.getElementById('chest')
    });

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

    // Replace with this:
    const elementToDisable = document.getElementById('your-element-id');
    if (elementToDisable) {
        elementToDisable.disabled = true;
    } else {
        console.warn("Element not found: your-element-id");
    }
    
    // Add debugging
    console.log("Available elements:", {
        chestButton: document.getElementById('chest-button'),
        messageDisplay: document.getElementById('message-display'),
        chest: document.getElementById('chest')
    });
});