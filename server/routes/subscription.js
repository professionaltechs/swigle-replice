const express = require("express");
const router = express.Router();

// HELPERS
const { tokenVerification } = require("../helpers/auth");

// CONTROLLERS
const {
  createSubscription,
  getSubscriptionDetails,
  getSpecificSubscriptionDetails,
} = require("../controllers/subscription");

// ROUTES
router.post("/createSubscription", createSubscription);

router.get("/getSubscriptionDetails", getSubscriptionDetails);

router.get(
  "/getSpecificSubscriptionDetails",
  tokenVerification,
  getSpecificSubscriptionDetails
);

module.exports = router;
