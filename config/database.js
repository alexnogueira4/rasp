// Set up mongoose connection
require('dotenv-safe').config();

const mongoose = require('mongoose');
const mongoDB = process.env.MONGO_CONNECTION;

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

mongoose.Promise = global.Promise;

module.exports = mongoose;
