// backend/routes/wishlist.js — Save & retrieve user wishlists
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const wishlistPath = path.join(__dirname, "../data/wishlist.json");

// Ensure wishlist.json exists
if (!fs.existsSync(wishlistPath)) {
  fs.writeFileSync(wishlistPath, "[]", "utf-8");
}

const readWishlist = () => JSON.parse(fs.readFileSync(wishlistPath, "utf-8"));
const writeWishlist = (data) => fs.writeFileSync(wishlistPath, JSON.stringify(data, null, 2), "utf-8");

// GET /api/wishlist/:userId
router.get("/:userId", (req, res) => {
  const wishlist = readWishlist();
  const userWishlist = wishlist.filter(w => String(w.userId) === String(req.params.userId));
  res.json(userWishlist);
});

// POST /api/wishlist — Add item
router.post("/", (req, res) => {
  const { userId, itemId, itemType, name, image, state } = req.body;
  if (!userId || !itemId || !itemType) {
    return res.status(400).json({ error: "userId, itemId, and itemType are required." });
  }

  const wishlist = readWishlist();
  const exists = wishlist.find(w => String(w.userId) === String(userId) && String(w.itemId) === String(itemId) && w.itemType === itemType);
  if (exists) {
    return res.status(409).json({ message: "Already in wishlist." });
  }

  const newItem = {
    id: Date.now(),
    userId,
    itemId,
    itemType,
    name,
    image,
    state,
    savedAt: new Date().toISOString(),
  };

  wishlist.push(newItem);
  writeWishlist(wishlist);
  res.status(201).json({ success: true, item: newItem });
});

// DELETE /api/wishlist/:userId/:itemId/:itemType — Remove item
router.delete("/:userId/:itemId/:itemType", (req, res) => {
  const { userId, itemId, itemType } = req.params;
  const wishlist = readWishlist();
  const updated = wishlist.filter(w =>
    !(String(w.userId) === String(userId) && String(w.itemId) === String(itemId) && w.itemType === itemType)
  );
  writeWishlist(updated);
  res.json({ success: true });
});

module.exports = router;
