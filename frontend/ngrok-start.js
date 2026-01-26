import ngrok from "ngrok";

(async function() {
  try {
    const url = await ngrok.connect({
      addr: 5173,                 // Vite dev server port
      proto: "http",
      name: `vite-${Date.now()}`  // Unique tunnel every run
    });
    console.log("Ngrok running at:", url);
  } catch (err) {
    console.error("❌ Error starting ngrok:", err);
  }
})();
