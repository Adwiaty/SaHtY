const {feedback}=require('../database-mongodb/schemas')


module.exports.addFeedback = function(newFeedback, callback){
    newFeedback.save(callback);
}