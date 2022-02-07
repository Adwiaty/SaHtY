const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Pharmacy = require("../models/pharmacy");
const config = require("../config/database");

const { pharmacy, para, resetpasswords} = require("../database-mongodb/schemas");
const passport = require("passport");
const crypto = require("crypto");
const nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs");




router.post("/register", (req, res, next) => {
  let newPharmacy = new pharmacy({
    username: req.body.username,
    email: req.body.email,
    address: req.body.address,
    location: req.body.location,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
  });

  Pharmacy.addPharmacy(newPharmacy, (err, data) => {
    if (err) {
      res.json({ success: false, msg: err.message });
    } else {
      res.json({ success: true, msg: "Pharmacie registered" });
    }
  });
});

router.post("/authenticate", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  Pharmacy.getPharmacyByUsername(username, (err, pharmacy) => {
    if (err) throw err;
    console.log(pharmacy);
    if (!pharmacy) {
      return res.json({ success: false, msg: "pharmacy not found" });
    }
    if(pharmacy.banned===true){
      return res.json({ success: false, msg: "Pharmacy banned" });
    }
    Pharmacy.comparePassword(password, pharmacy.password, (err, isMatch) => {
      if (isMatch) {
        const token = jwt.sign(pharmacy.toJSON(), config.secret, {
          expiresIn: 604800,
        });
        res.json({
          success: true,
          token: token,
          pharmacy: {
            id: pharmacy._id,
            username: pharmacy.username,
            email: pharmacy.email,
            state: pharmacy.location,
          },
        });
      } else {
        return res.json({ success: false, msg: "Wrong password" });
      }
    });
  });
});

// router.get(
//   "/profile",
//   passport.authenticate("jwt", { session: false }),
//   (req, res, next) => {
  
//     res.json({ pharmacy: req.pharmacy });
//   }
// );


router.post("/resetpassword",(req,res)=>{
  var data = req.body;
  
  let smpTransport = nodemailer.createTransport({
    service : 'Gmail',
    port: 465,
    auth :{
      user: 'all.in.one.customer.services@gmail.com',
      pass : 'Azerty123+'
    }
  });

  let hash_link = require("crypto").randomBytes(64).toString("hex")
//   http://localhost:8080/reset/:hash_link
  let mailOption ={
    from : 'mo.med.services@gmail.com',
    to : data.email,
    subject : 'Reset password instructions',
    html:`      
    <h3>Click on the link below to reset your password </h3>
    <p> <a href="http://localhost:8080/reset/${hash_link}">Change my password</a</p>
    <p>Your password won't change until you access the link above and create a new one.</p>`
  };
    let PharmacyFound =   pharmacy.findOne(data.email) 
    if (PharmacyFound){
      let email=data.email
      const resetPassword = {
        id: PharmacyFound._id,
        email,
        hash: hash_link,
      };
      const createdResetPassword =  resetpasswords.create(resetPassword)};
      smpTransport.sendMail(mailOption,(err, res) =>{
        if(err){
          res.send('error')
        }else{
          res.send('success')
        }
      })
      smpTransport.close()
      res.send('success')
    
    
   
  })
  

 
   

  // router.get('/changePassword/:id', (req, res) =>{ 
  //    let hash=req.params
  //   res.send(hash)
  // })
  router.post('/changePassword', async(req,res)=>{
    var { newPassword, id }=req.body
    var found = await resetpasswords.findOne({ hash : id })
    console.log('resetpassword',found)
    let email = found.email
    var foundPharmacy = await pharmacy.findOne({email})
      console.log(' fouuund',foundPharmacy._id )


      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newPassword, salt, (err, hash) => {
          if (err){throw err;} 
         else{newPassword = hash;
        } 
        });
      });
   setTimeout(()=>{
   console.log(newPassword)
   pharmacy.findOneAndUpdate( {email},{ password: newPassword},(erreur,data)=>{
     if(erreur){
       res.send(erreur)
     }else{
       res.send(data)
     }
   })
   },1000)


})
    
    
// add Para
router.post("/para", (req, res) => {
  console.log(req.body);
  para.create(req.body, (err, paraData) => {
    if (err) {
      console.log(err);
    } else {
      res.send(paraData);
    }
  });
});
router.get("/para/:id", (req, res) => {
  console.log(req.params.id);
  para.find({ pharmacyId: req.params.id }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      console.log(data);
      res.send(data);
    }
  });
});

//delete Para
router.delete("/delete/:id", (req, res) => {
  para
    .findByIdAndRemove({ _id: req.params.id })
    .then((removed_product) => {
      res.send(removed_product);
    })
    .catch((err) => {
      res.send(err);
    });
});
//update Para
router.put("/updatePara/:id", (req, res) => {
  para.findByIdAndUpdate({ _id: req.params.id }, req.body, (err, data) => {
    console.log(req.body);
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// router.get(
//   "/profile",
//   passport.authenticate("jwt", { session: false }),
//   (req, res, next) => {
//     res.json({ pharmacy: req.pharmacy });
//   }
// );

router.get("/profile/:id", (req, res) => {
  Pharmacy.getPharmacyById(req.params.id, (err, paraData) => {
    if (err) {
      res.send(err);
    } else {
      res.send(paraData);
    }
  });
});

//profile update

router.put("/update/:id", (req, res) => {
  Pharmacy.getPharmacyByIdAndUpdate(req.params.id, req.body, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

module.exports = router;
