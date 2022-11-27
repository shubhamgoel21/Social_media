const express=  require("express");
const res = require("express/lib/response");
const passport=require("passport");
const router=express.Router();
const commentController=require("../controllers/commentController");

router.post('/create',passport.checkAuthentication,commentController.create);


router.get("/destroy/:id",passport.checkAuthentication,commentController.destroy);


module.exports=router;