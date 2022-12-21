const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const fs = require("fs/promises");
const moment = require("moment");

// const path = require("path");
// const uploadDir = path.join(__dirname, "public");

const app = express();

const { contactsRouter } = require("./routes/api/contactsRouter");
const { usersRouter } = require("./routes/api/authRouter");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(async (req, res, next) => {
  const { url, method } = req;
  const date = moment().format("YYYY-MM-DD_hh:mm:ss");
  await fs.appendFile("server.log", `\n${method} ${url} ${date}`);
  next();
});

app.use(express.json());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.static("public"));
// app.use(express.static(uploadDir));

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
