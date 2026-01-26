const festivals = require("../data/festivals.json");

// GET ALL FESTIVALS
exports.getFestivals = (req, res) => {
  res.json(festivals);
};

// GET FESTIVAL BY ID
exports.getFestivalById = (req, res) => {
  const fest = festivals.find((f) => f.id == req.params.id);

  if (!fest) {
    return res.status(404).json({ message: "Festival not found" });
  }

  res.json(fest);
};
