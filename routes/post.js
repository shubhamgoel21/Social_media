const express=  require("express");
const res = require("express/lib/response");
const passport=require("passport");
const router=express.Router();
const postController=require("../controllers/postController");


router.use('/comment',require("./comment"));

router.post('/create',passport.checkAuthentication,postController.create);

router.get('/destroy/:id',passport.checkAuthentication,postController.destroy);



module.exports=router;