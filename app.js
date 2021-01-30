const { request } = require('express');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/jwt_token',{useNewUrlParser: true , useUnifiedTopology: true },()=>{
    console.log("connected to the db");
})

app.get("/",(req,res)=>{
    res.send("Welcome to the app\n");
})

app.get('/register',(req,res)=>{

})

app.listen(9090,()=>{
    console.log("listening on port 9090\n");
})