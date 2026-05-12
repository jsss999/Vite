
// Mini-App code for Dice Roller App
// Deploys aggregated events L6L and RRR10 to Optimove through one of these methods
// 1. via the Android app (Mobile SDK)
// 2. directly from Mini-App (Web SDK) (within the feature scripts i.e. L6L.js, RRR10.js)
// 3. directly from Mini-App (Web SDK) (via GTM tags)

// Creating Mini App: See FullStackBasicTemplate > Project4v2 > 5.1.2
// Generating yml file for web-hosting: See FullStackBasicTemplate > Project4v2 > 5.1.3

// Related projects
// Android Studio > Dice Roller
// FullStackBasicTemplate > Project4v2 > 5.1.2, 5.1.3 onwards

// Terminal Commands to bundle and deploy mini-app
// Method 1: Deploy to Github Pages (web hosting)
remember to 'cd dice-roller-web' otherwise you will get terminal errors
// test (localhost:5173)
npm run dev
// bundle (5.1.2 only)
npm run build
// bundle (5.1.3)
// Github only generates one URL per repository. Since we have all our Vite projects in one all projects share that one URL so we go into .github/workflows/static.yml and change respective paths accordingly
// i.e. references to project name
working-directory: dice-roller-web
working-directory: dice-roller-web
path: dice-roller-web/dist
// Github > Vite > Settings > Pages > get URL
// https://github.com/jsss999/Vite/settings/pages
// set url in webView.loadUrl(url) to this URL in MainActivity.kt (DiceRoller)

// Method 2: Simulate deploying mini-app to a local server (5.6)
// first build the bundle
cd dice-roller-web
npm run build
// start up a local web server which serves (hosts) your dist folder
npx serve dist
// create a new terminal and expose the server to any device on the same network (server URL: localhost:5173)
cd dice-roller-web
npm run dev -- --host
// devices (physical or virtual) cannot reach local server at its localhost address so we need to expose it publicly
// in a new terminal create a public URL to the local server so any device (on external/remote networks) can access it
npx tmole 5173
// this generates URLs which should be loaded in the Android app (MainActivity.kt) as the url (i.e. webView.loadUrl(url))
https://i4kwfk-ip-170-85-64-117.tunnelmole.net
http://i4kwfk-ip-170-85-64-117.tunnelmole.net  <-- always use http to avoid annoying errors
// set url in webView.loadUrl(url) to this URL in MainActivity.kt (DiceRoller)

// Triggering
// RRR10 - If you roll 3 times (event: dice_roll) in a 10 second period an event will fire. This can only happen once per log-in (event: log_event)
// L6L - If you hit log-in (log_event) then roll a six (dice_roll) then hit log-in again (log_event)

// /src/features contains the aggregation functions that can send the custom real-time triggers to Optimove Event Collection by
    1. send back to native Android app (via web hosting) which uses Mobile SDK (comment/uncomment code in L6L/RRR10)
    2. send directly to Optimove via GTM web SDK (no need for web hosting) (comment/uncomment code in L6L/RRR10)
    3. build the aggregation functions in GTM instead by adding GTM tags to index.html and push the native app events to the dataLayer (sendEventMA.js)
        // NB: (optional) if we build aggregation functions in GTM we should disable /feature/XXX.js to avoid double send out. See instructions in those .js files
// options 2 and 3 can both be demonstrated using Methods 1 and 2 above