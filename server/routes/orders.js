const express = require("express");
const { order, medecine, user } = require("../database-mongodb/schemas");
const router = express.Router();
const Orders = require("../models/pharmacy");

// const { order } = require("../database-mongodb/schemas");

router.post("/comingOrders", async(req, res) => {
    console.log("landing",req.body);
    var userIds=[]
  order.find(req.body, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      console.log("comingO",data);
      for (let index = 0; index < data.length; index++) {
        userIds.push(data[index].userId)  
      }
      var userInfo =  user.find({ _id: { $in: userIds }});
     console.log("user",userInfo.username);
      console.log(userIds,"ids");
      res.send(data);
    }
  });
 
  
 
});

router.post("/getMedecines", async (req, res) => {
  
  var array = []; 
   for (var i = 0; i < req.body.length; i++) {
    array.push(req.body[i]);
  }
    
   var medecin = await medecine.find({ _id: { $in: array.flat() } });
 
  var arr = [];
  for (var i = 0; i < medecin.length; i++) {
    arr.push(medecin[i].name);
  }
  
  res.send(arr);
});
module.exports = router;
//   var username = "";
//   var userInfo = await user.find({ _id: orders.userId });
//   for (var i = 0; i < userInfo.length; i++) {
//     username = userInfo[i].username;
//   }

//   //const userName = userInfo.username