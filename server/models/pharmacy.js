const bcrypt = require("bcryptjs");
const { pharmacy } = require("../database-mongodb/schemas");


module.exports.getPharmacyById = function (id, callback) {
  const query = { _id: id };
  pharmacy.findOne(query, callback);
};

module.exports.getPharmacyByEmail = function (email, callback) {
  const query = { email: email };
  pharmacy.findOne(query, callback);
};

//get pharmacy name

module.exports.getPharmacyByUsername = function (username, callback) {
  const query = { username: username };
  pharmacy.findOne(query, callback);
};

//updatePharmacy Profile

module.exports.getPharmacyByIdAndUpdate = function (id,userdata, callback) {
  pharmacy.findByIdAndUpdate(id,userdata, callback);
};

//Add Pharmacy

module.exports.addPharmacy = function (newPharmacy, callback) {
  pharmacy.findOne({ username: newPharmacy.username }, (err, pharmacyy) => {
    if (pharmacyy) {
      callback(new Error("Pharmacy already registered."), pharmacyy);
    } else {
      pharmacy.findOne({ email: newPharmacy.email }, (err, pharmacyy) => {
        if (pharmacyy) {
          callback(new Error("Email already registered."), pharmacyy);
        } else {


          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newPharmacy.password, salt, (err, hash) => {
              if (err) throw err;
              newPharmacy.password = hash;
              newPharmacy.save(callback);
            });
          });
        }
      });
    }})}
  


module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
}


