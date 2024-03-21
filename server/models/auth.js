const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postalCode: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
  },
  subscriptionType: {
    type: Number,
    default: 0,
  },
  accountStatus: {
    type: Boolean,
    default: true,
  },
  emailStatus: {
    type: Boolean,
    default: true,
  },
  transfers: {
    type: Array,
    default: [],
  },
});

const user = mongoose.model("user", userSchema);
module.exports = user;
