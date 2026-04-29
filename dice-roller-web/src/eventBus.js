// /src/eventBus.js
const listeners = {};
const events = [];
export const eventBus = {
    on(event, handler) {
        (listeners[event] ||= []).push(handler);
    },
    off(event, handler) {
        listeners[event] = (listeners[event] || []).filter(h => h !== handler);
    },
    dispatch(event, payload) {
        const entry = {
            event,
            payload,
            timestamp: Date.now()
        };
        events.push(entry);
        (listeners[event] || []).forEach(h => h(payload));
    },
    getEvents() {
        return events;
    },
    clearEvents() {
        events.length = 0;
    }
};