
// Creating Mini App: See FullStackBasicTemplate > Project4v2 > 5.1.2
// Generating yml file for web-hosting: See FullStackBasicTemplate > Project4v2 > 5.1.3

// Related projects
// Android Studio > Dice Roller
// FullStackBasicTemplate > Project4v2 > 5.1.2 and 5.1.3

// Commands
// remember to 'cd dice-roller-web' otherwise you will get terminal errors
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