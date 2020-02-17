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
  return router;
}
module.exports = factory;
