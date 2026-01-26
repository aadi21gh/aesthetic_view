const users = require("../data/users.json");

const authMiddleware = (req, res, next) => {
  const { email, password } = req.headers;

  if (!email || !password) {
    return res.status(401).json({ message: "Missing credentials" });
  }

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Unauthorized user" });
  }

  req.user = user; // store data for later use
  next();
};

module.exports = authMiddleware;
