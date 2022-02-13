const express = require("express");
const mongoose= require("mongoose");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const {find_a_user_by_id_and_update} = require ("../models/user")
const config = require("../config/database");
const { admin, pharmacy, feedback , user} = require("../database-mongodb/schemas");
const passport = require("passport");

router.post("/register", (req, res, next) => {
  let newAdmin = new admin({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  Admin.addAdmin(newAdmin, (err, data) => {
    if (err) {
      res.json({ success: false, msg: err.message });
    } else {
      res.json({ success: true, msg: "admin registered" });
    }
  });
});

router.post("/authenticate", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body);
  Admin.getAdminByUsername(username, (err, admin) => {
    if (err) throw err;
    if (!admin) {
      return res.json({ success: false, msg: "admin Not found" });
    }
    Admin.comparePassword(password, admin.password, (err, isMatch) => {
      if (isMatch) {
        const token = jwt.sign(admin.toJSON(), config.secret, {
          expiresIn: 604800,
        });
        res.json({
          success: true,
          token: token,
          admin: {
            id: admin._id,

            username: admin.username,
            email: admin.email,
          },
        });
      } else {
        return res.json({ success: false, msg: "Wrong password" });
      }
    });
  });
});

router.get('/getPharmacies', async (req, res)=>{
  console.log("work");
  var pharmacies = await pharmacy.find({});
  var users = await user.find({});

  console.log('found',pharmacies);
  console.log('found users',users);


  res.send({pharmacies , users});

})

//ban pharmacy
router.put('/ban/:_id', async(req, res)=>{
  
  console.log(req.params._id)
  var ban = await pharmacy.findByIdAndUpdate({_id:req.params._id},{banned:true},{new:true})
    
      console.log(ban.banned)
      res.send(ban.banned)
    }
)
  //unban pharmacy
router.put('/unban/:_id', async(req, res)=>{
    
    try {console.log(typeof req.params._id)
    console.log(req.params._id);
    var userb= await pharmacy.find({_id:req.params._id})

    console.log(userb)
    var ban = await pharmacy.findByIdAndUpdate({_id:req.params._id},{banned:false},{new:true})
      console.log("ubannnnn",ban);
       
        res.send("unbanned")
      } catch(err){ console.log(err);}
    }
)
//ban user
router.put('/banUser/:_id', async(req, res)=>{ 
  console.log(req.params._id)
  var ban = await user.findByIdAndUpdate({_id:req.params._id},{banned:true},{new:true})
    console.log("ban",ban.banned)
    res.send("done")
  }
)
//unban user
router.put('/unbanUser/:_id', async(req, res)=>{
  
  console.log(req.params._id)
      var ban = await user.findByIdAndUpdate({_id:req.params._id},{banned:false},{new:true})
        console.log(ban.banned)
        res.send("done")
  }
)
  

// get feedbacks
router.get("/getfeedbacks", async (req, res) => {
  var feedbacks = await feedback.find({});
    console.log("this is the feedbacks", feedbacks);
  
  var result=[]
  for (var i=0; i<feedbacks.length; i++){
    var us= await user.find({ '_id': feedbacks[i].userId })
    result.push(us[0].username)
  }
  console.log(result);
  //usersId.push(feedbacks[i].userId)
  // console.log(feedbacks);
  res.send({feedbacks,result} );
});

router.get("/getPharmacies", async (req, res) => {
  console.log("work");
  var pharmacies = await pharmacy.find({});
  console.log("found", pharmacies);
  res.send(pharmacies);
});

module.exports = router;
