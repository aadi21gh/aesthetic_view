const app = require("./index");

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`AestheticView backend running on http://localhost:${PORT}`);
});

