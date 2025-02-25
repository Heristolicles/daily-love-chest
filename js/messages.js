const messages = [
    "You are loved more than you can imagine!",
    "Every day with you is a wonderful addition to my life's journey.",
    "You bring joy and happiness into my life.",
    "Your smile is the reason for my happiness.",
    "You are my sunshine on a cloudy day.",
    "I cherish every moment spent with you.",
    "You are the love of my life, today and always.",
    "Your kindness and love inspire me every day.",
    "With you, every day feels like a beautiful adventure.",
    "You are my heart's desire, and I love you endlessly."
];

function getDailyMessage() {
    const today = new Date().toDateString();
    const lastOpened = localStorage.getItem('lastOpened');

    if (lastOpened === today) {
        return "You've already opened your love chest today!";
    } else {
        localStorage.setItem('lastOpened', today);
        
        // Get the current message index or start at 0 if not set
        let currentIndex = parseInt(localStorage.getItem('currentMessageIndex')) || 0;
        
        // Get the message at the current index
        const message = messages[currentIndex];
        
        // Increment the index for next time, reset to 0 if we've reached the end
        currentIndex = (currentIndex + 1) % messages.length;
        
        // Save the new index
        localStorage.setItem('currentMessageIndex', currentIndex);
        
        return message;
    }
}

// Remove export and make it globally available
// export { getDailyMessage };