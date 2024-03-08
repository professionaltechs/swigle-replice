const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
const uploadRouter = require("./routes/upload");

app.use("/files", uploadRouter);

app.listen(port, () => {
  console.log("Server running on port " + port);
});
