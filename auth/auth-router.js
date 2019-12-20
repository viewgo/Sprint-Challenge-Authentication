const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model.js");

router.post("/register", (req, res) => {
  console.log("posting register");
  let user = req.body;
  console.log(user);
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  console.log(hash);

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  console.log("LOGIN CHECK", username, password);
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // sign token
        console.log("PASSWORD LOG", password, user.password);
        const token = signToken(user);

        res
          .status(200)
          .json({ message: `Logged in as ${user.username}.`, token });
      } else {
        res.status(401).json({ message: "Invalid user information" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function signToken(user) {
  const payload = {
    username: user.username
  };

  const secret =
    process.env.JWT_SECRET || "I find your lack of faith disturbing.";

  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
