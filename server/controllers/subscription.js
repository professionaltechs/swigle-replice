const subscriptionModel = require("../models/subscription");

const createSubscription = async (req, res) => {
  try {
    const {
      subscriptionName,
      subscriptionPrice,
      storageSpace,
      sizePerTransfer,
      expiryTime,
    } = req.body;
    const subscriptionType = await subscriptionModel.countDocuments();
    const newSubscription = new subscriptionModel({
      subscriptionType,
      subscriptionName,
      subscriptionPrice,
      storageSpace,
      sizePerTransfer,
      expiryTime,
    });
    await newSubscription.save();
    res.send({
      success: true,
      message: "Subscription created successfully.",
      newSubscription,
    });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "Error in creating subscription" });
  }
};

const getSubscriptionDetails = async (req, res) => {
  try {
    const subscriptionDetails = await subscriptionModel.find({});
    res.send({
      success: true,
      message: "Subscription details fetched successfully.",
      subscriptionDetails,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Error in fetching subscription details",
    });
  }
};

const getSpecificSubscriptionDetails = async (req, res) => {
  try {
    const { subscriptionType } = req.params;
    const subscriptionDetails = await subscriptionModel.findOne({
      subscriptionType,
    });
    if (!subscriptionDetails)
      return res.send({ success: false, message: "Subscription not found" });
    res.send({
      success: true,
      message: "Subscription details fetched successfully.",
      subscriptionDetails,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Error in fetching subscription details",
    });
  }
};

module.exports = {
  createSubscription,
  getSubscriptionDetails,
  getSpecificSubscriptionDetails,
};
