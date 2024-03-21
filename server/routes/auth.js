const express = require("express");
const router = express.Router();

// CONTROLLERS
const { SignUpUser, loginUser } = require("../controllers/auth");

// ROUTES
router.post("/add-user", SignUpUser);
router.post("/log-in-user", loginUser);

module.exports = router;
