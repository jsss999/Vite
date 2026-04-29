// /src/bridge/sendEventMA.js
import { eventBus } from "../events/eventBus";
export const sendEventMA = (payload) => {
    console.log("sendEventMA called", JSON.stringify(payload));
    const body = {
        tenant: 1372,
        event: "test_event",
        context: {
            event_number: 1710259200,
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
    eventBus.dispatch(payload.event, payload); // forward into internal event bus
    // console.log(`eventBus: ${JSON.stringify(eventBus.getEvents())}`);
};