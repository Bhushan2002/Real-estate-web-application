const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Not Authenticated!" });

  jwt.verify(token, "SecRET", async (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid." });
    }
    req.userId = payload.id;
    next();
  });
};

module.exports = verifyToken;