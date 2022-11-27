const { Passport } = require('passport');
const User=require('../models/users');
const Post=require("../models/post");
const router = require('../routes');
const fs=require("fs");
const path=require("path");

module.exports.signin=function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect("/users/home");
    }
    return res.render('signin');
}
module.exports.signup=function(req,res)
{
         if(req.isAuthenticated())
        {
            return res.redirect("/users/home");
        }

   return res.render('signup');

}


module.exports.create= async function(req,res)
{
    console.log(req.body);


    try{

        if(req.body.password!=req.body.confirm)
        {
            // alert("invalid Details");
            // console.log("htffu");
            req.flash("error","INVALID CREDENTIALS");
            return res.redirect('/users/signup');
        }
       
        let user= await User.findOne({email:req.body.email});
        
        if(!user)
        {
            // console.log(`user created `,user);

            user= await User.create(req.body);
            req.flash("success","user created successfully");
        }
        return res.redirect('/users/signin');
    }
    catch(err)
    {
        if(err)
        {
            console.log("err");
            return;
        }
    }
   
}

module.exports.createSession=function(req,res)
{
    req.flash('success','Logged in Successfully');

    return res.redirect('/users/home');
}


// module.exports.createSession=async function(req,res)
// {
//     try{
//         let user= await User.findOne({email:req.body.email});
//         console.log("users details ",user);
//         // if(user)
//         // {
//         //     return res.redirect('/users/home');
//         // }
//         if(!user)
//         {
//             return res.redirect('/users/signup');
//         }
//         else
//         {
//             if(user.password!=req.body.password)
//             {
//                 console.log("Invaild Credentials");
              
//               return res.redirect('back');
//             }
//             else{
             
//                 res.cookie('user_id',user.id);
//                 return res.redirect('/users/profile');
//             }
            
//         }
            
       
        
//     }
//     catch(err)
//     {
//         console.log("error in signing in");
//     }
// }

module.exports.home=function(req,res)
{
  Post.find({})
  .sort('-createdAt')
  .populate('user')
  .populate(
    {
        path:'comment',
        populate:{
            path:'user',
        }
    }
  )
  .exec(function(err,post)
  {
    User.find({},function(err,users)
    {
        if(err)
        {
            console.log("error in user  controller,home");
            return res.redirect("back");
        }
        return res.render('home',{
            email:req.body.email,
            name:req.body.name,
            post:post,
            users:users,
        });

    })


  })

    // Post.find({},);
  
}

module.exports.profile=function(req,res){
    console.log(req.params.id);
    if(req.user){
        return res.render('profile',
        {
            profile_user_id : req.params.id,
        });
    }
    return res.redirect('/users/signin');
}



// module.exports.profile=(req,res)=>{
//     if(req.cookies.user_id){
//         User.findById(req.cookies.user_id,function(err,user){
//             if(user){
//                 return res.render('profile',{
//                     title:"User Profile",
//                     user:user,
//                 })
//             }
//             return res.redirect('/users/signin');

//         });
//     }
//     else{
//         return res.redirect('/users/signin');
//     }
// }

module.exports.signout=function(req,res)
{
    
        
        req.logout(function(err) {
            if (err) { return next(err); }
        });
      
        req.flash("success","logged out succesfully");
        return res.redirect('/users/signin');
   
    
}


module.exports.update=async function(req,res)
{
    let id=req.params.id;

  if(req.user.id==id)
  {
    // let user= await User.findByIdAndUpdate(id,req.body);
    let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if (err) {console.log('*****Multer Error: ', err)}
                
                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file){

                    if (user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }


                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                req.flash("success","info updated successfully");
                return res.redirect('back');




  })
}

    // return res.redirect("back");


}