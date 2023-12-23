/* Importing 3rd party modules */
const Player = require("../models/playerModel");
const factory = require("./handlerFactory");

/* Route controller for getting all registered players */
exports.getAllPlayers = factory.getAll(Player);

/* Route controller for creating a player */
exports.createPlayer = factory.createOne(Player);

/* Route controller for getting a single player with specific id */
exports.getPlayer = factory.getOne(Player);

/* Route controller for deleting a player with specific id */
exports.deletePlayer = factory.deleteOne(Player);

/* Route controller for updating a player's information with specific id */
exports.updatePlayer = factory.updateOne(Player);
