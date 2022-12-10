const passport=require("passport");
const User=require("../models/users");
const env=require("./environment");

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = env.jwtSecret;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findById(jwt_payload._id, function(err, user) {
        if (err) {
           console.log("error in finding user from jwt");
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
           
        }
    });
}));

module.exports=passport;