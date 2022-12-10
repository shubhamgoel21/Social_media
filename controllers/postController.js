const Post=require("../models/post");
const Comment=require("../models/comments");
const { Console } = require("console");
const User=require("../models/users");
const { post } = require("../routes");





module.exports.create=async function(req,res)
{
           try{
                      let post= await Post.create({
                      content:req.body.content,
                      user:req.user._id,
                      })
                      // console.log("post that is created->",post);

                       await Post.findById(post._id)
                      .populate({
                        path:'user'
                      }).exec(function(err,posts)
                      {
                      
                       
                        if(req.xhr)
                        {
                         return res.status(200).json({
                           data:{
                             post:posts,
                           },
                           message:"Post Created",
                         });
                        }
                        req.flash("success","post created successfully");
                         return res.redirect('back');  
                      });
                      // console.log("value of post user",post._id);
                       
                           
           }
           catch(err)
           {
                      // console.log(" error in creating posts");
                      req.flash("error","error in creating posts");
                      return;
           }
     
           
}



module.exports.destroy=async function(req,res)
{
          
  let id=req.params.id;

  let post=await Post.findById(id);
  post.remove();
  
  Comment.deleteMany({post:id});
  console.log("post user is->",post.user);
  
  
 
  if(req.xhr)
  {
    return res.status(200).json({
      data:{
        post_id:req.params.id,
      },
      message:"post deleted",
    })
  }

  req.flash("success","post deleted successfully");
   return res.redirect('back');
}