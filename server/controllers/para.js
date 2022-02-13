const Med = require("../database-mongodb/schemas");


module.exports = {
    find_All: async (req, res, next) => {
        // get all the paras
        try {
             console.log("\nRequesting the server to give me all paras from the database ...\n");
             // the server will try the following
             const paras = await Med.para.find({})

             res.status(200).json(paras);
        } catch (error) {
             next(error);
        }
   },
}