const express = require("express");
const router = express.Router();

// CONTROLLERS
const { uploadFiles, downloadFiles } = require("../controllers/upload");

// ROUTES
router.post("/uploadFiles", uploadFiles);

router.get("/download/:code", downloadFiles);

module.exports = router;
