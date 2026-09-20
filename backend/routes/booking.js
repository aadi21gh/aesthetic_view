// backend/routes/booking.js — Enhanced booking with voucher generation
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const bookingsPath = path.join(__dirname, "../data/bookings.json");
const readBookings = () => JSON.parse(fs.readFileSync(bookingsPath, "utf-8"));
const writeBookings = (data) => fs.writeFileSync(bookingsPath, JSON.stringify(data, null, 2), "utf-8");

// GET ALL BOOKINGS
router.get("/", (req, res) => {
  const bookings = readBookings();
  res.json(bookings);
});

// GET BOOKINGS BY USER ID
router.get("/user/:userId", (req, res) => {
  const bookings = readBookings();
  const list = bookings.filter((b) => String(b.userId) === String(req.params.userId));
  res.json(list);
});

// GET SINGLE BOOKING BY ID
router.get("/:id", (req, res) => {
  const bookings = readBookings();
  const booking = bookings.find(b => String(b.id) === String(req.params.id));
  if (!booking) return res.status(404).json({ error: "Booking not found." });
  res.json(booking);
});

// POST — Create new booking with voucher
router.post("/", (req, res) => {
  const { userId, type, itemId, itemName, checkIn, checkOut, date, guests, price, state } = req.body;

  if (!userId || !type || !itemId || !price) {
    return res.status(400).json({ error: "userId, type, itemId, and price are required." });
  }

  const bookings = readBookings();

  // Generate voucher ID
  const voucherId = `AV${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

  const newBooking = {
    id: Date.now(),
    voucherId,
    userId,
    type,         // "hotel" | "guide" | "festival" | "experience"
    itemId,
    itemName: itemName || "Cultural Experience",
    state: state || "",
    checkIn: checkIn || date,
    checkOut: checkOut || date,
    guests: guests || 1,
    price,
    taxes: Math.round(price * 0.12),
    totalAmount: Math.round(price * 1.12),
    status: "confirmed",
    bookedAt: new Date().toISOString(),
    notes: "",
  };

  bookings.push(newBooking);
  writeBookings(bookings);
  res.status(201).json({ success: true, booking: newBooking });
});

// PATCH — Update booking status (cancel / reschedule)
router.patch("/:id", (req, res) => {
  const bookings = readBookings();
  const idx = bookings.findIndex(b => String(b.id) === String(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Booking not found." });

  bookings[idx] = { ...bookings[idx], ...req.body, updatedAt: new Date().toISOString() };
  writeBookings(bookings);
  res.json({ success: true, booking: bookings[idx] });
});

// DELETE — Cancel booking
router.delete("/:id", (req, res) => {
  const bookings = readBookings();
  const updated = bookings.filter(b => String(b.id) !== String(req.params.id));
  writeBookings(updated);
  res.json({ success: true });
});

module.exports = router;
