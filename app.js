const { request } = require('express');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

//User modules
const User = require('./Modules/Users');

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/jwt_token',{useNewUrlParser: true , useUnifiedTopology: true },()=>{
    console.log("connected to the db");
})

app.get("/",(req,res)=>{
    res.send("Welcome to the app\n");
})

app.post('/register',(req,res)=>{
    console.log(req.body);

    let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });
     bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
            newUser.password = hash;
            newUser.save().then(savedUser => {
                res.send("new user saved");
            }).catch(err => {
                console.log("Err saving user: "+ err);
            });
        });
     });
})

app.listen(9090,()=>{
    console.log("listening on port 9090\n");
})