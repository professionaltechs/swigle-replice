const mongoose = require("mongoose");
const { Schema } = mongoose;

const userTransferSchema = new Schema({
  transferNumber: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
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
  transferredStatus: {
    type: Boolean,
    default: false,
  },
});

const userTransfer = mongoose.model("userTransfer", userTransferSchema);
module.exports = userTransfer;
