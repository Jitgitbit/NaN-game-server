const express = require("express");
const Sse = require("json-sse");
const app = express();
const port = process.env.PORT || 4000;
const gameRoomStreamFactory = require("./stream/router");

const cors = require("cors");
const corsMiddleWare = cors();
app.use(corsMiddleWare);

const bodyParser = require("body-parser");
const bodyParserMiddleWare = bodyParser.json();
app.use(bodyParserMiddleWare);

const stream = new Sse();

const userRoutes = require("./User/router");
app.use(userRoutes);

const gameRoomRoutes = require("./GameRoom/router");
app.use(gameRoomStreamFactory(stream));
app.use(gameRoomRoutes);

const scoreboardFactory = require("./Scoreboard/router");
const scoreboardRouter = scoreboardFactory(stream);
app.use("/", scoreboardRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
