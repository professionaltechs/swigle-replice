const express = require("express");
const router = express.Router();

// HELPERS
const tokenVerification = require("../helpers/auth")

// CONTROLLERS
const {
  getAllUsersList,
  deleteUser,
  updateUserDetails,
  getSingleUserDetails,
  getSingleUserSubscriptionDetails
} = require("../controllers/user");

// ROUTES
router.get("/get-all-users/:pageNumber", getAllUsersList);

router.get("/get-user-details/:userId", getSingleUserDetails);

router.get("/get-user-subscription-details", getSingleUserSubscriptionDetails);

router.patch("/update-user/:userId", updateUserDetails);

router.delete("/delete-user/:userId", deleteUser);

module.exports = router;
