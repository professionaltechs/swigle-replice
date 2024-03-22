const userModel = require("../models/auth");
var jwt = require("jsonwebtoken");

const SignUpUser = async (req, res) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      username,
      address,
      city,
      state,
      postalCode,
      country,
      phoneNumber,
      subscriptionType,
      accountStatus,
      emailStatus,
    } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send({ success: false, message: "User already exists." });
    }
    const user = new userModel({
      email,
      password,
      firstName,
      lastName,
      username,
      address,
      city,
      state,
      postalCode,
      country,
      phoneNumber,
      subscriptionType,
      accountStatus,
      emailStatus,
    });
    await user.save();
    res.send({ success: true, message: "User registered successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while adding the user.");
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.send({ success: false, message: "Invalid credentials" });
    }
    var token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        subscriptionType: user.subscriptionType,
      },
      "shhhhh",
    );
    res.status(200).send({
      success: true,
      user: {
        email: user.email,
        token,
      },
      message: "User logged in successfully.",
    });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "Error in login" });
  }
};

module.exports = { SignUpUser, loginUser };
