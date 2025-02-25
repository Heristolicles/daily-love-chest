// Collection of love messages for the daily chest

const loveMessages = [
    "I love the way your eyes light up when you laugh.",
    "The way you care for others makes my heart melt.",
    "Your smile brightens even my darkest days.",
    "I love how passionate you are about the things you love.",
    "The sound of your voice is my favorite melody.",
    "Your kindness inspires me to be a better person.",
    "I love our adventures together, big and small.",
    "You make ordinary moments extraordinary.",
    "I love how you understand me without words.",
    "Your strength amazes me every single day.",
    "I love when you get excited about little things.",
    "The way you see beauty in everything is magical.",
    "Your hugs make me feel like I'm home.",
    "I love your thoughtfulness and attention to detail.",
    "You make me laugh even when I don't want to.",
    "I love how you never give up on your dreams.",
    "The way you listen makes me feel truly heard.",
    "Your creativity inspires me endlessly.",
    "I love your compassion for everyone you meet.",
    "The peace I feel when I'm with you is priceless.",
    "I love how you always know what to say.",
    "Your determination pushes me to try harder.",
    "I love watching you do things you're passionate about.",
    "The way you support me means everything.",
    "Your quirky habits make me smile every day.",
    "I love how you remember the little things.",
    "The way you see the best in people is beautiful.",
    "Your mind fascinates me more each day.",
    "I love how you make me feel safe and loved.",
    "Every day with you is an adventure I cherish."
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