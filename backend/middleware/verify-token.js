const Partner = require("../models/Partner")
const User = require("../models/User")

const jwt = require("jsonwebtoken");

const setPartner = (req, partner) => {
  req.partner = partner;
};

const setUser = (req, user) => {
  req.user = user;
}

const getPartner = (req) => req.partner;

const getUser = (req) => req.user;

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "token not found" });
    }
    console.log("extracted token", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded token", decoded)

    const partner = await Partner.findById(decoded._id)
    if (partner) {
      setPartner(req, partner)
      return next()
    }

    const user = await User.findById(decoded._id)
    if (user) {
      setUser(req, user)
      return next()
    }
    
  } catch (error) {
    console.error("token verification error backend", error);
    res.status(401).json({ error: "invalid authorization token." });
  }
}

module.exports = { verifyToken, getPartner, getUser };
