// Middleware d'authentification via JWT

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Token manquant");

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ error: "Requête non authentifiée", details: error.message });
  }
};
