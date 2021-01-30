const { request } = require('express');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//load env variables
require('dotenv').config();

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/jwt_token',{useNewUrlParser: true , useUnifiedTopology: true },()=>{
    console.log("connected to the db");
})

//populate routes
var home = require('./Router/home');

app.use("/",home);

app.listen(9090,()=>{
    console.log("listening on port 9090\n");
})