const User = require("../database-mongodb/schemas");
const bcrypt = require("bcryptjs");


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
};
