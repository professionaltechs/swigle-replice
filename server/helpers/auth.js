const jwt = require("jsonwebtoken");

const tokenVerification = async (token) => {
  return jwt.verify(token, "shhhhh", function (err, decoded) {
    if (err) return null;
    return decoded;
  });
};

module.exports = { tokenVerification };
