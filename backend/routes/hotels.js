const express = require("express");
const router = express.Router();
const hotels = require("../data/hotels.json");

// GET ALL HOTELS
router.get("/", (req, res) => {
  res.json(hotels);
});

// GET HOTELS BY STATE
router.get("/state/:stateName", (req, res) => {
  const list = hotels.filter(
    (h) => h.state.toLowerCase() === req.params.stateName.toLowerCase()
  );

  res.json(list);
});

// GET HOTEL BY ID
router.get("/:id", (req, res) => {
  const hotel = hotels.find((h) => h.id == req.params.id);

  if (!hotel) {
    return res.status(404).json({ message: "Hotel not found" });
  }

  res.json(hotel);
});

module.exports = router;
