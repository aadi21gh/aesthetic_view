const guides = require("../data/guides.json");

// GET ALL GUIDES
exports.getGuides = (req, res) => {
  res.json(guides);
};

// GET GUIDES BY STATE
exports.getGuidesByState = (req, res) => {
  const stateName = req.params.stateName.toLowerCase();

  const result = guides.filter(
    (g) => g.state.toLowerCase() === stateName
  );

  res.json(result);
};

// GET GUIDE BY ID
exports.getGuideById = (req, res) => {
  const guide = guides.find((g) => g.id == req.params.id);

  if (!guide) {
    return res.status(404).json({ message: "Guide not found" });
  }

  res.json(guide);
};
