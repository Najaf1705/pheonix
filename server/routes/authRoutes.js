const express=require('express');
const router=express.Router();
const authController=require('../controllers/authController');


router.get('/authRouteTest', (req,res)=>{
    res.send("Hello i am aythRouteTest");
});

router.post('/userEntry', authController.userEntry);
router.patch('/addUserName', authController.addUserName);

module.exports=router;