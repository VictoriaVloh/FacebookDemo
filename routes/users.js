const express = require("express");
const router = express.Router();
const fs = require("fs");
console.log(__dirname)
const { mongoClient } = require("../dbconnection");
const { ObjectId } = require("mongodb");

//const users = JSON.parse(fs.readFileSync("./users.json", "utf8"));

router.get("/", async (req, res) => {
  const mongoconn = await mongoClient.connect();
  const users = await mongoconn.db('mydatabase').collection('users').find().toArray();
  res.render('users', {users: users});

});

function isValidStringField(value) {
  return !!value && typeof value === "string";
}

function notValidField(fieldName) {
  return `${fieldName} not valid`;
}

// create new user
router.post("/",(req, res, next) => {
  let Id = "id" + Math.random().toString(16).slice(2);

 console.log("body", req.body);

    let {namee,email, age, password } = req.body

    if (!isValidStringField(namee)) {
      return res.status(400).json({
        message: notValidField("name"),
      });
    }

    if (!isValidStringField(email)) {
      return res.status(400).json({
        message: notValidField("email"),
      });
    }

    age = parseInt(age);

    if (!age || isNaN(age)) {
      return res.status(400).json({
        message: "age not valid",
      });
    }

     if (!password || typeof password !== "string") {
      return res.status(400).json({
        message: "password not valid",
      });
    }
   
    next(); // all fields valid
  },

  async(req, res) => {
    //let Id = "id" + Math.random().toString(16).slice(2);

    let newuser =  ({ namee, age, password, email } = req.body);
    
    const mongoconn = await mongoClient.connect();
    const x =  await mongoconn.db('mydatabase').collection('users').insertOne(newuser);
    console.log('x',x)
    //res.json(newuser);
   //fs.writeFileSync("./users.json", JSON.stringify(users), "utf8");
   res.send(newuser)
  }
);
// route update user - PUT /users/:id
router.put("/:id", async(req, res) => {
  // 1) find user
  let id =  req.params.id;
  // 2) find fields to update
  // 3) find user by id
  let indexOfUser = users.findIndex((user) => {
    return user.id === id;
  });
  //let user = users[indexOfUser];ffi
  // 4) update user fields
  /*
  if (req.body.name !== undefined) {
    users[indexOfUser].name == req.body.name;
  }
  if (req.body.password !== undefined) {
    users[indexOfUser].password == req.body.password;
  }
  if (req.body.email !== undefined) {
    users[indexOfUser].email == req.body.email;
  }
  */
  const mongoconn = await mongoClient.connect();
 await mongoconn.db('testdb').collection('users').updateOne({_id :  new ObjectId(id)}, {$set:{email : req.body.email, name : req.body.name, password : req.body.password}})
  res.json("hi");
}); 

router.delete("/:id", async(req, res) => {
  let id =  req.params.id;

  const mongoconn = await mongoClient.connect();
  mongoconn.db('testdb').collection('users').deleteOne({_id :  new ObjectId(id)});
  res.json("vi");
});

module.exports = router;


