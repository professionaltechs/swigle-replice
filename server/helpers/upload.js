const fs = require("fs");
const archiver = require("archiver");
const rimraf = require("rimraf");
const uploadFolder = require("../uploads/details");
const fileRecord = require("../models/filesRecord");

// UPLOAD FOLDER LOCATION
const path = require("../uploads/details");
const { deleteTime } = require("../uploads/details");

function createZip(files) {
  return new Promise((resolve, reject) => {
    const zipName = Date.now().valueOf();
    const zipPath = `uploads/${zipName}.zip`;
    const output = fs.createWriteStream(zipPath);
    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    output.on("close", () => {
      console.log(archive.pointer() + " total bytes");
      console.log(
        "archiver has been finalized and the output file descriptor has closed."
      );
      resolve(zipName + ".zip");
    });

    archive.on('progress', (progress) => {
      console.log(`Progress: ${progress.entries.processed}/${progress.entries.total} files processed`);
  });

    archive.on("error", (err) => {
      reject(err);
    });

    archive.pipe(output);

    files.forEach((file) => {
      archive.append(fs.createReadStream(path + file), {
        name: file,
      });
    });

    archive.finalize();
  });
}

const deleteTempFiles = (files) => {
  for (let i = 0; i < files.length; i++) {
    rimraf.sync(`uploads/tmp/${files[i]}`);
  }
};

const deleteUploadedFiles = (file, code) => {
  setTimeout(async () => {
    file?.map((file) => {
      const filePath = uploadFolder + file;
      if (filePath) {
        fs.unlink(filePath, async (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          } else {
            console.log("File deleted successfully");
          }
        });
      }
    });
    await fileRecord.deleteOne({ fileCode: code });
  }, 1000 * 60 * 5);
};

module.exports = {
  createZip,
  deleteTempFiles,
  deleteUploadedFiles,
};
