// // src/main.js
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
            event_string: "wv2app_to_optimove_via_sdk_manifest",
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