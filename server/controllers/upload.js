const fs = require("fs");
const upload = require("../config/multer");
const { v4: uuidv4 } = require("uuid");

// HELPERS
const { createZip, deleteUploadedFiles } = require("../helpers/upload");

// UPLOAD FOLDER LOCATION
const { uploadFilesLocation } = require("../uploads/details");

// DB
const fileRecord = require("../models/filesRecord");
const guestTransfer = require("../models/guesTransfer");
const subscription = require("../models/subscription");
const auth = require("../models/auth");
const tempDp = require("../db/temp");

// ROUTES

// UPLOAD FILES
const uploadFiles = (req, res) => {
  try {
    const uploadTime = Date.now();
    let expiryTime = 1000 * 60 * 1;

    upload(req, res, async (err) => {
      if (req.user) {
        const tokenResponse = req.user;
        const subscriptionType = (
          await auth.findOne(
            { email: tokenResponse.email },
            { subscriptionType: 1 }
          )
        ).subscriptionType;
        const subscriptionDetails = await subscription.findOne({
          subscriptionType,
        });
        expiryTime = subscriptionDetails.expiryTime;
      }
      const deleteTime = uploadTime + expiryTime;
      const transferType = req.body.transferType;
      if (err) {
        console.error(err);
        return res.status(500).send("An error occurred while uploading files.");
      }
      const fileNames = req.files.map((file) => file.filename);
      const code = uuidv4().substring(0, 6);
      const fileData = new fileRecord({
        fileName: fileNames,
        transferredTime: new Date(uploadTime).toLocaleString(),
        deleteTime: new Date(deleteTime).toLocaleString(),
        fileCode: code,
        isLink: transferType == 1,
      });
      await fileData.save();
      deleteUploadedFiles(fileNames, code, expiryTime);
      const transferId = "id" + uuidv4().substring(0, 16);
      if (!req.body.token) {
        const transferData = new guestTransfer({
          transferNumber: transferId,
          guestIp: req.ip,
          transferredAt: new Date(uploadTime).toLocaleString(),
          expiryAt: new Date(deleteTime).toLocaleString(),
        });
        await transferData.save();
      }
      if (transferType == 0) {
        return res.send({
          success: true,
          message: "Files uploaded successfully.",
          file: {
            fileName: fileNames,
            code,
            expiryTime: new Date(deleteTime).toLocaleString(),
          },
        });
      } else if (transferType == 1) {
        return res.send({
          success: true,
          message: "Files uploaded successfully.",
          file: {
            fileName: fileNames,
            link: code,
            expiryTime: new Date(deleteTime).toLocaleString(),
          },
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Error occurred while uploading files.",
    });
  }
};

// DOWNLOAD ZIP FILE
const downloadFiles = async (req, res) => {
  try {
    const code = req.params.code;
    const file = await fileRecord.findOne({ fileCode: code });
    if (!file) return res.send({ success: false, message: "Invalid code" });
    const fileNames = file?.fileName;

    for (let i = 0; i < fileNames.length; i++) {
      const filePath = uploadFilesLocation + file.fileName[i];
      if (!fs.existsSync(filePath))
        return res
          .status(200)
          .send({ success: false, message: "File not found." });
    }
    createZip(fileNames)
      .then(async (zipFileName) => {
        const filePath = uploadFilesLocation + zipFileName;
        if (fs.existsSync(filePath)) {
          const fileSize = fs.statSync(filePath).size;
          const readStream = fs.createReadStream(filePath);

          res.set({
            "Content-Type": "application/octet-stream",
            "Content-Disposition": `attachment; filename="${file.fileName}"`,
            "Content-Length": fileSize,
          });

          let bytesSent = 0;

          readStream.on("data", (chunk) => {
            bytesSent += chunk.length;
            const progress = (bytesSent / fileSize) * 100;
            res.write(chunk);
          });

          readStream.on("end", () => {
            fs.unlink(filePath, async (err) => {
              if (err) {
                console.error("Error deleting zip file:", err);
              } else {
                console.log("zip File deleted successfully");
                res.end();
              }
            });
            res.end();
          });
          readStream.on("error", (err) => {
            console.error("Error streaming file:", err);
            res
              .status(500)
              .send({ success: false, message: "Error streaming file" });
          });
        } else {
          res.status(200).send({ success: false, message: "File not found." });
        }
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .send("An error occurred while creating the ZIP folder.");
      });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Error occurred while downloading files.",
    });
  }
};

// RECIEVE FILE NAMES
const recieveFileNames = async (req, res) => {
  try {
    const code = req.params.code;
    const file = await fileRecord.findOne({ fileCode: code, isLink: true });
    if (!file) return res.send({ success: false, message: "Files not found" });
    res.send({
      success: true,
      message: "Files found",
      filesList: file?.fileName,
    });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "Error in recieving file names" });
  }
};

// DOWNLOAD SINGLE FILE
const downloadSIngleFile = async (req, res) => {
  try {
    const fileName = req.params.fileName;
    const filePath = uploadFilesLocation + fileName;
    if (fs.existsSync(filePath)) {
      const readStream = fs.createReadStream(filePath);
      const fileSize = fs.statSync(filePath).size;
      res.set({
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Length": fileSize,
      });
      readStream.pipe(res);
      // let bytesSent = 0;

      // readStream.on("data", (chunk) => {
      //   bytesSent += chunk.length;
      //   const progress = (bytesSent / fileSize) * 100;
      //   res.write(chunk);
      // });

      // readStream.on("end", () => {
      //   res.end();
      // });
      // readStream.on("error", (err) => {
      //   console.error("Error streaming file:", err);
      //   res
      //     .status(500)
      //     .send({ success: false, message: "Error streaming file" });
      // });
    }
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "Error in downloading file" });
  }
};

module.exports = {
  uploadFiles,
  downloadFiles,
  recieveFileNames,
  downloadSIngleFile,
};
