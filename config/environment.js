const path = require("path");
const fs=require("fs");
const rfs=require("rotating-file-stream");
const { log } = require("util");

const logDirectory=path.join(__dirname,"../productionLogs");

fs.existsSync(logDirectory)||fs.mkdirSync(logDirectory);

const accessLogStream=rfs.createStream('access_log',{
   interval:"1d",
   path:logDirectory,
})

const development={
           name:'development',
           assetpath:'./assets',
           session_cookie_name:"blah something",
           db_name:"codeial_development",
          smtp: {
                      service:'gmail',
                      host: "smtp.gmail.com",
                      port: 587,
                      secure: false, // true for 465, false for other ports
                      auth: {
                        user: "shubhamgoel2100@gmail.com", // generated ethereal user
                        pass: "(@Nilg0el_22101)", // generated ethereal password
                      },
                    },
           google_clientID:"519369088145-sdluvom2im3qg6gm10rp1chiqrc2aq63.apps.googleusercontent.com", // Your Credentials here.
           google_clientSecret:"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", // Your Credentials here.
           google_callbackURL:"http://localhost:8000/users/auth/google/callback",
           
           jwtSecret:'codeial',
           morgan:{
            mode:'dev',
            options:{stream:accessLogStream},
           }
           

}
// console.log("pathb is ",path);

const production={
           name:'production',
           assetpath:process.env.Assetpath,
           session_cookie_name:process.env.session_cookie_name,
           db_name:process.env.db_name,
          smtp: {
                      service:'gmail',
                      host: "smtp.gmail.com",
                      port: 587,
                      secure: false, // true for 465, false for other ports
                      auth: {
                        user: process.env.user, // generated ethereal user
                        pass: process.env.pass, // generated ethereal password
                      },
                    },
           google_clientID:process.env.google_clientID, // Your Credentials here.
           google_clientSecret:process.env.google_clientSecret, // Your Credentials here.
           google_callbackURL:process.env.google_callbackURL,
           
           jwtSecret:process.env.jwtSecret,
           morgan:{
            mode:'combined',
            options:{stream:accessLogStream},
           }
           
}

console.log(process.env.NODE_ENV);

module.exports=eval(process.env.NODE_ENV)==undefined ? development : eval(process.env.NODE_ENV); 
// module.exports=production;