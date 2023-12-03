const express = require("express");

const playersController = require("../controllers/playersController");

const router = express.Router();

router.route("/").get(playersController.getAllPlayers);
router.route("/:id").get(playersController.getPlayer);

module.exports = router;
