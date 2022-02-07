const { event, user, medecine, order } = require("./database-mongodb/schemas");


var express = require("express");
const client = require('twilio')('ACef3a21de70771e1ddc68a842568cda00', '0f5480b869a543d4470b839c64a1e575');
var app = express();
const passport = require("passport");
var port = process.env.PORT || 5000;
var cors = require("cors");
const users = require("./routes/users");
const myUsers = require("./routes/myUser");
const myFeedback = require("./routes/userFeedback");
const paras = require("./routes/paras");
const feedbacks = require("./routes/feedback")
// import {Stripe} from "stripe";





var num1 = 0
var num2 = 0
var num3 = 0
var num4 = 0
const pharmacy = require("./routes/pharmacy");
const orders = require("./routes/orders");
const admin = require("./routes/admin");

//const pubKey="pk_test_51KAJlaHCkVRXX2YEoKKBzheHwz5wxxcDYyhXdmcFlGJgSQIkAn9OPSeHBQQNgUSlsU2hOG8HKRDzdy4L0lkAqBez00aqJr5abu"
//const secKey="sk_test_51KAJlaHCkVRXX2YEVvHwfwoQVbx8kEgmLV3XsQeycxAYY63EPXDmWtdTFeveMCjq8pSlRnB0vUhSNAmPLYMRXbXC00w89ZKzOa"

require("./config/passport")(passport);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/user", myUsers);
app.use("/para" , paras);
app.use("/feedback" , feedbacks);
app.use("/feed",myFeedback)
/*==================================={Stripe }=========================================================== */
// const stripe = Stripe(secKey , { apiVersion: "2020-08-27" });
app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099, 
      currency: "usd",
      payment_method_types: ["card"], 
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});

/*======================={Get the all  medecines in side the home page}=========================[Navbar]================================ */


app.post("/" , (req , res) => {
  console.log(req.body.number);
  sendTextMessage(req.body.number)
  res.send({num1 : num1 , num2 : num2 , num3 : num3 , num4 : num4})
})

app.get("/resetPassword" , (req , res) => {
  resetPassword()
  res.send({num1 : num1 , num2 : num2 , num3 : num3 , num4 : num4})
})


app.get("/medecine", async (req, res) => {
  try {
    let foundMedcine = await medecine.find({});
    res.send(foundMedcine);
  } catch (error) {
    res.send(error);
  }
});


app.put('/deleteOrder/:id', async (req,res)=>{ 
 var orde= await order.find({userId:req.params.id})
  var data=orde[0].medecineId
  for(var i=0;i<data.length;i++){
    if(data[i].id===req.body.id){
      data.splice(i,1)
    }
  }

    console.log(data);
    order.updateOne({ userId: req.params.id }, { medecineId: data },{new:true}, (err, data) => {
      if (err) {
        res.send(err)
      } else {
        res.send(data)
      }
    })
 
  
  
  })

  app.get('/check/:id',(req,res)=>{
    console.log(req.params.id);
    order.find({userId:req.params.id},(err,data)=>{
      if(err){
        throw err
      }else{
        res.send(data)
      }
    })
  })
 

  app.put('/confirme/:id',(req,res)=>{
    order.findOneAndUpdate({_id:req.params.id},{
      state:'',
      pharmacyConfirmation:true,
      medecineId:[],
    } ,(err,data)=>{
      if(err)throw err
      else{res.send(data)}
    })
  })

  app.put('/decline/:id',(req,res)=>{
    order.findOneAndUpdate({_id:req.params.id},{
      state:'',
    } ,(err,data)=>{
      if(err)throw err
      else{res.send(data)}
    })
  })


app.put('/state/:id',(req,res)=>{
  console.log(req.params.id);
  order.findOneAndUpdate({userId:req.params.id},req.body ,(err,data)=>{
    if(err)throw err
    else{res.send(data)}
  })
})


app.put('/confirmation/:id',(req,res)=>{
console.log(req.body);
order.findOneAndUpdate(
  {userId:req.params.id},
  { userConfirmation:true,
    totalPrice:req.body.totalPrice,
    medecineId:req.body.data
  } ,(err,data)=>{
  if(err)throw err
  else{res.send(data)}
})
})






/*==================================={Delete The orders afther the confirm}=======================[Cart]=============================== */

app.put("/ListOrderById/:id", async (req, res) => {
  console.log("fffffffffffff", (req.params.id))
  let MedList = await order.findOne({ userId: req.params.id });
  console.log("00000000", MedList.medecineId);
  order.updateOne({ userId: req.params.id }, { medecineId: "[]" }, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })

})

/*====================================={Add the medcine to the cart}=====================[Navbar]============================== */

app.put("/OrderId/:id", async (req, res) => {
  console.log(req.params.id,req.body);
  const doc = await order.findOne({ userId: req.params.id });
  var t=false  
    for(var i = 1; i < doc.medecineId.length;i++){
    if(doc.medecineId[i].id===req.body.id ){
      doc.medecineId[i].quatity++
      t=true
    }
  }
  if(t===false){
    doc.medecineId.push({ id: req.body.id, quatity: 1 })
  }
  console.log(doc.medecineId);
  order.updateOne({ userId: req.params.id }, { medecineId: doc.medecineId }, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})

/*======================={Get the medecine inside the cart by userId}================================================== */

app.get("/medecine/cart/:id", async (req, res) => { 
  var x= await order.findOne({ userId: req.params.id }) 
  var array=[]
  for(var i=0; i<x.medecineId.length; i++){
    array.push(x.medecineId[i].id)
  }
 var medecin = await medecine.find({ '_id': { $in: array } });
 res.send(medecin)
});



app.use("/users", users);
app.use("/pharmacies", pharmacy);
app.use("/orders", orders);
app.use("/admin", admin);


app.listen(process.env.PORT || port, () => {
  console.log(`Express server listening on  ${port}`);
});


function sendTextMessage(num) {

  var firstNum = Math.floor(Math.random() * 10)
  num1 = firstNum
  var secondNum = Math.floor(Math.random() * 10)
  num2 = secondNum
  var thirdNum = Math.floor(Math.random() * 10)
  num3 = thirdNum
  var fourthNum = Math.floor(Math.random() * 10)
  num4 = fourthNum
  client.messages.create({
    body: 'your verification code is ' + firstNum + '' + secondNum + '' + thirdNum + '' + fourthNum,
    to: '+216'+num,
    from: '+19148098893'
 }).then(message => console.log(message))
   .catch(error => console.log(error))
}

function resetPassword() {
  var firstNum = Math.floor(Math.random() * 10)
  num1 = firstNum
  var secondNum = Math.floor(Math.random() * 10)
  num2 = secondNum
  var thirdNum = Math.floor(Math.random() * 10)
  num3 = thirdNum
  var fourthNum = Math.floor(Math.random() * 10)
  num4 = fourthNum
  client.messages.create({
    body: 'your reset password code is ' + firstNum + '' + secondNum + '' + thirdNum + '' + fourthNum,
    to: '+21624444422',
    from: '+19148098893'
 }).then(message => console.log(message))
   .catch(error => console.log(error))
}