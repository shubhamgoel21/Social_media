const router = require("../routes");
const User=require('../models/users');
const Post=require("../models/post");

module.exports.home= function(req,res)
{

    return res.render('index',{
       
     });
   

    
}
