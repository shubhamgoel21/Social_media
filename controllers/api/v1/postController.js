const Post=require("../../../models/post");
const Comment=require("../../../models/comments");


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

                      post.remove();

                      await Comment.deleteMany({id:ID});

                      return res.json(200,{
                                 message:"Post and associated comments deleted",
                      })

           }
           catch(err)
           {
                      console.log("error reached in the catch block of the delete api call");
                      return res.json(500,{
                                 message:"error in deleting the post ",
                      })
           }
}
