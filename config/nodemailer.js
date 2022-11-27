const nodemailer=require('nodemailer');
const ejs =require('ejs'); 
const path=require('path');
const { render } = require('express/lib/response');


let transporter = nodemailer.createTransport({
           service:'gmail',
           host: "smtp.gmail.com",
           port: 587,
           secure: false, // true for 465, false for other ports
           auth: {
             user: "shubhamgoel2100@gmail.com", // generated ethereal user
             pass: "(@Nilg0el_22101)", // generated ethereal password
           },
         });

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