require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

// ROUTES
const authRoutes = require("./routes/auth");
const stateRoutes = require("./routes/states");
const festivalRoutes = require("./routes/festivals");
const hotelRoutes = require("./routes/hotels");
const guideRoutes = require("./routes/guides");
const bookingRoutes = require("./routes/booking");
const attractionRoutes = require("./routes/attractions");
const chatRouter = require("./routes/chat");
const travelQuizRouter = require("./routes/travelQuiz");
const aiPlannerRouter = require("./routes/aiPlanner");
const wishlistRouter = require("./routes/wishlist");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(logger);

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/states", stateRoutes);
app.use("/api/festivals", festivalRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/guides", guideRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/attractions", attractionRoutes);
app.use("/api/chat", chatRouter);
app.use("/api/travel-quiz", travelQuizRouter);
app.use("/api/ai", aiPlannerRouter);
app.use("/api/wishlist", wishlistRouter);

// HEALTH CHECK
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "AestheticView API is running", version: "2.0.0" });
});

// ERROR HANDLER (must be last)
app.use(errorHandler);

module.exports = app;
