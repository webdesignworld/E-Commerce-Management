const mongodb = require("mongodb");

const uri = process.env.MONGO_URI;

const client = new mongodb.MongoClient(uri);

function run() {
  client
    .connect()
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = { run, client };