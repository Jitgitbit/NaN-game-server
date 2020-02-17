const Sequelize = require("sequelize");

const databaseUrl =
  process.env.DATABASE_URL ||
  "postgres://postgres:secret@localhost:5432/postgres";

const db = new Sequelize(databaseUrl);

db
  // .sync({ force: true })// forces by overwriting,  the latest change counts!!
  .sync()
  .then(() => console.log("DB connected"))
  .catch(console.error);

module.exports = db;
