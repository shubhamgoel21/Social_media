class PostComment{

           constructor(postID)
           {
                      // console.log("class called on creating post ");
                      this.postID=postID;
                      this.postContainer=$(`.post-${postID}`);
                      this.newCommentForm=$(`#post-${postID}-comments-form`);

                      this.createComment(postID);
           }

           createComment(postID)
           {
                      let pself=this;
                      this.newCommentForm.submit(function(e)
                      {
                                 e.preventDefault();

                                
                                 $.ajax(
                                 {
                                            type:"post",
                                            url:'/post/comment/create',
                                            data:$(`#post-${postID}-comments-form`).serialize(),
                                            success:function(data)
                                            {
                                 
                                            let comment=pself.newCommentDom(data.data.comment);
                                            $(`#commentContainer${postID}`).prepend(comment);
                                            // console.log();
                                            pself.newDeleteDom($(' .comment_delete_link',comment));
                                            new Noty({
                                                       theme:'relax',
                                                       text:'Comment Published',
                                                       type:'success',
                                                       layout:"topRight",
                                                       timeout:1500,
                                                      }).show();
                                            return;
                                           
                                            },
                                            error:function(error)
                                             { 
                                              console.log(error.responseText);
                                              return {};
                                             }

                                 })
                      })
           }
           newCommentDom(comment)
           {
                      return $(`<li id="comment-${comment._id}">

                      <p>${comment.content}</p>
                                                       
                                                       
                                                      
                                                        <a class="comment_delete_link"   href="/post/comment/destroy/${comment._id}">X</a>
                      
                                                         
                                                                 
                                                    
                                                       <small>${comment.user.name}</small> 
                      
                      </li>`)
           }

    newDeleteDom(commentLink)
           {
                      console.log(commentLink);
                      $(commentLink).click(function(e)
                      {
                                 // let urll=$(commentLink).prop('href');
                                 // console.log(urll);
                                 e.preventDefault();

                                 $.ajax({
                                            type:'get',
                                            url:$(commentLink).prop('href'),
                                            
                                            success:function(data)
                                            {
                                                       console.log(`#comment-${data.data.comment_id}`);
                                                       $(`#comment-${data.data.comment_id}`).remove();
                                                       // console.log('value is',$(`#comment-${data.data.comment_id}`));
                                                       console.log("delete function called");

                                                       new Noty({
                                                                  theme:'relax',
                                                                  text:'Comment deleted',
                                                                  type:'success',
                                                                  layout:"topRight",
                                                                  timeout:1500,
                                                                 }).show();
                                                       return;
                                            },
                                            error:function(err)
                                            {
                                                       console.log(err.responseText);
                                                       return;
                                            }
                                 })
                      })

           }
}