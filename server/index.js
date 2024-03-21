const express = require("express");
const cors = require("cors");
require("./db/db");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('trust proxy', true)

// ROUTES
const uploadRouter = require("./routes/upload");
const deleteRouter = require("./routes/deleteFiles");
const authRouter = require("./routes/auth");
const subscriptionRouter = require("./routes/subscription");
const userRoutes = require("./routes/user");

app.use("/files", uploadRouter);
app.use("/file-delete", deleteRouter);
app.use("/auth", authRouter);
app.use("/subscription", subscriptionRouter);
app.use("/userDetails", userRoutes);

app.listen(port, () => {
  console.log("Server running on port " + port);
});
