const jwt = require("jsonwebtoken");

const setPartner = (req, partner) => {
  req.partner = partner;
};

const getPartner = (req) => req.partner;

function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    setPartner(req, decoded);
    next();
  } catch (error) {
    res.status(401).json({ error: "invalid authorization token." });
  }
}

module.exports = { verifyToken, getPartner };
