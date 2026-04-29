// /src/features/RRR10.js
import { eventBus } from "../events/eventBus";
let rollTimes = [];
let triggeredThisLogin = false;
// --- shared handler ---
function handleEvent(event) {
    const now = Date.now();
    // reset per login
    if (event.event === "log_event") {
        rollTimes = [];
        triggeredThisLogin = false;
        console.log("login_event received → state reset");
        return;
    }
    if (event.event === "dice_roll") {
        rollTimes.push(now);
        // keep only last 10 seconds
        const windowStart = now - 10_000;
        rollTimes = rollTimes.filter(t => t >= windowStart);
        console.log("roll window size:", rollTimes.length);
        console.log("First roll: " + new Date(rollTimes[0]).toISOString() + ", Last roll: " + new Date(rollTimes[rollTimes.length - 1]).toISOString() );
        // trigger once per login
        if (!triggeredThisLogin && rollTimes.length === 3) {
            triggeredThisLogin = true;
            triggerTennisAPI();
        }
    }
}
// --- API call ---
async function triggerTennisAPI() {
    try {
        const res = await fetch(
            "https://stats.fn.sportradar.com/unibet/en/Europe:London/gismo/tennis_ranking/0/1/5"
        );
        const json = await res.json();
        const teams = json.doc?.[0]?.data?.teams || [];
        const topSeed = teams[0]?.team?.name || "unknown player";
        console.log("Top seed:", topSeed);
        const payload = {
            tenant: 1372,
            event: "tennis_event",
            context: {
                event_number: rollTimes.length,
                event_string: "RRR10_MA_manifest",
                event_text: topSeed,
                event_boolean: true
            },
            visitor: "065e8f25f620e323",
            customer: "118702737",
            timestamp: new Date().toISOString()
        };
        if (window.AndroidBridge?.sendEventOpt) {
            window.AndroidBridge.sendEventOpt(JSON.stringify(payload));
        }
        eventBus.dispatch("tennis_event", payload);
        console.log("tennis event sent");
    } catch (e) {
        console.error("tennis API trigger failed", e);
    }
}
// --- subscribe ---
eventBus.on("log_event", handleEvent);
eventBus.on("dice_roll", handleEvent);