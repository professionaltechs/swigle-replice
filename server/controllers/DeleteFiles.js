const fileRecord = require("../models/filesRecord");
const guestTransfer = require("../models/guesTransfer");
const fs = require("fs");

const deleteSpecificFile = async (req, res) => {
  const code = req.params.code;
  const file = await fileRecord.findOne({ fileCode: code });
  if (file) {
    await fileRecord.deleteOne({ fileCode: code });
    const filePath = __dirname + `/../uploads/${file?.fileName}`;
    fs.unlinkSync(filePath);
    res.send({
      success: true,
      message: "File deleted successfully",
    });
  } else {
    res.status(404).send("File not found");
  }
};

const deleteAllFiles = async (req, res) => {
  try {
    await fileRecord.deleteMany({
      fileCode: { $exists: true },
    });
    res.send({ success: true, message: "All files deleted successfully" });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "Error deleting all files" });
  }
};

const deleteGuestTransferRecords = async (req, res) => {
  try {
    await guestTransfer.deleteMany({});
    res.send({
      success: true,
      message: "Guest transfer records deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      message: "Error deleting guest transfer records",
    });
  }
};

module.exports = {
  deleteSpecificFile,
  deleteAllFiles,
  deleteGuestTransferRecords,
};
