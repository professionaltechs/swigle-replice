const mongoose = require("mongoose");
const { Schema } = mongoose;

const subscriptionSchema = new Schema({
  subscriptionType: {
    type: Number,
    required: true,
    unique: true,
  },
  subscriptionName: {
    type: String,
    required: true,
  },
  subscriptionPrice: {
    type: Number,
    required: true,
  },
  storageSpace: {
    type: Number,
    required: true,
  },
  sizePerTransfer: {
    type: Number,
    required: true,
  },
  expiryTime: {
    type: Number,
    required: true,
  },
});

const subscriptionModel = mongoose.model("subscription", subscriptionSchema);
module.exports = subscriptionModel;
