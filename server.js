const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE_URI.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => console.log("Connected to Database!"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Running on http://127.0.0.1:${port}`);
});
