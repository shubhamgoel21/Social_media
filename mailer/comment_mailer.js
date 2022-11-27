const nodeMailer=require("../config/nodemailer");

exports.newComments=(comment)=>
{
           console.log("inside new Comment");

           nodeMailer.transporter.sendMail({
                      
                      from:"shubhamgoel2106@gmail.com",
                      to:"comment.user.email",
                      subject:"New comment published",

                      html:'<h1> YUP NEW COMMNET ADDED</h1>'
           },(err,info)=>{
                      
                      if(err)
                      {
                                 console.log("Errror in sending emai ",err);
                                 return;
                      }

                      console.log("MESSAGE SENT ",info);
                      return;

           });
}