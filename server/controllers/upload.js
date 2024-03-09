const fs = require("fs");
const upload = require("../config/multer");
const formidable = require("formidable");

// HELPERS
const {
  createZip,
  deleteTempFiles,
  // deleteUploadedFiles,
} = require("../helpers/upload");

// UPLOAD FOLDER LOCATION
const path = require("../uploads/details");

// DB
const fileRecord = require("../models/filesRecord");
const tempDp = require("../db/temp");

const uploadFiles = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("An error occurred while uploading files.");
    }
    createZip(req.files)
      .then(async (zipFileName) => {
        const fileNames = req.files.map((file) => file.filename);
        deleteTempFiles(fileNames);
        const code = Math.floor(100000 + Math.random() * 900000);
        const fileData = new fileRecord({
          fileName: zipFileName,
          fileCode: code,
          deleteDocument: new Date(),
        });
        await fileData.save();
        // deleteUploadedFiles(zipFileName);
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

const downloadFiles = async (req, res) => {
  const code = req.params.code;
  const file = await fileRecord.findOne({ fileCode: code });
  if (file?.fileName) {
    const filePath = path + file.fileName;
    if (fs.existsSync(filePath)) {
      res.download(filePath);
    } else {
      res.status(200).send({ success: false, message: "File not found." });
    }
  } else {
    return res.status(200).send({ success: false, message: "Invalid code" });
  }
};

module.exports = { uploadFiles, downloadFiles };
