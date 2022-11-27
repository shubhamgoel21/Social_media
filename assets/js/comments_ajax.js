class PostComment{

           constructor(postID)
           {
                      console.log(`reacherd here ${postID}`)
                      this.postID=postID;
                      this.postContainer=`post-${postID}`;
                      this.newCommentForm=`post-${postID}-comments-form`;

                      this.createComment(postID);
           }

           createComment(postID)
           {
                      this.newCommentForm.submit(function(e)
                      {
                                 e.preventDefault();
                                 let self=this;

                                 $.ajax(
                                 {
                                            type:"post",
                                            url:'/post/comment/create',
                                            data:$(self).serialize(),
                                            success:function(data)
                       {
                         console.log("entered in the comments ajax");
                                  let comment=newCommentDom(data.data.comment);

                                  
                                  $(`#commentContainer${postID}`).prepend(comment);
                                 // console.log("value of post id",comment);
                                 //  console.log("value inside the comment",data.data.comment.post);


                                 new Noty({
                                            theme: 'relax',
                                            text: "Comment published!",
                                            type: 'success',
                                            layout: 'topRight',
                                            timeout: 1500
                                            
                                        }).show();
 
                       },

                                            error:function(err)
                       {
                                  console.log("error in adding comment using ajax",err);
                                  return;
                       }

                                 })
                      })
           }




           newCommentDom(comment)
           {
                      return $(`<li>

                      <p>${comment.content}</p>
                                                       
                                                       
                                                      
                                                        <a href="/post/comment/destroy/${comments.id}">X</a>
                      
                                                         
                                                                 
                                                    
                                                       <small>${comment.user.name}</small> 
                      
                      </li>`)
           }
}