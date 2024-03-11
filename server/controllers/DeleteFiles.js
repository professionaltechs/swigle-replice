const fileRecord = require("../models/filesRecord");
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
  const reposnse = await fileRecord.deleteMany({ fileCode: { $exists: true } });
  const folderPath = __dirname + `/../uploads/`;
  let zipFiles = [];
  fs.readdir(folderPath, async (err, files) => {
    files.forEach((file) => {
      if (file.includes(".zip")) {
        zipFiles.push(file);
      }
    });
    zipFiles.forEach((zipFile) => {
      fs.unlinkSync(folderPath + zipFile);
    });
  });
  res.send({ success: true, message: "All files deleted successfully" });
};

module.exports = { deleteSpecificFile, deleteAllFiles };
