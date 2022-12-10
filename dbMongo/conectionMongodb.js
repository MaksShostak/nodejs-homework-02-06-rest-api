const mongoose = require("mongoose");
const { MONGO_URL } = process.env;

const connectionMongo = async () => {
  return mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = {
  connectionMongo,
};
