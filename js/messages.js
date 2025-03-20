// Collection of love messages for the daily chest

const loveMessages = [
    "Ich liebe dich!",
    "Du bist mein Ein und Alles!",
    "Du bist wundervoll!",
    "Du bist mein Sonnenschein!",
    "Du bist die schönste Frau der Welt!",
    "Du hast sooo tolle Haare!",
    "Fabi und Benni sind ein tolles Team!",
    "Wir passen soooo gut zusammen!",
    "Ich kann nicht genug von dir bekommen!",
    "Ich liebe dich so wie du bist!",
    "Mein Herz gehört dir!",
    "Wir tanzen genauso toll wie die in Dirty Dancing!",
    "Deine Haut ist so weich und schön. Ich liebe sie zu streicheln!",
    "Du bist so süß!",
    "Du bist so sexy!",
    "Wir fahren zusammen in den Urlaub!",
    "Die Zeit mit dir ist so schön!",
    // Adding new personalized messages
    "Jeder Tag mit dir ist ein Geschenk für mich!",
    "Dein Lächeln erhellt meinen ganzen Tag!",
    "Du bist meine Lieblingsmensch auf der ganzen Welt!",
    "Mit dir möchte ich alt werden!",
    "Du bist nicht nur meine Liebe, sondern auch meine beste Freundin!",
    "Wenn ich in deine Augen schaue, sehe ich meine Zukunft!",
    "Du machst mich zu einem besseren Menschen!",
    "Deine Umarmungen sind mein Lieblingszuhause!",
    "Ich liebe es, wie du lachst - es ist der schönste Klang der Welt!",
    "Mit dir an meiner Seite kann ich alles schaffen!",
    "Du bist mein größtes Glück!",
    "Ich bin so dankbar, dass ich dich gefunden habe!",
    "Du bist mein Traum, der wahr geworden ist!",
    "Selbst nach all dieser Zeit bekomme ich Schmetterlinge, wenn ich dich sehe!",
    "Ich liebe unsere gemeinsamen Abenteuer!",
    "Erinnerst du dich an unser erstes Date? Ich war so nervös und so glücklich!",
    "Ich liebe deine Art zu denken und die Welt zu sehen!",
    "Du inspirierst mich jeden Tag!",
    "Unsere Liebe ist mein wertvollster Schatz!",
];

// Special messages that appear more rarely (for special occasions)
const specialMessages = [
    "❤️ Ich liebe jedes einzelne Detail an dir! Von deinem Lächeln bis zu deinen kleinen Gewohnheiten! ❤️",
    "💖 Du bist die Frau meiner Träume und ich bin so glücklich, dass du real bist! 💖",
    "✨ Heute ist ein besonderer Tag für eine besondere Nachricht: Du bist das Beste, was mir je passiert ist! ✨",
    "🌹 Ich würde dir gerne 1000 Rosen schenken, aber dieser digitale Kuss muss heute reichen: 😘 🌹",
    "💝 Ich denke den ganzen Tag an dich und kann es kaum erwarten, dich wieder zu sehen! 💝",
    "🎁 Überraschung! Ich habe etwas Besonderes für dich geplant. Frag mich danach! 🎁",
    "🌟 Du verdienst die Welt, und ich werde mein Bestes tun, sie dir zu geben! 🌟",
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
    // Special message with 15% chance (if not already shown today)
    if (Math.random() < 0.15 && !localStorage.getItem('specialMessageShown')) {
        localStorage.setItem('specialMessageShown', 'true');
        const specialIndex = Math.floor(Math.random() * specialMessages.length);
        return specialMessages[specialIndex];
    }
    
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

// Reset the special message flag on a new day
function resetSpecialMessageFlag() {
    const today = new Date().toDateString();
    const lastReset = localStorage.getItem('lastSpecialReset');
    
    if (lastReset !== today) {
        localStorage.removeItem('specialMessageShown');
        localStorage.setItem('lastSpecialReset', today);
    }
}

// Call reset when this script loads
resetSpecialMessageFlag();

// Add an alias for the function to ensure compatibility
function getRandomLoveMessage() {
    return getDailyMessage();
}