const express = require("express");
const router = express.Router();

// HELPERS
const { tokenVerification } = require("../helpers/auth");

// CONTROLLERS
const {
  uploadFiles,
  downloadFiles,
  recieveFileNames,
  downloadSIngleFile,
} = require("../controllers/upload");

// ROUTES
router.post("/uploadFiles", tokenVerification, uploadFiles);

router.get("/download/:code", downloadFiles);

router.get("/recieveFileNames/:code", recieveFileNames);

router.get("/downloadSingleFile/:fileName", downloadSIngleFile);

module.exports = router;
