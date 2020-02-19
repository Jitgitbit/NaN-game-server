const { Router } = require("express");
const GameRoom = require(`../GameRoom/model`);
const router = new Router();

function factory(stream) {
  router.get("/stream", async (request, response, next) => {
    try {
      const allRooms = await GameRoom.findAll();
      const action = {
        type: "ALL_GAMEROOMS",
        payload: allRooms
      };
      const json = JSON.stringify(action);
      stream.updateInit(json);
      stream.init(request, response);
    } catch (error) {
      next(error);
    }
  });

  
  router.post("/stream", async (req, res, next) => {
    try {
      const { name } = req.body;
      const newRoom = await GameRoom.create({ name });

      const action = {
        type: "ONE_GAMEROOM",
        payload: newRoom
      };
      const stringAction = JSON.stringify(action);
      stream.send(stringAction);
      res.json(newRoom);
    } catch (e) {
      if (e.name === "SequelizeUniqueConstraintError") {
        return res.status(409).send("Game room already exist");
      }
      next(e);
    }
  });
  return router;
}
module.exports = factory;
