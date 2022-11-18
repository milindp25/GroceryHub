const router = require("express").Router()
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const mysql = require('mysql');

router.get("/getOrderID", async (req, resp) => {

    const db_con = require("../DB_Connection_Establishment");
    
    var result = db_con.query(`select max(orderID)+1 as order_id from orders`,(err,res,fields) => {
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

router.post("/placeOrder",(req,resp) => {

    const db_con = require("../DB_Connection_Establishment");

    const orderDetails = {orderID : req.body.orderID,customer_username : req.body.userId ,
        address : req.body.shippingAddress.address ,
        city : req.body.shippingAddress.city ,
        state :req.body.shippingAddress.state ,
        country : req.body.shippingAddress.country, 
        zip : req.body.shippingAddress.zip, 
        customer_name :req.body.shippingAddress.name,
        phoneNumber : req.body.shippingAddress.phoneNumber,
        creditCardName : req.body.cardDetails.creditCardName,
        creditCardNumber : req.body.cardDetails.creditCardNumber,
        order_Date : req.body.shippingAddress.orderDate,
        location_lattitude :  req.body.shippingAddress.latitude,
        location_longitude :  req.body.shippingAddress.longitude,
        total : req.body.amount};
        db_con.query('Insert into ORDERS SET ?',orderDetails,(err,res) => {
        if (err) 
        {
        resp.status(500).json(err);
        throw err;
        };
      }); 
    const db_con2 = require("../DB_Connection_Establishment");
    const orderDetails2 = [];
    req.body.products.map((item)=> {
        orderDetails2.push( {
            orderID : req.body.orderID , 
            productId : item.productId,
            totalPrice : item.productPrice,
            quantity : item.quantity
        })
    })
    console.log(req.body.orderID);
        db_con.query('Insert into order_details values ?',[req.body.products.map(item => [req.body.orderID, item.productId, item.productPrice,item.quantity])],(err,res) => {
            if (err) 
            {
            resp.status(500).json(err);
            throw err;
            };
            console.log("Insert into  Successfull");
          }); 

          var queries = '';
          req.body.products.forEach(function (item) {
            queries += mysql.format(`UPDATE products SET quantity = quantity -${item.quantity} WHERE prod_id = ${item.productId}; `);
          });
          
          db_con.query(queries,(err,res) => {
            if (err) 
            {
            resp.status(500).json(err);
            throw err;
            };
            resp.status(201).json(res);
            console.log("Updation Successfull");
          }); 
    

    
});

module.exports = router;