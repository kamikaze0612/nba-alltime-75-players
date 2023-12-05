const fs = require("fs");

/* Importing 3rd party modules */
const Player = require("../models/playerModel");
const APIFeatures = require("../utils/apiFeatures");

/* Route controller for getting all registered players */
const getAllPlayers = async (req, res) => {
  const featuresToApply = new APIFeatures(Player.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const players = await featuresToApply.query;

  res.status(200).json({
    status: "success",
    data_length: players.length,
    data: {
      players,
    },
  });
};

/* Route controller for creating a player */
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

/* Route controller for getting a single player with specific id */
const getPlayer = async (req, res) => {
  try {
    const id = req.params.id;
    const player = await Player.findById(id);
    if (!player) throw new Error("Invalid Id");

    res.status(200).json({
      status: "success",
      data: {
        player,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err?.message,
      error: err,
    });
  }
};

/* Route controller for deleting a player with specific id */
const deletePlayer = async (req, res) => {
  try {
    const id = req.params.id;
    await Player.findByIdAndDelete(id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

/* Route controller for updating a player's information with specific id */
const updatePlayer = async (req, res) => {
  try {
    const id = req.params.id;
    const player = await Player.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
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

module.exports = {
  getAllPlayers,
  getPlayer,
  createPlayer,
  deletePlayer,
  updatePlayer,
};
