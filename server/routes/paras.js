const express = require("express");
const router = express.Router();

const ParasController = require("../controllers/para");

router.route("/paras")
.get(ParasController.find_All)


module.exports = router;