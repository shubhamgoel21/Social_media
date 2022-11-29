const express=require('express');
const app=express()
const port=8000;
const expressLayouts = require('express-ejs-layouts');
const db=require('./config/mongoose')
const cookieParser=require("cookie-parser");
var session = require('express-session')
const MongoStore=require('connect-mongo');
const flash=require("connect-flash");
const customMware=require("./config/middleware");
const sassMiddleware=require("node-sass-middleware");

const passport=require('passport');
const passportLocal=require("./config/passport_local");
const passportJWT=require("./config/passport_jwt");
const passportGoogle=require('./config/passport-google-oauth2-strategy');

// const chatServer=require('http').Server(app);
// const chatSockets=require('./config/chatSockets.js').chatSockets(chatServer);

// chatServer.listen(5000);
// console.log("chat server is listening on port 5000");
// setup the chat server to be used with socket.io

app.use(sassMiddleware({
    src:"./assets/scss",
    dest:"./assets/css",
    debug:true,
    outputStyle:'extended',
    prefix:'/css',
}))



const chatServer = require('http').Server(app);
const chatSockets = require('./config/chatSockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');



app.use(express.static('assets'));
app.use(cookieParser());
app.use(express.urlencoded());

app.use(expressLayouts);

app.use(flash());


app.use(session({
    name:"Social-Media",
    secret: 'blah somemthing',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge:(1000 * 60 * 100)
     },
     store:MongoStore.create(
        {
            mongoUrl:"mongodb+srv://Anonymous:BHucasP1IwOI7Hpm@cluster0.qqbon1u.mongodb.net/Social-Media?retryWrites=true&w=majority",
            mongooseConnection:db,
            autoRemove: 'disabled',
          
        },function(err){
            console.log(err || "connect mongo setup ok");
           }
     )
     
  }))
 
  app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(customMware.setFlash);



app.use('/',require('./routes'));






app.set('view engine','ejs')
app.set('views','./views')

app.use('/uploads',express.static(__dirname+"/uploads"));


app.listen(port,function(err){
    if(err){
        console.log("there is an reunningt the server");
    }
    console.log("servere is up and running @",port);
})
