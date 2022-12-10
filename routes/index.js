const express=  require("express");
const res = require("express/lib/response");
const router=express.Router();
const homeController=require("../controllers/homeController");

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/post',require("./post"));
router.use('/api',require("./api"));
router.use('/likes',require('./likes'));


module.exports=router;