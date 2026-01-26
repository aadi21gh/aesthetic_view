const express = require("express");
const router = express.Router();
const guides = require("../data/guides.json");

// GET ALL GUIDES
router.get("/", (req, res) => {
  res.json(guides);
});

// GET GUIDES BY STATE
router.get("/state/:stateName", (req, res) => {
  const list = guides.filter(
    (g) => g.state.toLowerCase() === req.params.stateName.toLowerCase()
  );

  res.json(list);
});

// GET GUIDE BY ID
router.get("/:id", (req, res) => {
  const guide = guides.find((g) => g.id == req.params.id);

  if (!guide) {
    return res.status(404).json({ message: "Guide not found" });
  }

  res.json(guide);
});

module.exports = router;
