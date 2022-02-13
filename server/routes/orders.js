const express = require("express");
const { order, medecine, user } = require("../database-mongodb/schemas");
const router = express.Router();
const Orders = require("../models/pharmacy");

// const { order } = require("../database-mongodb/schemas");

router.post("/comingOrders", (req, res) => {
    console.log(req.body);
  order.find(req.body, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

router.post("/getMedecines", async (req, res) => {
  
  var array = []; 
   for (var i = 0; i < req.body.length; i++) {
    array.push(req.body[i].id);
  }


   var medecin = await medecine.find({ _id: { $in: array } });
 
  var arr = [];
  for (var i = 0; i < medecin.length; i++) {
    arr.push(medecin[i].name);
  }
//   var username = "";
//   var userInfo = await user.find({ _id: orders.userId });
//   for (var i = 0; i < userInfo.length; i++) {
//     username = userInfo[i].username;
//   }

//   //const userName = userInfo.username


  res.send(arr);
});
module.exports = router;
