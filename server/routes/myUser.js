const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/myUser");

//admin router
router.route("/users")
  .get(UsersController.find_All)

router.route("/service").get(UsersController.find)


router.route("/:userId")
  .get(UsersController.find_One) 
  .put(UsersController.update_One) 
  .delete(UsersController.remove_One) 

module.exports = router;
