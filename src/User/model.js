const Sequelize = require("sequelize");
const sequelize = require("../db");
const GameRoom = require(`../GameRoom/model`);


const User = sequelize.define("user", {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

User.belongsTo(GameRoom);

module.exports = User;
