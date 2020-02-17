const express = require("express");

const app = express();
const port = process.env.PORT || 4000;

const cors = require("cors");
const corsMiddleWare = cors();

app.use(corsMiddleWare);

const bodyParser = require("body-parser");
const bodyParserMiddleWare = bodyParser.json();

app.use(bodyParserMiddleWare);

const userRoutes = require("./User/router");
const gameRoomRoutes = require("./GameRoom/router");
app.use(userRoutes);
app.use(gameRoomRoutes);

app.get("/ping", (request, response) => {
  response.send("You rang?");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
