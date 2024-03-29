const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {assignToken,assignRefToken,verifyToken} = require('../Modules/auth');

//User modules
const User = require('../Modules/Users');

router.get("/",(req,res)=>{
    res.send("Welcome to the router\n");
})

router.get("/user",verifyToken,(req,res,next)=>{
        console.log(req.cookies.jwt);
        User.findOne({_id: req.userId},{_id: 0,password: 0}).then(savedUser => {
            res.status(200).send(savedUser);
        }).catch(err=>{
            console.log("Error : "+err);
            res.send("Error in sending details");
        })
    
});

router.post('/register',(req,res)=>{
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

router.post("/login",(req,res)=>{
    if (!req.body.email || !req.body.password) {
        res.send("Provide valid user and password");
    } else {
        User.findOne({email: req.body.email}).then(savedUser => {
                console.log(savedUser.password + " : "+ savedUser.email);
                bcrypt.compare(req.body.password,savedUser.password,(err,status)=>{
                    if (err) {
                        res.send("Error encounterd");
                        console.log("Error " + err);
                    }
                    if (status){
                        assignToken(savedUser._id).then(accesstoken => {
                            assignRefToken(savedUser._id).then(refToken => {
                                res.cookie('jwt',accesstoken,{domain: null,secure: false,httpOnly: true});
                                res.status(200).send({auth: true, token: accesstoken, ref: refToken});
                            }).catch(err => {
                                res.status(500).send("Internal server error");
                            });
                        }).catch(err => {
                            console.log(err);
                            res.status(500).send("Internal server error");
                        });
                    } else {
                        console.log(status);
                        res.send("Incorrect Password");
                    }
                })
        }).catch(err => {
            res.send("Could not find user");
            console.log("Error "+ err);
        });
    }
    
})

module.exports = router;