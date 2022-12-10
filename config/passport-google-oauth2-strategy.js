const passport=require("passport");
// const GoogleStrategy=require("passport-google-oauth").OAuth2Strategy;
const GoogleStrategy=require('passport-google-oauth2').Strategy;
const crypto=require("crypto");
// const user=require("../models/users");
const User = require("../models/users");
const { google_callbackURL } = require("./environment");
// const res = require("express/lib/response");
const env=require("./environment");


passport.use(new GoogleStrategy({
  clientID:env.google_clientID, // Your Credentials here.
  clientSecret:env.google_clientSecret, // Your Credentials here.
  callbackURL:env.google_callbackURL,
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