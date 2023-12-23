const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.log("Uncaught exception! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE_URI.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => console.log("Connected to Database!"));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Running on http://127.0.0.1:${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled rejection! Shutting down...");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
