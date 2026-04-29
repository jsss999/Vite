// // src/main.js
import { eventBus } from "./events/eventBus";
import { sendEventMA } from "./bridge/sendEventMA";
// import "./features/diceRules";
// import "./features/uiHandlers";
window.eventBus = eventBus;
window.sendEventMA = sendEventMA;