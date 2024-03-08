const express = require("express");
const router = express.Router();

// CONTROLLER
const { uploadFiles, downloadFiles } = require("../controllers/upload");

// MULTER
const upload = require("../config/multer");

router.post("/uploadFiles", 
// upload, 
uploadFiles);

router.get("/download/:code", downloadFiles);

module.exports = router;
