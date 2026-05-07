// /src/storage/eventStorage.js
const KEY = "events";
export function addEvent(newEvent) {
    try {
        const current = JSON.parse(localStorage.getItem(KEY) || "[]");
        current.push({
            ...newEvent,
            timestamp: Date.now()
        });
        localStorage.setItem(KEY, JSON.stringify(current));
    } catch (e) {
        console.log("addEvent failed:", e);
    }
}
export function getEvents() {
    try {
        return JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch (e) {
        return [];
    }
}