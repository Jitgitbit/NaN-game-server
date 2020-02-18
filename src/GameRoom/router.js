const { Router } = require("express");
const router = new Router();
const GameRoom = require(`./model`);
const db = require(`../db`);

// router.post(`/gamerooms`, (req, res, next) => {
//   console.log(req.body)
//   GameRoom.create(req.body)
//     .then(gameRoom => {
//       res.send(gameRoom);
//     })
//     .catch(err => next(err))
// })

module.exports = router;
