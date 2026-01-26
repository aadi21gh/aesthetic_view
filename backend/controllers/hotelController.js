const hotels = require("../data/hotels.json");

// GET ALL HOTELS
exports.getHotels = (req, res) => {
  res.json(hotels);
};

// GET HOTELS BY STATE
exports.getHotelsByState = (req, res) => {
  const stateName = req.params.stateName.toLowerCase();

  const result = hotels.filter(
    (hotel) => hotel.state.toLowerCase() === stateName
  );

  res.json(result);
};

// GET HOTEL BY ID
exports.getHotelById = (req, res) => {
  const hotel = hotels.find((h) => h.id == req.params.id);

  if (!hotel) {
    return res.status(404).json({ message: "Hotel not found" });
  }

  res.json(hotel);
};
