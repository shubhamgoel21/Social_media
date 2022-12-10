const Comment=require("../models/comments");
const Post=require("../models/post");
const commentMailer=require("../mailer/comment_mailer");

module.exports.create=async function(req,res)
{
           try{

                     //  console.log(req.body);
                      let comment=await Comment.create({
                                 content:req.body.content,
                                 user:req.user._id,
                                 post:req.body.post,
                          });
 
                           console.log("comment posted is ",comment);

                        let post=await Post.findById(req.body.post);
                          
                          post.comment.push(comment);
                          post.save();
                          // console.log("post->",post);

                          if(req.xhr)
                          {
                            return res.status(200).json({
                              data:
                              {
                                comment:comment,
                              },
                              message:"comment added successfully",
                            })
                          };

                          req.flash("success","comment created successfully");

                          return res.redirect('back');

           }
           catch(err)
           {
              // console.log("error in creating comments");
              req.flash("error in creating comments");
              return;
           }
}

module.exports.destroy=async function(req,res)
{
  let id=req.params.id;
  

  let comment=await Comment.findById(id);

  
  let postid=comment.post.valueOf();
  // console.log(postid);

  comment.remove();

 let post=await Post.findByIdAndUpdate(postid,{$pull: {comment:req.params._id}});
//  console.log(post);


if(req.xhr)
{
  return res.status(200).json({
    data:{
      comment_id:req.params.id,
    },
    message:"post deleted",
  })
}

req.flash("success","comment deleted successfully");
return res.redirect('back');


}