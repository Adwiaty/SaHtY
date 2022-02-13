const db = require("./database-mongodb/index.js");
const { order } = require("./database-mongodb/schemas.js");

const orders = [
  {pharmacyId: "61e76d3d38cf753705a380ef",
  userId: "61defffe1eeb5e7305406168",
  medecineId: [
    "61d8db6189dce74b62e598f9",
    "61d8db6189dce74b62e598fe",
    "61d8db6189dce74b62e598fb",
  ],
  totalPrice: 222,
  state:"ariana",
  prescription: "",
  response: [],
  pharmacyNumber: 0,
  userConfirmation:false,
  pharmacyConfirmation:false }
];

 
const insertOrder = function () {
  order
    .create(orders)
    .then(() => {
      console.log("Database seeded successfully");
    })
    .catch((error) => {
      console.log("error seeding the database: ", error);
    })
    .finally(() => {
      db.close();
    });
};

insertOrder();
