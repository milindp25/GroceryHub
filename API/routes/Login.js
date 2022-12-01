const router = require("express").Router()
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const mysql = require('mysql');


router.post("/checkUser",(req,resp) => {

    const db_con = require("../DB_Connection_Establishment");
        const userName = req.body.userName;
        console.log("Entered Login API side");
        console.log("UserName is " + userName);
        var result = db_con.query(`Select * from users where upper(user_name) =${mysql.escape(userName.toUpperCase())}`,(err,res) => {
        if (err) 
        {
        resp.status(500).json(err);
        console.log(err);
        throw err;
        };
        if(res.length <= 0)
        {
           
            resp.status(401).json(res.concat({responseCode : '401' , message : 'User not found'}));
        }
        else
        {
            var encrypted_Password ="";
            
            res.forEach(row => {
                console.log("Password is " +  row.password);
                encrypted_Password = row.password;
            });

            const original_Password = CryptoJS.AES.decrypt(encrypted_Password,"J@NcRfUj").toString(CryptoJS.enc.Utf8);
            if(req.body.password === original_Password)
            {
	    	    const accessToken = jwt.sign(
                {
                    id: res[0].User_id,
                    isAdmin: 'N',
                },
                "TEST",
                {expiresIn:"3d"}
                );
                const { password, ...others } = res[0];
                resp.status(200).json({...others, accessToken});
            }
            else
            {
                resp.status(401).json(err);
            }

        }
      }); 
    
});


module.exports = router;