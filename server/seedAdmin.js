

const Admin = require("./models/admin");
const { admin } = require("./database-mongodb/schemas");





let newAdmin = new admin({
    username: "homed",
    email: "emeerhammami@gmail.com",
    password: "admin123"
  });

  Admin.addAdmin(newAdmin, (err, data) => {
    if (err) {
      console.log({ success: false, msg: err.message });
    } else {
      console.log({ success: true, msg: "admin registered" });
    }
  });