// /src/bridge/sendEventMA.js
import { eventBus } from "../events/eventBus";
import { addEvent } from "../storage/eventStorage";
export const sendEventMA = (payload) => {
    console.log("sendEventMA called", JSON.stringify(payload));
    eventBus.dispatch(payload.event, payload); // forward into internal event bus
    addEvent({ event: payload.event, payload });
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: payload.event, payload });
    // console.log(`eventBus: ${JSON.stringify(eventBus.getEvents())}`);
};