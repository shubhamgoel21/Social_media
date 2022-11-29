const express=  require("express");
const router=express.Router();

const postApiController=require("../../../controllers/api/v1/postController");

router.get("/",postApiController.index);
router.delete("/:id",postApiController.delete);



module.exports=router;