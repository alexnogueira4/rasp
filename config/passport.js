const bcrypt = require('bcrypt'),
      passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      passportJWT = require("passport-jwt"),
      JWTStrategy = passportJWT.Strategy,
      ExtractJWT = passportJWT.ExtractJwt,
      config = require("./config.js"),
      userModel = require('../api/models/users');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, done) => {
    userModel.findOne({email:email}).select('-favoriteBooks')
    .then(user => {
      if (!user) { return done(null, false) }
      // Check password
      bcrypt.compare(password, user.password, (err, isValid) => {
        if (err) { return done(err) }

        if (!isValid) { return done(null, false) }

        return done(null, user)
      })
    })
    .catch(err => done(err))
  }
));

passport.use(new JWTStrategy({
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
  },
  ({_id}, done) => {
    userModel.findById({_id})
      .then(user => done(null, user))
      .catch(e => done(e));
  }
));

module.exports = passport.authenticate('jwt', config.jwtSession)
