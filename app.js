const express = require('express');
const app = express();
const port = 3000;
const ejs = require('ejs');
const path = require('path');
const connection = require('./database/connection');
const users = require('./database/users');
const tasks = require('./database/tasks');

const expressSession = require('express-session');

app.set('view engine','ejs');

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const passport = require('passport');
const loginPassport = require('./passportConfig').loginPassport;
const protectProfile = require('./passportConfig').protectProfile;


app.use(express.static(path.join(__dirname, "public")));
app.use(expressSession({secret:"secret",resave:false,saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());

loginPassport(passport);

app.get('/',(req,res)=>{
  res.render("index");
});

app.get('/loginUser',(req,res)=>{
  res.render("login");
});

app.get('/registerUser',(req,res)=>{
  res.render("register");
});

app.get('/profile',protectProfile,(req,res)=>{
  res.render("profile",{name:req.user.username});
});

app.get('/logout',(req,res)=>{
  req.logout((err)=>{
    if(err){
      return next(err);
    }
    res.redirect('/')
  });
});

app.post('/login',passport.authenticate("local",{failureRedirect:'/loginUser',successRedirect:'/profile'}));

app.post('/register',async (req,res)=>{
  const user = await users.findOne({email:req.body.email});
  if(user){
    return res.status(400).send("User already exists!!");
  }

  const newUser = await users.create(req.body);
  res.redirect('/loginUser');
});

app.post('/addTask',async (req,res)=>{
  const task = await users.findOne({title:req.body.title});
  if(task){
    return res.status(400).send("Task already exists!!");
  }

  const newTask = await tasks.create(req.body);
  res.redirect('/profile');
});

app.listen('3000',()=>{
  console.log("Hello");
});