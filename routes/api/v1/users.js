const express=  require("express");
const router=express.Router();

const user_api=require("../../../controllers/api/v1/users_api");

router.post("/create-session",user_api.createSession);



module.exports=router;