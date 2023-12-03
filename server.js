const dotenv = require("dotenv");
const express = require("express");

dotenv.config({ path: "./config.env" });
const app = require("./app");

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Running on http://127.0.0.1:${port}`);
});
