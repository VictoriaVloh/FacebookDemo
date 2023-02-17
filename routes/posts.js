const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([{ id: "1", text: "first post" }]);
});


// get .posts/:id
router.get("/:id", (req, res) => {
  res.json({ id: "1", text: "first post" });
});

module.exports = router; // export route
