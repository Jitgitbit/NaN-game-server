const express = require("express");

const app = express();
const port = process.env.PORT || 4000;

const cors = require("cors");
const corsMiddleWare = cors();

app.use(corsMiddleWare);

const bodyParser = require("body-parser");
const bodyParserMiddleWare = bodyParser.json();

app.use(bodyParserMiddleWare);



app.get("/ping", (request, response) => {
  response.send("You rang?");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
