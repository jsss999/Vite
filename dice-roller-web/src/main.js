// src/main.js

// window.AndroidBridge = {
//     sendEvent: (msg) => {
//         console.log("Mock bridge received:", msg);
//     }
// };
window.sendEvent = function (payload) {
    const body = {
        tenant: 1372,
        event: "test_event",
        context: {
            event_number: 1710259200,
            event_string: "wv2app_to_optimove_via_sdk_manifest",
            event_text: payload.event || "",
            event_boolean: true
        },
        visitor: "065e8f25f620e323",
        customer: "118702737",
        timestamp: "2026-03-12T12:00:00Z"
    };
    if (window.AndroidBridge && window.AndroidBridge.sendEvent) {
        window.AndroidBridge.sendEvent(JSON.stringify(body));
    }
};