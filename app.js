const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin:UIBE12345@cluster0.cc6kc.mongodb.net/blogDB",{useNewUrlParser: true});

const commentSchema = {
  userName: String,
  content: String,
  random: String
};

const Comments = mongoose.model("Post",commentSchema)

const loginquizes = {"lq1":"85"};

app.get("/", function(req, res){
  rand = Math.random()
  Comments.find({random:{$gte : rand}}, function(err, comments){
    res.render("index",{
      comments: comments
    });
  }).limit(10);
});

app.post("/login", function(req, res){
  const ans = req.body.quizAns;
  if (ans === loginquizes['lq1']){
    res.render("add-comment");
  }else{
    res.end('wooooooo WRONGGGGGGGG!');
  };
});

// this is to store comment data
app.post("/add-comment",function(req,res){
  const comment = new Comments({
    userName: req.body.userName,
    content: req.body.userComment,
    random: Math.random()
  });

  comment.save(function(err){
    if (!err){
      res.redirect("/");
    }
  });
});

app.listen(80,'0.0.0.0', function() {
  console.log("Server started on port 3100");
});
