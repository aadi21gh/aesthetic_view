const express = require("express");
const router = express.Router();
const bookings = require("../data/bookings.json");

// GET ALL BOOKINGS
router.get("/", (req, res) => {
  res.json(bookings);
});

// GET BOOKINGS BY USER ID
router.get("/user/:userId", (req, res) => {
  const list = bookings.filter((b) => b.userId == req.params.userId);

  res.json(list);
});

module.exports = router;
