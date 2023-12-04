// Importing base modules
const fs = require("fs");

// Importing npm modules
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Importing 3rd party modules
const Player = require("../models/playerModel");

// Configuring path for environment variables file
dotenv.config({
  path: "../config.env",
});

// Reading Database URI from environment variables
const DB = process.env.DATABASE_URI.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// Connecting to Database
mongoose.connect(DB).then("Connected to Database!");

// Reading JSON data
const players = JSON.parse(fs.readFileSync(`${__dirname}/data.json`, "utf-8"));

// Importing all players data to Database
const importData = async () => {
  try {
    await Player.create(players);
    console.log("Data successfully loaded");
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
};

// Deleting all existing players data from Database
const deleteData = async () => {
  try {
    await Player.deleteMany();
    console.log("Data successfully deleted");
  } catch (err) {
    console.log(err);
  } finally {
    process.exit();
  }
};

// CLI argument configuring
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
