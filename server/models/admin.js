const bcrypt = require("bcryptjs");
const { admin } = require("../database-mongodb/schemas");

module.exports.getAdminById = function (id, callback) {
  const query = { _id: id };
  admin.findOne(query, callback);
};

module.exports.getAdminByEmail = function (email, callback) {
  const query = { email: email };
  admin.findOne(query, callback);
};

//get  admin name

module.exports.getAdminByUsername = function (username, callback) {
  const query = { username: username };
  admin.findOne(query, callback);
};

//update admin Profile

module.exports.getAdminByIdAndUpdate = function (id, userdata, callback) {
  admin.findByIdAndUpdate(id, userdata, callback);
};

//Add  admin

module.exports.addAdmin = function (newAdmin, callback) {
  admin.findOne({ username: newAdmin.username }, (err,adminn) => {
    if (adminn) {
      callback(new Error("admin already registered."),adminn);
    } else {
      admin.findOne({ email: newAdmin.email }, (err,adminn) => {
        if (adminn) {
          callback(new Error("Email already registered."),adminn);
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newAdmin.password, salt, (err, hash) => {
              if (err) throw err;
              newAdmin.password = hash;
              newAdmin.save(callback);
            });
          });
        }
      });
    }
  });
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};
