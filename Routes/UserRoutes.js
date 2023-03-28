const router = require("express").Router();
const Users = require("../Models/UserModel");

router.get("/", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((error) => {
      res.status(500).send({ message: "Try again", error });
    });
});

router.post("/insert", (req, res) => {
  Users.insertMany(req.body)
    .then((message) => {
      res.status(200).send(message);
    })
    .catch((error) => {
      res.status(500).send({ message: "Try again", error });
    });
});

router.get("/id/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Users.findById(id)
    .then((user) => res.status(200).send(user))
    .catch((error) => {
      res.status(500).send({ message: "Failed to fetch user", error });
    });
});

router.delete("/id/:id", (req, res) => {
  const id = req.params.id;
  console.log(id, "inside delete");
  Users.deleteOne({ _id: id })
    .then((message) => res.status(200).send(message))
    .catch((error) => {
      res.status(500).send({ message: "Failed to Delete user", error });
    });
});

router.put("/id/:id", (req, res) => {
  const id = req.params.id;
  console.log(id, "Inside Update");

  Users.findByIdAndUpdate({ _id: id }, { ...req.body }, { new: true })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "User not found", err });
    });
});

router.get("/gender/:gender", (req, res) => {
  const gender = req.params.gender;
  Users.find()
    .then((users) => {
      const result = users.filter((user) => user.gender === gender);
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(500).send({ message: "Try again", error });
    });
});
module.exports = router;
