const fs = require("fs");

const players = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/data.json`, "utf-8")
);
console.log(players);

const getAllPlayers = (req, res) => {
  res.status(200).json({
    status: "success",
    data_length: players.length,
    data: {
      players,
    },
  });
};

const getPlayer = (req, res) => {
  const id = req.params.id;
  res.status(200).json({
    status: "success",
    data: {
      player: players[id - 1],
    },
  });
};

module.exports = { getAllPlayers, getPlayer };
