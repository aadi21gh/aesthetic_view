// backend/routes/chat.js
const express = require("express");
const router = express.Router();

// Predefined Q&A
const qa = [
  { question: "Hi", answer: "Hey! How are you?" },
  { question: "Hello", answer: "Hello there! 😎" },
  {
    question: "How do I use the app?",
    answer: "Explore states, festivals, hotels, and take the travel quiz!",
  },
  { question: "Thank you", answer: "You're welcome! Have a great trip! 🌟" },
  { question: "Bye", answer: "See you soon! 👋" },
];

// POST /api/chat
router.post("/", (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ reply: "Message is required" });

  const found = qa.find((q) => q.question.toLowerCase() === message.toLowerCase());
  const reply = found ? found.answer : "Sorry, I don't understand that yet.";

  res.json({ reply });
});

module.exports = router;
