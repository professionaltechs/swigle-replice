const express = require("express");
const router = express.Router();

// CONTROLLERS
const {
  createSubscription,
  getSubscriptionDetails,
  getSpecificSubscriptionDetails
} = require("../controllers/subscription");

// ROUTES
router.post("/createSubscription", createSubscription);

router.get("/getSubscriptionDetails", getSubscriptionDetails);

router.get("/getSubscriptionDetails/:subscriptionType", getSpecificSubscriptionDetails);

module.exports = router;
