const Sequelize = require('sequelize');
const db = require(`../db`);
const {User} = require(`../User/model`);

const GameRoom = db.define(
  'gameroom',
  {
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    }
  },
)

GameRoom.belongsTo(User);

module.exports = GameRoom 