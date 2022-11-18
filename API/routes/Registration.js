const router = require("express").Router()
const CryptoJS = require("crypto-js");
const mysql = require('mysql');
router.post("/addNewUser",(req,resp) => {

    const db_con = require("../DB_Connection_Establishment");
    console.log("Enter Reg" + req.body.user);

    const userDetails = {user_name : req.body.user.userName,user_category : req.body.user.userCategory,password : CryptoJS.AES.encrypt(req.body.user.password,process.env.AES_KEY).toString(),
        email_id : req.body.user.email,first_name : req.body.user.fname , last_name : req.body.user.lname ,
        address : req.body.user.address ,city : req.body.user.city ,state : req.body.user.state ,zip : req.body.user.zip ,mobileNumber : req.body.user.mobileNumber,img_url : req.body.user.url};
         db_con.query('Insert into users SET ?',userDetails,(err,res) => {
        if (err) 
        {
        resp.status(500).json({responseCode : '500' , message : 'Error while creating user'});
        console.log(err);
        throw err;
        };
        resp.status(201).json(res);
        console.log("Insert Successfull");
        db_con.commit();
      }); 

    
});


module.exports = router;