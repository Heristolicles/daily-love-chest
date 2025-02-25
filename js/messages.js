// Collection of love messages for the daily chest

const loveMessages = [
    "Ich liebe dich!",
    "Du bist mein Ein und Alles!",
    "Du bist wundervoll!",
    "Du bist mein Sonnenschein!",
];

// Helper function to get the last message index from localStorage
function getLastMessageIndex() {
    try {
        const index = localStorage.getItem('lastMessageIndex');
        return index !== null ? parseInt(index, 10) : -1;
    } catch (error) {
        console.error('Error accessing localStorage:', error);
        return -1;
    }
}

// Helper function to save the last message index to localStorage
function setLastMessageIndex(index) {
    try {
        localStorage.setItem('lastMessageIndex', index.toString());
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

// Function to get a message based on the day but ensure we don't repeat until all messages are shown
function getDailyMessage() {
    // Get the last index
    let lastIndex = getLastMessageIndex();
    
    // Create a copy of the indices
    let availableIndices = [];
    for (let i = 0; i < loveMessages.length; i++) {
        if (i !== lastIndex) {
            availableIndices.push(i);
        }
    }
    
    // Reset if we've shown all messages
    if (availableIndices.length === 0) {
        availableIndices = Array.from({length: loveMessages.length}, (_, i) => i);
    }
    
    // Get a random index from available ones
    const randomPosition = Math.floor(Math.random() * availableIndices.length);
    const selectedIndex = availableIndices[randomPosition];
    
    // Save the selected index
    setLastMessageIndex(selectedIndex);
    
    return loveMessages[selectedIndex];
}

// Add an alias for the function to ensure compatibility
function getRandomLoveMessage() {
    return getDailyMessage();
}