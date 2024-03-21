const userModel = require("../models/auth");

const getAllUsersList = async (req, res) => {
  try {
    const { pageNumber } = req.params;
    const users = await userModel
      .find({}, { email: 1, username: 1, emailStatus: 1, phoneNumber: 1 })
      .skip((pageNumber - 1) * 10)
      .limit(10);
    const activeUsers = await userModel.countDocuments({accountStatus : {$eq : true}});
    const bannedUsers = await userModel.countDocuments({accountStatus : {$eq : false}});
    res.send({ success: true, activeUsers, bannedUsers, users });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "Error in fetching users List" });
  }
};

const getSingleUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findOne({ _id: userId });
    res.send({ success: true, user });
  } catch (error) {
    console.log(error);
    res.send("Error in fetching specific user details");
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;
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
      emailStatus,
      accountStatus,
    } = req.body;
    const user = await userModel.findOneAndUpdate(
      { _id: userId },
      {
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
        emailStatus,
        accountStatus,
      },
      { new: true }
    );
    res.send({
      success: true,
      message: "User details updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "Error in fetching user details" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await userModel.deleteOne({ _id: userId });
    res.send({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "Error in deleting user" });
  }
};

module.exports = {
  getAllUsersList,
  deleteUser,
  updateUserDetails,
  getSingleUserDetails,
};
