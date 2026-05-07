// /src/features/uiHandlers.js
import { addEvent } from "../storage/eventStorage";
document.getElementById("myCustom")?.addEventListener("click", function () {
    addEvent({
        event: "gtm_button_click",
        payload: {
            custom: this.getAttribute("data-custom")
        }
    });
});