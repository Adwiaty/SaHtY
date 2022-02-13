const db = require("./index.js");
const { feedback } = require("./schemas.js");

const samplePosts = [
  {
    userId: "61e7445be207564b6bf8a154",
    Text: "hello im feedback 1",
  },
  {
    userId: "61e80993a413acb2c920c8da",
    Text: "hello im  feedback 2",
  },
];

const insertMedecines = function () {
  feedback
    .create(samplePosts)
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

insertMedecines();
