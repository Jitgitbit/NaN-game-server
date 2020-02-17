const Sequelize = require('sequelize');
const db = require(`../db`);

const GameRoom = db.define(
  'gameroom',
  {
    name: {
      type: Sequelize.STRING,
    }
  },
)

module.exports = { GameRoom }