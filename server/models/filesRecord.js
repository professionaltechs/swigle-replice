const mongoose = require("mongoose");
const { Schema } = mongoose;

const fileRecordSchema = new Schema({
  fileName: {
    type: Array,
    default: [],
  },
  fileCode: {
    type: String,
    required: true,
  },
  isLink : {
    type : Boolean,
    required : true,
  }
});

const fileRecord = mongoose.model("fileRecord", fileRecordSchema);

module.exports = fileRecord;
