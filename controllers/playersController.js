const fs = require("fs");

// Importing Database Models
const Player = require("../models/playerModel");

// const players = JSON.parse(
//   fs.readFileSync(`${__dirname}/../data/data.json`, "utf-8")
// );

const getAllPlayers = async (req, res) => {
  const players = await Player.find();

  res.status(200).json({
    status: "success",
    data_length: players.length,
    data: {
      players,
    },
  });
};

const createPlayer = async (req, res) => {
  try {
    const player = await Player.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        player,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

const getPlayer = async (req, res) => {
  const id = req.params.id;
  const player = await Player.findById(id);

  res.status(200).json({
    status: "success",
    data: {
      player,
    },
  });
};

module.exports = { getAllPlayers, getPlayer, createPlayer };
