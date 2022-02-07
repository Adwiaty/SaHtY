const User = require("../database-mongodb/schemas");
const bcrypt = require("bcryptjs");
const axios = require("axios")

module.exports = {
    find_All: async (req, res, next) => {
         // get all the users
         try {
          //     console.log("\nRequesting the server to give me all users from the database ...\n");
              // the server will try the following
              const users = await User.user.find({})

              res.status(200).json(users);
         } catch (error) {
              next(error);
         }
    },
    find_One: async (req, res, next) => {
         try {
          //     console.log("\nRequesting the server to give me a specific user from the database ...\n");
              // the server will try the following
              const foundUser = await User.user
                   .findById(req.params.userId)

              res.status(200).json(foundUser);
         } catch (error) {
              next(error);
         }
    },
    update_One: async (req, res, next) => {
         try {
              console.log("\nRequesting the server to update a specific user into the database ...\n");
              
              // the server will try the following
              const user = await User.user.findByIdAndUpdate(req.params.userId, req.body, { new: true });
              const users = await User.user.find({});
              res.status(200).json(users)
         } catch (error) {
              next(error);
         }
    },
    remove_One: async (req, res, next) => {
         try {
              console.log("\nRequesting the server to delete a specific user from the database ...\n");
              // the server will try the following
              const removedUser = await User.user
                   .findByIdAndRemove(req.params.userId)

              res.status(200).json(removedUser)
         } catch (error) {
              next(error)
         }
    }, find: async (req, res, next) => {
         // get all the users
         try {
              // console.log("queryUser", req.query);               // the server will try the following
              // console.log("params", req.params);
              const user = await User.user.find({ category: "provider" })

              console.log(user)
              // .populate(["parent", "provider"])
              // .select('-password')

           res.status(200).json(user);
       } catch (error) {
           next(error);
       }
   },
   async konnect(req, res) {
       var a= req.body.money
       a=a.toString()
      a= a.replace('.','')
      a=a+'00'
      a=a
      console.log(a);
     var obj = {
       receiverWalletId: "61f98d3c0fd9726edf5dbc65",
       amount: a,
       token: "TND",
       firstName: "Mon prenom",
       lastName: "Mon nom",
       phoneNumber: "24563609",
       email: "mon.email@mail.com",
       orderId: "1234657",
       link: "https://api.dev.konnect.network/WSlQUtBF8",
       webhook: "chay",
       successUrl: "https://dev.konnect.network/gateway/payment-success",
       failUrl: "https://dev.konnect.network/gateway/payment-failure",
       acceptedPaymentMethods: ["bank_card", "wallet", "e-DINAR"],
     };
     let config = {
       headers: {
         "x-api-key": "61f98d3c0fd9726edf5dbc64:dFCjFZNCBwhqv7XU2EG",
       },
     };
     axios
       .post(
         "https://api.preprod.konnect.network/api/v2/payments/init-payment",
         obj,
         config
       )
       .then(async (a) => {
         res.send(a.data);
       })
       .catch((error) => {
         res.send(error);
       });
   },
};
