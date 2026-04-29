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
    console.log("sendEventMA called", payload);
    const body = {
        tenant: 1372,
        event: "test_event",
        context: {
            event_number: 1710259200,
            // event_string: "lclwv2app_to_optimove_via_sdk_manifest", // local assets
            event_string: "whwv2app_to_optimove_via_sdk_manifest", // web-hosted assets
            event_text: payload.event || "",
            event_boolean: true
        },
        visitor: "065e8f25f620e323",
        customer: "118702737",
        timestamp: "2026-03-12T12:00:00Z"
    };
    if (window.AndroidBridge?.sendEventOpt) {
        window.AndroidBridge.sendEventOpt(JSON.stringify(body));
    }
};
// window.sendEventMA = (payload) => {
//     console.log("sendEventMA called", JSON.stringify(payload));
//     const body = {
//         tenant: 1372,
//         event: payload.event || "test_event",
//         context: {
//             event_number: 1710259200,
//             // event_string: "lclwv2app_to_optimove_via_sdk_manifest", // local assets
//             event_string: "whwv2app_to_optimove_via_sdk_manifest", // web-hosted assets
//             event_text: payload.event || "",
//             event_boolean: true,
//             // ...payload
//         },
//         visitor: "065e8f25f620e323",
//         customer: "118702737",
//         timestamp: new Date().toISOString()
//     };
//     if (window.AndroidBridge?.sendEventOpt) {
//         console.log(`body: ${JSON.stringify(body)}`);
//         console.log(`event_string type: ${typeof body.context.event_string}`);
//         console.log(`event_text type: ${typeof body.context.event_text}`);
//         window.AndroidBridge.sendEventOpt(JSON.stringify(body));
//     }
//     window.eventBus?.dispatch(payload.event, payload); // forward into internal event bus
//     console.log(`eventBus: ${JSON.stringify(window.eventBus.getEvents())}`);
// };
