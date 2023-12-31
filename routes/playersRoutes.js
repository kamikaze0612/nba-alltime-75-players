const express = require("express");

const playersController = require("../controllers/playersController");

const router = express.Router();

router
  .route("/")
  .get(playersController.getAllPlayers)
  .post(playersController.createPlayer);

router
  .route("/:id")
  .get(playersController.getPlayer)
  .delete(playersController.deletePlayer)
  .patch(playersController.updatePlayer);

module.exports = router;
