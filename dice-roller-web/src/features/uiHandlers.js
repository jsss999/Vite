// /src/features/uiHandlers.js
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("myCustom")?.addEventListener("click", function () {
        addEvent({
            event: "gtm_button_click",
            payload: {
                custom: this.getAttribute("data-custom")
            }
        });
    });
});