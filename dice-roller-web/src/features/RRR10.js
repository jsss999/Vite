// /src/features/RRR10.js
// 1. to both aggregate and push events directly from mini-app (via GTM-implemented web SDK): Uncomment event subscriptions at the bottom (i.e. eventBus.on statements)
// 2. to both aggregate and push events from GTM tags: Comment event subscriptions at the bottom (i.e. eventBus.on statements)
import { eventBus } from "../events/eventBus";
import { addEvent } from "../storage/eventStorage";
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
            "https://stats.fn.sportradar.com/unibet/en/Europe:London/gismo/tennis_ranking/1/1/5"
        );
        const json = await res.json();
        const teams = json.doc?.[0]?.data?.teams || [];
        const topSeed = teams[0]?.team?.name || "unknown player";
        console.log("Top seed:", topSeed);

        // Send back to app to push via Mobile SDK
        const body = {
            tenant: 1372,
            event: "test_event",
            context: {
                event_number: rollTimes.length,
                event_string: "RRR10_whwv2app_to_optimoveiOS", // RRR10_whwv2app_to_optimoveAnd
                event_text: topSeed,
                event_boolean: true
            },
            visitor: "065e8f25f620e323",
            customer: "118702737",
            timestamp: new Date().toISOString()
        };
        if (window.AndroidBridge?.sendEventOpt) {
            window.AndroidBridge.sendEventOpt(JSON.stringify(body));
        }
        if (window.webkit?.messageHandlers?.iosBridge) {
            console.log("sending RRR10 to iOS")
            window.webkit.messageHandlers.iosBridge.postMessage(JSON.stringify(body));
        }        
        eventBus.dispatch("RRR10_event", body); // forward into internal event bus

        // // Push via GTM
        // var event_name = 'test_event';
        // var params = {
        //     event_number: rollTimes.length,
        //     event_string: "RRR10_whminiapp_to_optimove",
        //     event_text: topSeed,
        //     event_boolean: true
        // };
        // reportCustomEvent(event_name, params, window.customer.customerId);
        // dataLayer.push({'event': event_name});
        // eventBus.dispatch("RRR10_event", params); // forward into internal event bus
        // addEvent({ event: "RRR10_event", payload: params });

        console.log(`eventBus: ${JSON.stringify(eventBus.getEvents())}`);
    } catch (e) {
        console.error("tennis API trigger failed", e);
    }
}
// --- subscribe to events that RRR10 is dependent on ---
eventBus.on("log_event", handleEvent);
eventBus.on("dice_roll", handleEvent);