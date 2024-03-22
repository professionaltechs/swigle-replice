const jwt = require("jsonwebtoken");

const tokenVerification = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (token) {
      const decode = await jwt.verify(token, "shhhhh");
      req.user = decode;
    }
    next();
  } catch (error) {
    return res.send({ success: false, message: "Invalid Token" });
  }
};

module.exports = { tokenVerification };
