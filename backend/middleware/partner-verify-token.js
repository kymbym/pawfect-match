const jwt = require("jsonwebtoken");

const setPartner = (req, partner) => {
  req.partner = partner;
};

const getPartner = (req) => req.partner;

function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if(!token) {
      return res.status(401).json({ error: "token not found" })
    }
    console.log("extracted token", token)

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded token", decoded)
    
    setPartner(req, decoded);
    next();
  } catch (error) {
    console.error("token verification error backend", error)
    res.status(401).json({ error: "invalid authorization token." });
  }
}

module.exports = { verifyToken, getPartner };
