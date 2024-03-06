const express = require("express");
const router = express.Router();

// CONTROLLER
const { uploadFiles } = require("../controllers/upload");

// MULTER
const upload = require("../config/multer");

router.post("/", upload.array("files", 12), uploadFiles);

module.exports = router;
