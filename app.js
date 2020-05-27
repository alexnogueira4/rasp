const createError = require('http-errors'),
      express = require('express'),
      path = require('path'),
      cookieParser = require('cookie-parser'),
      logger = require('morgan'),
      bodyParser = require('body-parser'),
      mongoose = require('./config/database'),
      app = express();

app
  .use(express.json())
  .use(logger('dev'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(cookieParser())

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// AauthenticationMiddleware
require('./config/passport');
// Routes
require('./routes/router')(app)
// Catch and handle erros
require('./config/error')(app)

module.exports = app
