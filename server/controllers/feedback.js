const Feedback = require("../database-mongodb/schemas");


module.exports = {
    find_All: async (req, res, next) => {
        // get all the feedbacks
        try {
             console.log("\nRequesting the server to give me all feedbacks from the database ...\n");
             // the server will try the following
             const feedbacks = await Feedback.feedback.find({})

             res.status(200).json(feedbacks);
        } catch (error) {
             next(error);
        }
   },
}