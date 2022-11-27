// {

//    var commentCreate=function()
//    {
    
//            var commentForms=$('.commentCreate'); 
//         //    console.log(commentForm);

//              commentForms.each(function(i,commentForm)
//            {
//         //     // contactForm.hide();
//         //     console.log(commentForm);
//             commentForm.submit(function(e)
//             {
//                    e.preventDefault();
//                       $.ajax({
//                        type:'post',
//                        url:'/post/comment/create',
//                        data:commentForm.serialize(),
 
//                        success:function(data)
//                        {
//                          console.log("entered in the comments ajax");
//                                   var comment=newCommentDom(data.data.comment);
//                                   $(`#commentContainer${data.data.comment.post}`).prepend(comment);
//                                  // console.log("value of post id",comment);
//                                   console.log("value inside the comment",data.data.comment.post);
 
//                        },error:function(err)
//                        {
//                                   console.log("error in adding comment using ajax",err);
//                                   return;
//                        }
 
                       
//             })
 
 
//             })
//            })



          
//    }


//    var newCommentDom=function(comments)
//    {
//        return $(`<li>

//                                         <p>${comments.content}</p>
                                        
                                        
                                    
//                                          <a href="/post/comment/destroy/${comments._id}">X</a>
       
                                        
                                                  
                                     
//                                         <small>${comments.user.name}</small> 
       
//        </li>`)
//    }




//    commentCreate();

// }