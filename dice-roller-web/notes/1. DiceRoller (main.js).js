
// FullStackBasicTemplate > Project4v2

// Monolithic Format 5.1.2 5.1.3 5.2.1

// // src/main.js
import { eventBus } from "./eventBus";
window.eventBus = eventBus;
// // Mock-Bridge for testing. Be sure to comment out when bundling!
// window.AndroidBridge = { // Enable this code and run in localhost i.e. cd dice-roller-web > npm run dev
//     sendEventOpt: (msg) => {
//         console.log("Mock bridge received:", msg);
//     }
// };
window.sendEventMA = (payload) => {
    console.log("sendEventMA called", JSON.stringify(payload));
    const body = {
        tenant: 1372,
        event: "test_event",
        context: {
            event_number: 1710259200,
            // event_string: "lclwv2app_to_optimove_via_sdk_manifest", // local assets
            event_string: "whwv2app_to_optimove_via_sdk_manifest", // web-hosted assets
            event_text: payload.event || "",
            event_boolean: true,
            // ...payload
        },
        visitor: "065e8f25f620e323",
        customer: "118702737",
        timestamp: new Date().toISOString()
    };
    if (window.AndroidBridge?.sendEventOpt) {
        window.AndroidBridge.sendEventOpt(JSON.stringify(body));
    }
    window.eventBus?.dispatch(payload.event, payload); // forward into internal event bus
    // console.log(`eventBus: ${JSON.stringify(window.eventBus.getEvents())}`);
};

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

// index.html
<!-- index.html -->
<html>
    <body>
        <button onclick="window.sendEventMA({ event: 'button_clicked', myKey: 'something_else' })" style="font-size: 20px; padding: 12px 24px;">Gest</button>
        <script type="module" src="/src/main.js"></script>
    </body>
</html>


////////////////////////////////////////////