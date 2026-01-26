const express = require("express");
const router = express.Router();
const { getAllAttractions, getAttractionsByState } = require("../controllers/attractionsController");

// GET all attractions
router.get("/", getAllAttractions);

// GET attractions by state
router.get("/:state", getAttractionsByState);

module.exports = router;
