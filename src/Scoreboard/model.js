const Sequelize = require("sequelize");
const db = require("../db");
const User = require("../User/model");
const GameRoom = require("../GameRoom/model");

const Scoreboard = db.define("scoreboard", {
  score: {
    type: Sequelize.INTEGER
  }
});

Scoreboard.belongsTo(GameRoom)
Scoreboard.belongsTo(User)

module.exports = Scoreboard;
