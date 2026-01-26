const express = require("express");
const router = express.Router();
const states = require("../data/states.json");

// GET ALL STATES
router.get("/", (req, res) => {
  res.json(states);
});

// GET STATE BY ID
router.get("/:id", (req, res) => {
  const state = states.find((s) => s.id == req.params.id);

  if (!state) {
    return res.status(404).json({ message: "State not found" });
  }

  res.json(state);
});

module.exports = router;
