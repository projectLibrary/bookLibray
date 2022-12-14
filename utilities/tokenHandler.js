const jwt = require("jsonwebtoken");

module.exports.createToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
    algorithm: "HS256",
    audience: "http://localhost",
    issuer: "http://localhost",
  });
};

module.exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY, {
    audience: "http://localhost",
    issuer: "http://localhost",
  });
};
