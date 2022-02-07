const express = require("express");
const router = express.Router();

const FeedbacksController = require("../controllers/feedback");


router.route("/feedbacks")
.get(FeedbacksController.find_All)


module.exports = router;