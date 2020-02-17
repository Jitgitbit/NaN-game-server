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
const gameRoomRoutes = require("./GameRoom/router");
app.use(userRoutes);
app.use(gameRoomRoutes);

app.use(gameRoomStreamFactory(stream));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
