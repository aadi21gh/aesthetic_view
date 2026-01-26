const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/topAttractions.json");

// Get all attractions
const getAllAttractions = (req, res) => {
  try {
    const attractions = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    res.json(attractions);
  } catch (err) {
    res.status(500).json({ message: "Error reading attractions data." });
  }
};

// Get attractions by state
const getAttractionsByState = (req, res) => {
  try {
    const state = req.params.state;
    const attractions = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    const filtered = attractions.filter(
      (a) => a.state.toLowerCase() === state.toLowerCase()
    );
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ message: "Error reading attractions data." });
  }
};

module.exports = { getAllAttractions, getAttractionsByState };
