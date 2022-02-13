const express = require("express");
const router = express.Router();
const passport = require ("passport");
const jwt = require ("jsonwebtoken");
const User = require("../models/user");
const config = require("../config/database");
const {user,order}=require('../database-mongodb/schemas')
const bcrypt = require("bcryptjs");


router.post("/register", (req, res, next) => {
   
    let newUser = new user ({
        name: req.body.username,
        email: req.body.emailAddress,
        username: req.body.username,
        password: req.body.password,
        phoneNumber: req.body.PhoneNumber,
        address: req.body.address,
        connected:true
    });

    User.addUser(newUser, (err, data)=> {
        if(err){
            res.json({success: false, msg: err.message});
        }
        
        else {
            res.json({success: true, msg: "User registered.", user: {
                id: data._id,
                name: data.name,
                username: data.username,
                email: data.email
            }});
         
         order.create({userId:data._id})
        }
    });
});

router.post("/authenticate", (req, res, next)=>{
    console.log("hani jit");
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: "User not found."});
        }
       
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800,
                });
                res.json({
                    success: true,
                    token: token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        banned: user.banned
                    }
                });
            }
            else {
                return res.json({success: false, msg: "Wrong password."});
            }
        });
    });
});


router.post("/username" , (req, res) => {
    User.getUserByUsername(req.body.username , (err, data) => {
        if(err) throw err;
        else{
            res.send(data);
        }
    })
})



router.get("/profile", passport.authenticate("jwt", {session: false}), (req, res, next)=>{
    res.json({
        user: req.user
    });
});



router.post('/password', async(req,res)=>{
    var { password, id }=req.body

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err){throw err;} 
         else{password = hash;
        } 
        });
      });
   setTimeout(()=>{
   console.log(password)
   user.findOneAndUpdate( {_id:id},{ password: password},(erreur,data)=>{
     if(erreur){
       res.send(erreur)
     }else{
       res.send(data)
     }
   })
   },1000)


})

module.exports = router;