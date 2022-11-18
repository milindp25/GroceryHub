const router = require("express").Router()
const mysql = require('mysql');

router.get("/getUsers", async (req, resp) => {
    
    const db_con = require("../DB_Connection_Establishment");
    
    var result = db_con.query(`Select * from users `,(err,res,fields) => {
      if (err) 
      {
      resp.status(500).json(err);
      throw err;
      };
      resp.status(200).json(res);
  });
  
    try {
    } catch (err) {
      resp.status(500).json(err);
      throw err;
    }
  });

  router.get("/getUser", async (req, resp) => {

    const db_con = require("../DB_Connection_Establishment");
    const id = req.query.id;
    
    var result = db_con.query(`Select * from users where user_name = '${id}'`,(err,res,fields) => {
      if (err) 
      {
      resp.status(500).json(err);
      console.log(err);
      throw err;
      };
      resp.status(200).json(res);
  });

    try {
    } catch (err) {
      resp.status(500).json(err);
    }
  });

router.post("/deleteUser", async (req, resp) => {

   

    const db_con = require("../DB_Connection_Establishment");
    const id = req.query.id;
    
    var result = db_con.query(`Delete from users where user_name ='${id}'`,(err,res,fields) => {
      if (err) 
      {
      resp.status(500).json(err);
      console.log(err);
      throw err;
      };
      resp.status(200).json(res);
  });
  
    try {
    } catch (err) {
      resp.status(500).json(err);
    }
  });

  router.post("/updateUser", async (req, resp) => {

     // user_name : req.body.user.userName,user_category : req.body.user.userCategory,password : CryptoJS.AES.encrypt(req.body.user.password,process.env.AES_KEY).toString(),
    //     email_id : req.body.user.email,first_name : req.body.user.fname , last_name : req.body.user.lname ,
    //     address : req.body.user.address ,city : req.body.user.city ,state : req.body.user.state ,zip : req.body.user.zip ,mobileNumber : req.body.user.mobileNumber,img_url : req.body.user.url

    const db_con = require("../DB_Connection_Establishment");
    const id = req.query.id;
    
    var result = db_con.query(`update users set first_name = '${req.body.user.fname}', last_name= '${req.body.user.lname}',email_id = '${req.body.user.email}'
    ,address= '${req.body.user.address}',city = '${req.body.user.city}',state= '${req.body.user.state}',zip= '${req.body.user.zip}',mobileNumber = '${req.body.user.mobileNumber}',
    img_url = '${req.body.user.url}' where 
     user_name ='${id}'`,(err,res,fields) => {
      if (err) 
      {
      resp.status(500).json(err);
      console.log(err);
      throw err;
      };
      console.log("User updated");
      resp.status(200).json(res);
  });
  
  });


module.exports = router;