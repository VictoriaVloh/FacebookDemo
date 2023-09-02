const express = require("express");
const app = express();
const port = 3000;

const fs = require("fs");
const path = require("path");
//const users = JSON.parse(fs.readFileSync("./users.json", "utf8"));
const handlebars = require('handlebars')
// import route
const postsRoute = require("./routes/posts");
const usersRoutes = require("./routes/users");
const commentsRoutes = require("./routes/comments");
const likesRoute = require("./routes/likes");

app.use(express.static(path.join(__dirname, "public"))); //serve static files
console.log(path.join(__dirname, "public"));
//express.json() - middleware  //parse body for content-type application/json
app.use(express.json()); 

// express.urlencoded() -  middleware   //parse body for content-type application/form-urlencoded
app.use(express.urlencoded({extended: true})); 

app.set('views', './views')
app.set('view engine', 'hbs')

app.get('/test',(req,res) => {
  //
  res.render('index',{posts : [{title: 'text'}]})
})


app.get("/", (req, res) => {
  res.send("Hello World!");
});

//homework - sign up page (create html page with sign up form) - get http://localhost:3000/signup.html

// use route
app.use("/posts", postsRoute);
app.use("/users", usersRoutes);
app.use("/comments", commentsRoutes);
app.use("/likes",likesRoute)

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});



