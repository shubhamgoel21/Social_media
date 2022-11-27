const passport=require("passport");
// const GoogleStrategy=require("passport-google-oauth").OAuth2Strategy;
const GoogleStrategy=require('passport-google-oauth2').Strategy;
const crypto=require("crypto");
// const user=require("../models/users");
const User = require("../models/users");
// const res = require("express/lib/response");


passport.use(new GoogleStrategy({
           clientID:"519369088145-sdluvom2im3qg6gm10rp1chiqrc2aq63.apps.googleusercontent.com", // Your Credentials here.
           clientSecret:"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", // Your Credentials here.
           callbackURL:"http://localhost:8000/users/auth/google/callback",
           passReqToCallback:true
         },
         function(request, accessToken, refreshToken, profile, done) {
          console.log("user created");
          
           User.findOne({email:profile.emails[0].value}).exec(
                      function(err,user)
                      {
                                 if(err)
                                 {
                                            console.log("error in finding the user google auth failed",err);
                                            return;
                                 }
                                 console.log(profile);
                                 if(user)
                                 {
                                            return done(null,user);
                                 }
                                 else{
                                  
                                            User.create({
                                                       name:profile.displayName,
                                                       email:profile.emails[0].value,
                                                       password:crypto.randomBytes(20).toString('hex'),
                                            },function(err,user)
                                            {
                                                       if(err)
                                                       {                                                                  console.log("error in creating user in google authentication",err);
                       return;                                
                                                                  // return done(false);
                                                     }

                                                     return done(null,user);

                                            })
                                 }
                      }
           )


         }
       ));


       module.exports=passport;