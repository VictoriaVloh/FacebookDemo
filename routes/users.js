const express = require("express");
const router = express.Router();
const fs = require("fs");

const users = JSON.parse(fs.readFileSync("./users.json", "utf8"));

router.get("/", (req, res) => {
  res.json(users);
});

router.post("/", (req, res, next) => {
  let id = "id" + Math.random().toString(16).slice(2);
  const newuser = {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    password: req.body.password,
    id,
  };

  if (req.body.name !== String) {
    next("route");

    console.log("error");
    return res.status(404);
  }
  users.push(newuser);
  fs.writeFileSync("./users.json", JSON.stringify(users), "utf8");
  res.json(newuser);
});

router.delete("/:id", (req, res) => {
  const index = users.findIndex((user) => {
    return user.id === req.params.id;
  });
  const deletedUser = users.splice(index, 1);
  fs.writeFileSync("./users.json", JSON.stringify(users), "utf8");
  res.json(deletedUser);
});

module.exports = router;
