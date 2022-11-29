const Post=require("../../../models/post");
const Comment=require("../../../models/comments");
const { post } = require("../../../routes/api/v1/posts");


module.exports.index= async function(req,res)
{
           let posts=await Post.find({})
           .sort('-createdAt')
           .populate('user','name')
           .exec(function(err,posts){
                      
                                 return res.json(200,{
                                            message:"post from api called",
                                            post:posts,
                                 })
                     

             });       
}


module.exports.delete=async function(req,res)
{
           try{
                      let ID=req.params.id;
                      let post = await Post.findById(ID);
                      if(post.user==req.user.id)
                      {
                   

                      post.remove();

                      await Comment.deleteMany({id:ID});

                      return res.json(200,{
                                 message:"Post and associated comments deleted",
                      })
           }
           else{
                      return res.json(401,{
                                 message:"you cannout delete the post",
                      })
           }

           }
           catch(err)
           {
                      console.log("error reached in the catch block of the delete api call");
                      return res.json(500,{
                                 message:"error in deleting the post ",
                      })
           }
}
