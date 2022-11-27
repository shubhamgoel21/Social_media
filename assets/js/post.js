{
          let createPost=function()
          {
            // console.log("entered in ajax post");
           let postForm=$('#post_create_form');
           postForm.submit(function(e)
           {
            
                      e.preventDefault();

                      $.ajax({
                                 type:'post',
                                 url:"/post/create",
                                 data:postForm.serialize(),
                                 success:function(data)
                                 {
                                            let post=newpostDom(data.data.post);
                                            $('#post_container').prepend(post);

                                            new PostComment(data.data.post._id);
                                            deletepostDom($(' .post_delete_link',post));
                                          // commentCreate();
                                            // console.log(shubham);
                                            new Noty({
                                                       theme:'relax',
                                                       text:'Post Published',
                                                       type:'success',
                                                       layout:"topRight",
                                                       timeout:1500,
                                                      }).show();

                                            // console.log(data);
                                 },
                                 error:function(error)
                                 {
                                   console.log(error.responseText);
                                 }
                      })

           })
          }

 let newpostDom=function(p)
 {
           // console.log(p);
           return $(`<li id="post-${p._id}">



           <p>${p.content}</p>
                      
           
                      <a class="post_delete_link" href="/post/destroy/${p._id}">X</a>
                    
                      
                                 
                                 <small>${p.user.name}</small>
                             
                                            <form action="/post/comment/create" class="commentCreate" method="Post">
                                                       
                                                       <textarea name="content" cols="30" rows="4"></textarea>
                                                       
                                                       <input type="hidden" name="post" value=" ${p._id}" >
                                                       <input type="submit">
                                            </form>
                                             <div>
                                            <ul id="commentContainer${p._id}">
                                                
                                         </ul>
                                 </div>
                            
                               
           
           </li>`)
 }

 let deletepostDom=function(deleteLink)
 {
  
           $(deleteLink).click(function(e)
           {
                      e.preventDefault();

                      $.ajax({
                                 type:'get',
                                 url:$(deleteLink).prop('href'),
                                 success:function(data)
                                 {
                                  console.log("entered here");
                                            $(`#post-${data.data.post_id}`).remove();
                                            new Noty({
                                                       theme:'relax',
                                                       text:'Post deleted',
                                                       type:'success',
                                                       layout:"topRight",
                                                       timeout:1500,
                                                      }).show();


                                        
                                 },
                                 error:function(err)
                                 {
                                            console.log(err.responseText);
                                 }
                      })

           })

 }

let deleteolderpost=function()
{
           let posts=$('#post_container>li');
           posts.each(function(i,post)
           {
              deletepostDom($(' .post_delete_link',post));

           })
}


 
 deleteolderpost();
          createPost();

}


