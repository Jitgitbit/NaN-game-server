const { Router } = require("express");
const User = require("./model");
const bcrypt = require("bcrypt");
const { toJWT } = require("../auth/jwt");
const auth = require("../auth/middleWare");

const router = new Router();

router.post("/user", async (request, response) => {
  if (!request.body.email || !request.body.password) {
    return response
      .status(400)
      .send("Missing email or password in request body");
  }

  const hashedPassword = bcrypt.hashSync(request.body.password, 10);

  try {
    await User.create({
      ...request.body,
      password: hashedPassword
    });

    response.status(201).send("User created");
  } catch (error) {
    console.log(error.name);
    switch (error.name) {
      case "SequelizeUniqueConstraintError":
        return response.status(400).send({ message: "Email not unique" });

      default:
        return response.status(400).send("Baaaddd request");
    }
  }
});

router.post("/login", async (request, response) => {
  console.log(request.body);

  const user = await User.findOne({ where: { email: request.body.email } });

  const passwordValid = bcrypt.compareSync(
    request.body.password,
    user.password
  );

  if (passwordValid) {
    const token = toJWT({ id: user.id });

    return response.status(200).send({ email: user.email, token: token });
  }
});

// router.put(
//   '/user',
//   (request, response, next) => User
//     .find(request.params.email)
//     .then(user => user.update({ gameroomId: request.body.gameroomId}))
//     .then(user => response.send(user))
//     .catch(next)
// )

// router.put(
//   '/join', 
//   (request, response, next) => User.token
//     .then(user => user.update({ gameroomId: request.body.gameroomId}))
//     .then(user => response.send(user))
//     .catch(next)
// )

// router.post("/events", auth, async (request, response) => {
//   console.log(request.user.dataValues.id);
//   const newEvent = { ...request.body, userId: request.user.dataValues.id };
//   const event = await Event.create(newEvent);
//   return response.status(201).send(event);
// });

router.put('/join', auth, async(request, response, next) => {
  console.log(request.user.dataValues.id);
  const updatedUser = { ...request.body, gameroomId: request.user.dataValues.gameroomId};
  const user = await User.update(updatedUser);
  return response.send(user)
})

module.exports = router;
