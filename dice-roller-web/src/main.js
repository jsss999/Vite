// // src/main.js
import { eventBus } from "./events/eventBus";
import { sendEventMA } from "./bridge/sendEventMA";
import "./features/L6L";
import "./features/RRR10";
import "./features/uiHandlers";
// import "./features/diceRules";
// import "./features/uiHandlers";
window.eventBus = eventBus;
window.sendEventMA = sendEventMA;