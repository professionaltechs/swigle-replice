const uploadFiles = (req, res) => {
  try {
    res.status(200).json({
      message: "Files uploaded successfully",
      files: req.files,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error uploading files",
      error: error,
    });
  }
};

module.exports = { uploadFiles };
