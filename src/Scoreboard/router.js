const { Router } = require("express");
const Scoreboard = require("./model");
const router = new Router();

function factory(stream) {
  router.get("/scoreboard", async (req, res, next) => {
    try {
      const allScoreInfo = await Scoreboard.findAll();
      // console.log("allRooms", allRooms)
      const action = {
        type: "ALL_SCOREINFO",
        payload: allScoreInfo
      };
      const json = JSON.stringify(action);
      stream.updateInit(json);
      stream.init(req, res);
    } catch (error) {
      next(error);
    }
  });

  router.post("/scoreboard", async (req, res, next) => {
    try {
      console.log("testing this endpoint");

      const { score, userId, gameroomId } = req.body;
      console.log("req body", req.body);
      const newScore = await Scoreboard.create({ score, userId, gameroomId });
      const action = {
        type: "ONE_SCORE",
        payload: newScore
      };
      const stringAction = JSON.stringify(action);
      stream.send(stringAction);
      res.json(newScore);
    } catch (e) {
      next(e);
    }
  });
  return router;
}
module.exports = factory;
