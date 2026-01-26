// backend/routes/travelQuiz.js
const express = require("express");
const router = express.Router();

// 🔥 Define the mapping of answers to destinations
const recommendations = [
  {
    criteria: ["Mountain", "Monuments", "Antique"],
    destination: "Raigad Fort",
    description: "A historical fort with breathtaking mountain views.",
    image: "https://source.unsplash.com/400x300/?fort,mountains",
  },
  {
    criteria: ["Beach", "Relaxation", "Luxurious"],
    destination: "Goa Beaches",
    description: "Relax on the sunny beaches of Goa in luxury resorts.",
    image: "https://source.unsplash.com/400x300/?beach,resort",
  },
  {
    criteria: ["City", "Monuments", "Luxurious"],
    destination: "Jaipur Palace Tour",
    description: "Explore palaces and heritage sites with comfort.",
    image: "https://source.unsplash.com/400x300/?palace,india",
  },
  {
    criteria: ["Countryside", "Greenery", "Offbeat"],
    destination: "Coorg",
    description: "Lush landscapes, coffee plantations, and hidden gems.",
    image: "https://source.unsplash.com/400x300/?coorg,coffee",
  },
  // Add more destinations here
];

// 🔥 POST route to get recommendation
router.post("/", (req, res) => {
  const { answers } = req.body; // answers = ["Mountain","Monuments","Antique"]

  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ error: "Invalid answers format" });
  }

  const matched = recommendations.find((rec) =>
    rec.criteria.every((c) => answers.includes(c))
  );

  if (matched) {
    return res.json({ success: true, result: matched });
  } else {
    return res.json({
      success: true,
      result: {
        destination: "No match found",
        description: "Try different combinations of choices!",
        image: null,
      },
    });
  }
});

module.exports = router;
