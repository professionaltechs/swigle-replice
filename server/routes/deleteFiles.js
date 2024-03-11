const express = require("express");

const router = express.Router();

// CONTROLLERS
const {
  deleteSpecificFile,
  deleteAllFiles,
} = require("../controllers/DeleteFiles");

router.get("/delete/:code", deleteSpecificFile);

router.get("/all-files", deleteAllFiles);

module.exports = router;
