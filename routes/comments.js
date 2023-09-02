const express = require("express");
const router = express.Router();
const fs = require("fs");
const { mongoClient } = require("../dbconnection");
const { ObjectId } = require("mongodb");

//comment entity shape (model)
const comment = {
    _id: 'string',
    text: 'string',
    userId: 'string',
    postId: 'string'
}
const config = require("../config")

 const handlebars = require('handlebars');

// todo: save in file json
//const posts = JSON.parse(fs.readFileSync("./posts.json", "utf8"));

router.get("/", async(req, res) => {
    const mongoconn = await mongoClient.connect();
    const comments = await mongoconn.db(config.databaseName).collection(config.commentsCollectionName).find().toArray();
     res.render('comments',{comments: comments});
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
router.post("/", async(req, res, next) => {
    const newcomment = req.body;
    const mongoconn = await mongoClient.connect();
    mongoconn.db('mydatabase').collection('comments').insertOne(newcomment);
    res.json(newcomment);
  }
);

router.put("/:id", async(req, res) => {
  let id =  req.params.id;
  let indexofPOst = users.findIndex((post) => {
    return post.id === id;
  });
  
  const mongoconn = await mongoClient.connect();
 await mongoconn.db('mydatabase').collection('posts').updateOne({_id :  new ObjectId(id)}, {$set:{title : req.body.title, text : req.body.text}})
  res.json("updated");
}); 
router.delete("/:id", async(req, res) => {
  let id =  req.params.id;

  const mongoconn = await mongoClient.connect();
  mongoconn.db('mydatabase').collection('posts').deleteOne({_id :  new ObjectId(id)});
  res.json("deleted");
});

module.exports = router; // export route