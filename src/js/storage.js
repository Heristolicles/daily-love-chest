// This file handles the storage of the last opened date and the messages, possibly using local storage to track daily openings.

const STORAGE_KEY = 'dailyLoveChest';
const LAST_OPENED_KEY = 'lastOpened';

function getMessages() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveMessages(messages) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

function getLastOpenedDate() {
    return localStorage.getItem(LAST_OPENED_KEY);
}

function setLastOpenedDate(date) {
    localStorage.setItem(LAST_OPENED_KEY, date);
}

function canOpenChest() {
    const lastOpened = getLastOpenedDate();
    if (!lastOpened) {
        return true;
    }
    const lastOpenedDate = new Date(lastOpened);
    const today = new Date();
    return lastOpenedDate.toDateString() !== today.toDateString();
}

export { getMessages, saveMessages, getLastOpenedDate, setLastOpenedDate, canOpenChest };