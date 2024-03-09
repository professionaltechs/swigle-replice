const fs = require("fs");
const archiver = require("archiver");
const rimraf = require("rimraf");
const uploadFolder = require("../uploads/details");
const { deleteFilesAfterSeconds } = require("../uploads/details");

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

    archive.on("error", (err) => {
      reject(err);
    });

    archive.pipe(output);

    files.forEach((file) => {
      archive.append(fs.createReadStream(file.path), {
        name: file.originalname,
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

// const deleteUploadedFiles = (file) => {
//   const filePath = uploadFolder + file;
//   if (filePath) {
//     setTimeout(() => {
//       fs.unlink(filePath, (err) => {
//         if (err) {
//           console.error("Error deleting file:", err);
//         } else {
//           console.log("File deleted successfully after 10 seconds");
//         }
//       });
//     }, 1000 * 10);
//   }
// };

module.exports = {
  createZip,
  deleteTempFiles,
  //  deleteUploadedFiles
};
