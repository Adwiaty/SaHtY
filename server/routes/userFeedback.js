const express = require("express");
const router = express.Router();
const Feedback = require("../models/userFeedback")
const {feedback}=require('../database-mongodb/schemas')


router.post('/addfeedback' , (req, res, naxt) => {
    let newFeedback = new feedback ({
        userId : req.body.userId,
        content : req.body.content,
    })
    Feedback.addFeedback(newFeedback)
})

module.exports = router;
