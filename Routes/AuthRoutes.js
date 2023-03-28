const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Users = require("../Models/UserModel");

router.post("/register", (req, res) => {
  const { name, email, password, phoneNumber, gender, city } = req.body;
  if (!name || !email || !password || !phoneNumber || !city || !gender)
    res.status(400).send({ message: "All fields are required" });
  Users.findOne({ email })
    .then((user) => {
      if (user) {
        res.status(400).send({ message: "email is already signedup" });
      } else {
        Users.create({ name, email, password, phoneNumber, gender, city }).then(
          () => {
            res.status(200).send({ message: "signed up" });
          }
        );
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Try again", error });
    });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  console.log("inside signin");
  if (!email || !password)
    res.status(400).send({ message: "all fields are required" });
  Users.findOne({ email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          const accessToken = jwt.sign(
            {
              _id: user._id,
            },
            "secretsaltkey",
            {
              expiresIn: "24h",
            }
          );
          res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
          });
          res.status(200).send({ message: "sign in succesfull", user });
        } else {
          res
            .status(400)
            .send({ message: "email or password is not matching" });
        }
      } else {
        res.status(400).send({ message: "email or password is not matching" });
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "try again" });
    });
});

module.exports = router;
