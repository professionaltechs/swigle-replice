const fs = require("fs");
const archiver = require("archiver");

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
      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).send("An error occurred while reading the file.");
        } else {
          res.setHeader("Content-Type", "application/zip");
          res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + file.fileName
          );
          res.send(data);
        }
      });
    } else {
      res.status(404).send("File not found.");
    }
  } else {
    return res.send({ message: "Invalid code" });
  }
};

module.exports = { uploadFiles, downloadFiles };
