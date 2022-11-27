const express=  require("express");
const res = require("express/lib/response");
const passport = require("passport");
const router=express.Router();
const userController=require("../controllers/userController");
// const passport=require('passport');

router.post('/create',userController.create);
router.get('/signin',userController.signin);
router.get('/signup',userController.signup);
router.get('/signout',userController.signout);

// router.post('/create-session',userController.createSession);
router.post('/createSession',
passport.authenticate('local', { failureRedirect: '/user/signin' })

,userController.createSession);

router.get('/home',userController.home);
router.get('/profile/:id',passport.checkAuthentication,userController.profile);

router.post('/update/:id',passport.checkAuthentication,userController.update);

router.get("/auth/google",passport.authenticate('google',{scope:['email','profile']}));



router.get("/auth/google/callback",passport.authenticate("google",{failureRedirect:'/users/signin'}),userController.createSession);


module.exports=router;