const express = require("express");

const router = express.Router();

// CONTROLLERS
const {
  deleteSpecificFile,
  deleteAllFiles,
  deleteGuestTransferRecords,
} = require("../controllers/DeleteFiles");

router.get("/delete/:code", deleteSpecificFile);

router.get("/all-files", deleteAllFiles);

router.get("/delete-guest-transfers", deleteGuestTransferRecords);

module.exports = router;
