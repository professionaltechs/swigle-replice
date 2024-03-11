const mongoose = require("mongoose");
const { Schema } = mongoose;
const { deleteFilesAfterSeconds } = require("../uploads/details");

const fileRecordSchema = new Schema({
  fileName: {
    type: String,
    required: true,
  },
  fileCode: {
    type: String,
    required: true,
  },
});

const fileRecord = mongoose.model("fileRecord", fileRecordSchema);

module.exports = fileRecord;
