const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");

// import route
const postsRoute = require("./routes/posts");
const usersRoutes = require("./routes/users")


app.use(express.json()); // for parsing application/json
const users = JSON.parse(fs.readFileSync("./users.json", "utf8"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});


// use route
app.use("/posts", postsRoute);
app.use("/users",usersRoutes);


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

