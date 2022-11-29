const User=require("../../../models/users");
const jwt=require("jsonwebtoken");

module.exports.createSession=async function(req,res)
{

    try{
       
           let user=await User.findOne({email:req.body.email});
           console .log(user,"reached and found the user");
           console.log("req->body", req.body);
           if(!user || user.password!= req.body.password)
           {
                      return res.json(422,{
                                 message:"INVALID USERNAME AND PASSWORD",
                      })
           }
           else{
                      return res.json(200,{
                                 message:"logged in successfully and here is your jwt token",
                                 data:{
                                            token:jwt.sign(user.toJSON(),"codeial",{expiresIn:'100000'})
                                 }
                      })
           }

    }catch(err)
    {
           console.log("error reached in the catch block of the delete api call");
           return res.json(500,{
                      message:"error in deleting the post ",
           })   
    }
}