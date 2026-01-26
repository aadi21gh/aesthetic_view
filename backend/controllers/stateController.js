const states = require("../data/states.json");

// GET ALL STATES
exports.getStates = (req, res) => {
  res.json(states);
};

// GET STATE BY ID
exports.getStateById = (req, res) => {
  const state = states.find((s) => s.id == req.params.id);

  if (!state) {
    return res.status(404).json({ message: "State not found" });
  }

  res.json(state);
};
