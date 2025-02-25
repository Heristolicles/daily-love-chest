// This file contains the logic for opening the chest, including the animation and revealing the message.

const chestElement = document.getElementById('chest');
const messageElement = document.getElementById('message');
const lastOpenedKey = 'lastOpened';
const messages = [
    "You are loved more than you know!",
    "Your smile brightens my day!",
    "You are my sunshine!",
    "Every moment with you is a treasure!",
    "You make my heart smile!",
];

function getRandomMessage() {
    return messages[Math.floor(Math.random() * messages.length)];
}

function canOpenChest() {
    const lastOpened = localStorage.getItem(lastOpenedKey);
    if (!lastOpened) return true;
    
    const lastOpenedDate = new Date(lastOpened);
    const today = new Date();
    return lastOpenedDate.getDate() !== today.getDate() || 
           lastOpenedDate.getMonth() !== today.getMonth() || 
           lastOpenedDate.getFullYear() !== today.getFullYear();
}

function openChest() {
    if (!canOpenChest()) {
        alert("You've already opened the chest today!");
        return;
    }

    chestElement.classList.add('open');
    messageElement.textContent = getRandomMessage();
    localStorage.setItem(lastOpenedKey, new Date().toISOString());
}

chestElement.addEventListener('click', openChest);