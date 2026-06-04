// ====================== /stop Override ======================
function setupStopOverride() {
    if (typeof ModAPI === "undefined" || !ModAPI.addEventListener) {
        console.log("[BetterEaglerForgeServer] ModAPI not ready yet, retrying in 1s...");
        setTimeout(setupStopOverride, 1000);
        return;
    }

    ModAPI.addEventListener("sendchatmessage", function(e) {
        const msg = (e.message || "").trim().toLowerCase();

        if (msg === "/stop" || msg === "stop" || msg.startsWith("/stop ")) {
            e.preventDefault = true;     // Block default /stop

            console.log("[BEFS] /stop intercepted → Starting delayed shutdown");

            // Optional: Announce to everyone
            if (ModAPI.sendChatMessage) {
                ModAPI.sendChatMessage("Server shutting down in 3 seconds...");
            }

            // Add delay (3000ms = 3 seconds)
            setTimeout(() => {
                if (ModAPI.executeCommand) {
                    ModAPI.executeCommand("/kick HOST Server Shutdown");
                } else if (ModAPI.sendChatMessage) {
                    ModAPI.sendChatMessage("/kick HOST Server Shutdown");
                }
                console.log("[BEFS] Delayed kick executed");
            }, 3000); // ← Change this number for different delay (in milliseconds)
        }
    });

    console.log("[BetterEaglerForgeServer] /stop override hooked successfully!");
}
