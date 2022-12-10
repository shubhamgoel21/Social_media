const nodemailer=require('nodemailer');
const ejs =require('ejs'); 
const path=require('path');
const { render } = require('express/lib/response');
const env=require("./environment");

let transporter = nodemailer.createTransport(env.smtp);

         let renderTemplate=(data,relativepath)=>{
           let mailHTML;
           ejs.renderFile(path.join(__dirname,'../views/mailers',relativepath),
           data,
           function(err,template)
           {
                      if(err)
                      {
                                 console.log("error in rendering template in node mailer ");
                                 return ;
                      }
                      else{
                                 mailHTML=template;
                      }
           }
           );
           return mailHTML;
         }

         module.exports={
           transporter:transporter,
           renderTemplate:renderTemplate,
         }