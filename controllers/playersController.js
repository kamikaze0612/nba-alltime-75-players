/* Importing 3rd party modules */
const Player = require("../models/playerModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

/* Route controller for getting all registered players */
const getAllPlayers = catchAsync(async (req, res) => {
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
});

/* Route controller for creating a player */
const createPlayer = catchAsync(async (req, res) => {
  const player = await Player.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      player,
    },
  });
});

/* Route controller for getting a single player with specific id */
const getPlayer = catchAsync(async (req, res) => {
  const id = req.params.id;
  const player = await Player.findById(id);

  if (!player)
    return next(new AppError(`No player found with this ID (${id})`));

  res.status(200).json({
    status: "success",
    data: {
      player,
    },
  });
});

/* Route controller for deleting a player with specific id */
const deletePlayer = catchAsync(async (req, res) => {
  const id = req.params.id;
  const player = await Player.findByIdAndDelete(id);

  if (!player)
    return next(new AppError(`No player found with this ID (${id})`));

  res.status(204).json({
    status: "success",
    data: null,
  });
});

/* Route controller for updating a player's information with specific id */
const updatePlayer = catchAsync(async (req, res) => {
  const id = req.params.id;
  const player = await Player.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!player)
    return next(new AppError(`No player found with this ID (${id})`));

  res.status(200).json({
    status: "success",
    data: {
      player,
    },
  });
});

module.exports = {
  getAllPlayers,
  getPlayer,
  createPlayer,
  deletePlayer,
  updatePlayer,
};
