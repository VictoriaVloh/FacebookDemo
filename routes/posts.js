const express = require("express");
const router = express.Router();
const fs = require("fs");
const { mongoClient } = require("../dbconnection");
const { ObjectId } = require("mongodb");

const handlebars = require('handlebars');
//hw add two routes :1) add like 2)remove like


const like = {
  _id: 'string',
  postId: 'string',
  userId: 'string',
}

const post = {
  _id: 'string',
  title: 'string',
  text: 'string',
  userId: 'string',
}

// todo: save in file json
//const posts = JSON.parse(fs.readFileSync("./posts.json", "utf8"));

router.get("/", async (req, res) => {
  console.log('get posts')
  const mongoconn = await mongoClient.connect();
  const posts = await mongoconn.db('mydatabase').collection('posts').find().toArray();
  res.render('posts', { posts : posts });
  console.log(posts)
  
});

// get .posts/:id
router.get("/:id", (req, res) => {
  //tdo: return posts by id
  let id = req.params.id;
  let post = posts.find((post) => {
    return post.id == id;
  });
  res.json(post);
});

function isValidStringField(value) {
  return !!value && typeof value === "string";
}


function notValidField(fieldName) {
  return `${fieldName} not valid`;
}
// POST /posts body { id title text }
// ********* homework - finish route **********
router.post("/", (req, res, next) => {
  const { title, text, userId } = req.body; //title = req.body.title

  if (!isValidStringField(title)) {
    return res.status(400).json({
      message: notValidField("title"),
    });
  }

  if (!isValidStringField(text)) {
    return res.status(400).json({
      message: notValidField("text"),
    });
  }

  if (!isValidStringField(userId)) {
    return res.status(400).json({
      message: notValidField("userID"),
    });
  }
  next();
},
  async (req, res) => {
    let id = "id" + Math.random().toString(16).slice(2);
    const newpost = req.body;
    const mongoconn = await mongoClient.connect();
    mongoconn.db('mydatabase').collection('posts').insertOne(newpost);
    res.json(newpost);
    //handlebars.registerHelper()
  }
);

router.put("/:id", async (req, res) => {
  let id = req.params.id;
  let indexofPOst = users.findIndex((post) => {
    return post.id === id;
  });

  const mongoconn = await mongoClient.connect();
  await mongoconn.db('mydatabase').collection('posts').updateOne({ _id: new ObjectId(id) }, { $set: { title: req.body.title, text: req.body.text } })
  res.json("updated");
});
router.delete("/:id", async (req, res) => {
  let id = req.params.id;

  const mongoconn = await mongoClient.connect();
  mongoconn.db('mydatabase').collection('posts').deleteOne({ _id: new ObjectId(id) });
  res.json("deleted");
});

module.exports = router; // export route