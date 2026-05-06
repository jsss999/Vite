// /src/features/L6L.js
import { eventBus } from "../events/eventBus";
let chain = [];
let sumRolls = 0;
// --- track events ---
function handleEvent(event) {
    let symbol = "X";
    // log_event → L
    if (event.event === "log_event") {
        symbol = "L";
    }
    // dice_roll → check last roll value
    if (event.event === "dice_roll") {
        const roll = event.data?.rollValue;
        if (roll === 6) {
            symbol = "6";
            sumRolls += 6;
        }
    }
    // update chain (sliding window size 3)
    chain.push(symbol);
    if (chain.length > 3) {
        chain.shift();
    }
    const pattern = chain.join("");
    console.log("chain:", pattern);
    if (pattern === "L6L") {
        console.log("Trigger matched L6L");
        chain = [];
        triggerOptimoveFlow();
    }
}
// --- API + Optimove trigger ---
async function triggerOptimoveFlow() {
    try {
        const res = await fetch(
            "https://stats.fn.sportradar.com/unibet/en/Europe:London/gismo/stats_season_fixtures2/130281/1"
        );
        const json = await res.json();
        const matches = json.doc[0].data.matches;
        console.log(`First game: ${matches[0].teams.home.mediumname} v ${matches[0].teams.away.mediumname}`)
        const now = Math.floor(Date.now() / 1000);
        let nextMatch = null;
        let lastMatch = null;
        for (const m of matches) {
            const uts = m.time.uts;
            if (uts > now) {
                if (!nextMatch || uts < nextMatch.time.uts) {
                    nextMatch = m;
                }
            }
            if (uts < now) {
                if (!lastMatch || uts > lastMatch.time.uts) {
                    lastMatch = m;
                }
            }
        }
        let nextGame = "";
        let lastGame = "";
        if (nextMatch) {
            const h = nextMatch.teams.home.name;
            const a = nextMatch.teams.away.name;
            nextGame = `${h} v ${a}`;
        }
        if (lastMatch) {
            const h = lastMatch.teams.home.name;
            const a = lastMatch.teams.away.name;
            const ft = lastMatch.periods.ft;
            lastGame = `${h} ${ft.home}-${ft.away} ${a}`;
        }
        // --- send to native Optimove bridge ---
        const body = {
            tenant: 1372,
            event: "test_event",
            context: {
                event_number: sumRolls,
                event_string: "L6L_whwv2app_to_optimove", // L6L_GTM2Opt_manifest
                event_text: lastGame, // nextGame
                event_boolean: true
            },
            visitor: "065e8f25f620e323",
            customer: "118702737",
            timestamp: new Date().toISOString()
        };
        if (window.AndroidBridge?.sendEventOpt) {
            window.AndroidBridge.sendEventOpt(JSON.stringify(body));
        }
        eventBus.dispatch("L6L_event", body); // forward into internal event bus
        console.log(`eventBus: ${JSON.stringify(eventBus.getEvents())}`);
    } catch (e) {
        console.error("Optimove flow failed", e);
    }
}
// --- subscriptions ---
eventBus.on("log_event", handleEvent);
eventBus.on("dice_roll", handleEvent);

// // sendEventOpt in native app handles any event and context. Use this body to test (Optimove Event Log: event: sportsbook_bet)
// const body = {
//     tenant: 1372,
//     event: "sportsbook_bet",
//     context: {
//         bet_info_amount: sumRolls,
//         bet_header_channel: "L6L_whwv2app_to_optimove", // L6L_GTM2Opt_manifest
//         bet_info_bet_category: lastGame, // nextGame
//     },
//     visitor: "065e8f25f620e323",
//     customer: "118702737",
//     timestamp: new Date().toISOString()
// };