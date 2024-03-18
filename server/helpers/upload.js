const fs = require("fs");
const archiver = require("archiver");
const rimraf = require("rimraf");
const fileRecord = require("../models/filesRecord");
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8081 });

// UPLOAD FOLDER LOCATION
const { uploadFilesLocation } = require("../uploads/details");

const sendProgressUpdate = (progress) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(progress));
    }
  });
};

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

    archive.on("progress", (progress) => {
      console.log(
        `Progress: ${progress.entries.processed}/${progress.entries.total} files processed`
      );
      sendProgressUpdate(progress);
    });

    archive.on("error", (err) => {
      reject(err);
    });

    archive.pipe(output);

    files.forEach((file) => {
      archive.append(fs.createReadStream(uploadFilesLocation + file), {
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
      const filePath = uploadFilesLocation + file;
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
