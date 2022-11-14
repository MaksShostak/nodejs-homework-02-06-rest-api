const mongoose = require("mongoose");
const uriDb = process.env.MONGO_URL;

const connectionMongo = async () => {
  return mongoose.connect(uriDb, {
    promiseLibrary: global.Promise,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
connectionMongo().catch((err) => console.error(err));

module.exports = {
  connectionMongo,
};
