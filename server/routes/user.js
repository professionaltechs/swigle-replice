const express = require("express");
const router = express.Router();

// CONTROLLERS
const {
  getAllUsersList,
  deleteUser,
  updateUserDetails,
  getSingleUserDetails,
} = require("../controllers/user");

// ROUTES
router.get("/get-all-users/:pageNumber", getAllUsersList);

router.get("/get-user-details/:userId", getSingleUserDetails);

router.patch("/update-user/:userId", updateUserDetails);

router.delete("/delete-user/:userId", deleteUser);

module.exports = router;
