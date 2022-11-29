const express=  require("express");
const router=express.Router();
const passport=require("passport");

const postApiController=require("../../../controllers/api/v1/postController");

router.get("/",postApiController.index);
router.delete("/:id",passport.authenticate('jwt',{session:false}),postApiController.delete);



module.exports=router;