const express = require("express");

const app = express();
const port = 8080;

app.use(express.json());

// ROUTES
const uploadRouter = require("./routes/upload");

app.use('/files',uploadRouter )

app.listen(port, () => {
  console.log("Server running on port " + port);
});
