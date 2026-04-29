// /src/features/diceRules.js
import { eventBus } from "../events/eventBus";
let diceRolls = [];
function handleDiceRoll(event) {
    diceRolls.push(event);
    if (diceRolls.length > 3) {
        diceRolls.shift();
    }
    if (diceRolls.length === 3) {
        window.sendEventMA({
            event: "three_dice_rolls",
            count: 3
        });
    }
}
eventBus.on("dice_rolled", handleDiceRoll);