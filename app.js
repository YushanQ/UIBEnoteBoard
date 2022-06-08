const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mysql = require("mysql");
const moment = require("moment");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.static("node_modules"));
app.use(cookieParser());

//连接mysql
const connection=mysql.createConnection({
    host:"rm-2zeaaye2hw1h0ge22no.mysql.rds.aliyuncs.com",
    user:"uibe12345",
    password:"UIBE12345@",
    database:"board"
});

connection.connect();

//记录答题答案，之后会转移
const loginquizes = {"lq1":"85",
                     "lq2":"惠中大道"};

//首页：展示留言信息
app.get("/", function(req, res){
  let sqlStr = '(select * from blogdb where presentStatus is null order by date desc limit 1) \
                union\
                (select * from blogdb where presentStatus is null order by rand() limit 9)'

  connection.query(sqlStr, function(err, results){
    if (err){
      return console.log(err.message)
    }else{
      res.render("index",{
        comments: results
      })
    }
  })
});

app.get("/posts/:postId", function(req, res){

  const requestedId = req.params.postId;
  let sqlStr = 'select * from blogdb where id ='+ requestedId

  connection.query(sqlStr, function(err, results){
    if (err){
      return console.log(err.message)
    }else{
      res.render("post",{
        comments: results[0]
      })
    }
  })
});

//登录界面
app.post("/login", function(req, res){
  const ans = Object.values(req.body)[0];
  const id = Object.keys(req.body)[0];

  if (ans === loginquizes[id]){
    // req.session.username = 'guest' + Math.round((Math.random()*9+1)*10000)
    // console.log(req.session)
    res.render("add-comment");
  }else{
    res.end('wooooooo WRONGGGGGGGG!');
  };
});

// this is to store comment data
app.post("/add-comment",function(req,res){
  let sqlStr = "insert into blogdb(userName, userEmail, userComment, date, presentStatus) values(?,?,?,?,?)"
  let params = [
      req.body.userName,
      req.body.userEmail,
      req.body.userComment,
      moment().format("YYYY-MM-DD HH:mm:ss"),
      req.body.checkbox]

  connection.query(sqlStr, params, function(err){
    if (!err){
      res.redirect("/")}
  })
});

//添加点赞
app.post("/add-like", function(req,res){
  let sqlStr = "insert into likes (blogId,userId) values(?,?)"
  let params = [
      req.body.blogId,
      req.body.userId
  ]
  connection.query(sqlStr, params, function(err){
    if (!err){
      res.json(200);
    }else{
      console.log(err)
    }
  })
})
//删除点赞
app.post("/remove-like", function(req,res){
  let sqlStr = "delete from likes where blogId = ? and userId = ? "
  let params = [
      req.body.blogId,
      req.body.userId
  ]
  connection.query(sqlStr, params, function(err){
    if (!err){
      res.json(200);
    }else{
      console.log(err)
    }
  })
})
// 获取该用户的所有点赞信息
app.get("/likes", function(req,res){
  let sqlStr = "select * from likes where userId = ?"
  let params = [
    req.query.userId
  ]
  connection.query(sqlStr, params, function(err, ret){
    if (!err){
      res.json(ret);
    }else{
      console.log(err)
    }
  })
})
// 获取各个文章的总数
app.get("/likes-by-blog",function(req,res){
  let sqlStr = "select likes.blogId, count('id') total from likes group by likes.blogId"
  connection.query(sqlStr, [], function(err, ret){
    if (!err){
      res.json(ret);
    }else{
      console.log(err)
    }
  })
})


app.listen(3100, function() {
  console.log("Server started on port 3100");
});
