const express = require("express");
const router = express.Router();
const festivals = require("../data/festivals.json");

// GET ALL FESTIVALS
router.get("/", (req, res) => {
  res.json(festivals);
});

// GET FESTIVAL BY ID
router.get("/:id", (req, res) => {
  const fest = festivals.find((f) => f.id == req.params.id);

  if (!fest) {
    return res.status(404).json({ message: "Festival not found" });
  }

  res.json(fest);
});

module.exports = router;
