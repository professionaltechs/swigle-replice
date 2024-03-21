const mongoose = require("mongoose");
const { Schema } = mongoose;

const guestTransferSchema = new Schema({
  transferNumber: {
    type: String,
    required: true,
    unique: true,
  },
  guestIp: {
    type: String,
    // required: true,
  },
  transferredAt: {
    type: String,
    required: true,
  },
  expiryAt: {
    type: String,
    required: true,
  },
  storageType: {
    type: String,
    default: "local Storage",
  },
});

const guestTransfer = mongoose.model("guestTransfer", guestTransferSchema);
module.exports = guestTransfer;
