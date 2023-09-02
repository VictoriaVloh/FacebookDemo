const express = require("express");
const router = express.Router();
const { mongoClient } = require("../dbconnection");
const { ObjectId } = require("mongodb");


const like = {
  _id: 'string',
  postId: 'string',
  userId: 'string',
}

router.delete("/", async (req, res) => {
  const id = req.body;
  const mongoconn = await mongoClient.connect();
  mongoconn.db('mydatabase').collection('likes').deleteOne({ _id: new ObjectId(id) });
  res.json("deleted")
})
router.post("/", async (req, res) => {
  try {
    let newLike = req.body;
    const mongoconn = await mongoClient.connect();
    const like = await mongoconn.db('mydatabase').collection('likes').insertOne(newLike);
    res.json(like)

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'server error' })
  }
})

router.get("/", async (req, res) => {
  const mongoconn = await mongoClient.connect();
  const likes = await mongoconn.db('mydatabase').collection('likes').find().toArray();
  res.render('likes', { likes: likes });

})

module.exports = router; 