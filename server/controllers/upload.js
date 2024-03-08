const fs = require("fs");
const archiver = require("archiver");
const multer = require("multer");

// HELPERS
const { createZip, deleteTempFiles } = require("../helpers/upload");

// MULTER
const upload = require("../config/multer");

// UPLOAD FOLDER LOCATION
const path = require("../uploads/details");

// DB
const tempDp = require("../db/temp");

const uploadFiles = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("An error occurred while uploading files.");
    }
    createZip(req.files)
      .then((zipFileName) => {
        const code = Math.floor(100000 + Math.random() * 900000);
        tempDp.push({ fileName: zipFileName, code });
        const fileNames = req.files.map((file) => file.filename);
        deleteTempFiles(fileNames);
        res.send({
          success: true,
          message: "Files uploaded successfully.",
          file: { fileName: zipFileName, code },
        });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .send("An error occurred while creating the ZIP folder.");
      });
  });
};

const downloadFiles = (req, res) => {
  const code = req.params.code;
  const file = tempDp.find((file) => file.code == code);
  if (file?.fileName) {
    const filePath = path + file.fileName;
    if (fs.existsSync(filePath)) {
      res.download(filePath);
    } else {
      res.status(404).send({ success: false, message: "File not found." });
    }
  } else {
    return res.status(500).send({ success: false, message: "Invalid code" });
  }
};

module.exports = { uploadFiles, downloadFiles };
