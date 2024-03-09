const mongoose = require("mongoose");
const { Schema } = mongoose;
const { deleteFilesAfterSeconds } = require("../uploads/details");

const fileRecordSchema = new Schema({
  fileName: {
    type: String,
    required: true,
  },
  fileCode: {
    type: Number,
    required: true,
  },
  deleteDocument: {
    type: Date,
  },
});

// fileRecordSchema.index(
//   { deleteDocument: 1 },
//   { expireAfterSeconds: 10 }
// );

const fileRecord = mongoose.model("fileRecord", fileRecordSchema);

module.exports = fileRecord;
