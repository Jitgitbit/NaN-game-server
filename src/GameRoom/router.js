const { Router } = require('express')
const router = new Router()
const { GameRoom } = require(`./model`);
const db = require(`../db`);

router.get('/gamerooms', (req, res, next) => {
  GameRoom.findAll()
    .then(gamerooms => {
      res.send(gamerooms);
    })
    .catch(err => next(err))
});

router.get('/gamerooms/:id', (req, res, next) => {
  GameRoom.findByPk(req.params.id) // beware: if you want to define a const with req.params.id you have to parseInt(), because Url returns a string !!
    .then(gameroom => {
      res.json(gameroom); //.send for strings, .json for data. it works both but it's better practice!
    })
    .catch(err => next(err))
});

router.post(`/gamerooms`, (req, res, next) => {
  console.log(req.body)
  GameRoom.create(req.body)
    .then(gameroom => {
      res.send(gameroom);
    })
    .catch(err => next(err))
})

router.put(
  '/gamerooms/:id',
  (request, response, next) => GameRoom
    .findByPk(request.params.id)
    .then(gameroom => gameroom.update(request.body))
    .then(gameroom => response.send(gameroom))
    .catch(next)
)

router.delete(
  '/gamerooms/:id',
  (request, response, next) => GameRoom
    .destroy({ where: { id: request.params.id }})
    .then(number => response.send({ number }))
    .catch(next)
)

module.exports = router