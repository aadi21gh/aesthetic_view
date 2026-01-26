const express = require("express");
const router = express.Router();
const users = require("../data/users.json");

// SIGNUP
router.post("/signup", (req, res) => {
  const { name, email, password, phone } = req.body;

  const exists = users.find((u) => u.email === email);
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    phone
  };

  users.push(newUser);

  return res.status(201).json({ message: "Signup successful", user: newUser });
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const found = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!found) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  return res.json({ message: "Login successful", user: found });
});

module.exports = router;
