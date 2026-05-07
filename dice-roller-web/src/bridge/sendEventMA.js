// /src/bridge/sendEventMA.js
import { eventBus } from "../events/eventBus";
export const sendEventMA = (payload) => {
    console.log("sendEventMA called", JSON.stringify(payload));
    eventBus.dispatch(payload.event, payload); // forward into internal event bus
    // console.log(`eventBus: ${JSON.stringify(eventBus.getEvents())}`);
};