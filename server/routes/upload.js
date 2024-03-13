const express = require("express");
const router = express.Router();

// CONTROLLERS
const { uploadFiles, downloadFiles,recieveFileNames, downloadSIngleFile } = require("../controllers/upload");

// ROUTES
router.post("/uploadFiles", uploadFiles);

router.get("/download/:code", downloadFiles);

router.get("/recieveFileNames/:code",recieveFileNames);

router.get("/downloadSingleFile/:fileName", downloadSIngleFile);

module.exports = router;
