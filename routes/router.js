const AuthMiddleware = require('../config/passport'),
      index = require('./index'),
      user = require('./user'),
      book = require('./book'),
      favorite = require('./favorite')

module.exports = function(app) {
  app.use('/', index);
  app.use('/users', user);
  app.use('/books', book);
  app.use('/favorites', AuthMiddleware, favorite);
}
