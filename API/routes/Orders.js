const router = require("express").Router()
const jwt = require("jsonwebtoken");
const mysql = require('mysql');

router.get("/getOrderID", async (req, resp) => {

    const db_con = require("../DB_Connection_Establishment");
    
    var result = db_con.query(`select IFNULL(max(orderID)+1,1) as order_id from orders`,(err,res,fields) => {
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
        total : req.body.amount,
        delivery_or_pickup : req.body.shippingAddress.del_pic};
        db_con.query('Insert into orders SET ?',orderDetails,(err,res) => {
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
            queries += mysql.format(`UPDATE products SET quantity = quantity-'${item.quantity}' WHERE prod_id = '${item.productId}'; `);
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

router.get("/fetchAllOrders", async (req, resp) => {

  const db_con = require("../DB_Connection_Establishment");
  
  var result = db_con.query(`select o.*,u.img_url from orders o , users u where o.customer_username = u.user_name`,(err,res,fields) => {
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

router.post("/updateDelivery", async (req, resp) => {

  const db_con = require("../DB_Connection_Establishment");
  const id = req.query.id;
  console.log(id);
  
  var result = db_con.query(`update orders
                              set order_status = CASE
                              WHEN order_status ='Order Placed' and delivery_or_pickup ='D' THEN  'Ready for Delivery'
                              WHEN order_status ='Order Placed' and delivery_or_pickup ='p' THEN  'Ready for Pickup'
                              WHEN order_status ='Ready for Delivery' THEN  'Out for delivery'
                              WHEN order_status ='Out for delivery' THEN 'Delivered'
                              WHEN order_status ='Ready for Pickup' THEN 'Order Picked Up'
                              ELSE order_status
                              END
                              where orderId =${id}`,(err,res,fields) => {
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

router.get("/fetchSingleOrder", async (req, resp) => {

  const db_con = require("../DB_Connection_Establishment");
  const id = req.query.id;
  
  
  var result = db_con.query(`select od.productId,prod_img,prod_name,prod_cat,totalPrice* od.quantity as totalPrice,od.quantity from orders o , order_details od ,products p where o.orderID = od.orderID and od.productId = p.prod_id
                              and o.orderID = ${id}`,(err,res,fields) => {
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

router.post("/deleteProduct", async (req, resp) => {

  const db_con = require("../DB_Connection_Establishment");
  const id = req.query.id;
  const prod_id = req.query.prod_id;
  
  var result = db_con.query(`delete from order_details where orderID = ${id} and productId = ${prod_id}`,(err,res,fields) => {
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
router.get("/fetchAllDeliveryOrders", async (req, resp) => {

  const db_con = require("../DB_Connection_Establishment");
  
  var result = db_con.query(`select o.*,u.img_url from orders o , users u where o.customer_username = u.user_name and order_status not in ('Delivered','Order Placed') and delivery_or_pickup not in ('P')`,(err,res,fields) => {
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

router.get("/fetchAllPickupOrders", async (req, resp) => {

  const db_con = require("../DB_Connection_Establishment");
  
  var result = db_con.query(`select o.*,u.img_url from orders o , users u where o.customer_username = u.user_name and order_status not in ('Delivered','Order Placed') and delivery_or_pickup not in ('D')`,(err,res,fields) => {
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

router.post("/markDelivered", async (req, resp) => {

  const db_con = require("../DB_Connection_Establishment");
  const id = req.query.id;
  console.log(id);
  
  var result = db_con.query(`update orders
                              set order_status = 'Delivered'
                              where orderId =${id}`,(err,res,fields) => {
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

router.get("/fetchLatestOrders", async (req, resp) => {

  const db_con = require("../DB_Connection_Establishment");
  const id = req.query.id;
  
  
  var result = db_con.query(`select o.*,u.img_url,u.first_name,u.last_name from orders o ,users u where o.customer_username = u.user_name order by orderID desc limit 10 `,(err,res,fields) => {
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
router.get("/getTotalSale", async (req, resp) => {

  const db_con = require("../DB_Connection_Establishment");
  
  var result = db_con.query(`select sum(total) as total_sale from orders`,(err,res,fields) => {
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

router.get("/getDailyRevenue", async (req, resp) => {

  const db_con = require("../DB_Connection_Establishment");

  const date = req.query.date;
  console.log(date);
  
  var result = db_con.query(`select sum(total) as total_sale from orders where order_Date = '${date}'`,(err,res,fields) => {
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
module.exports = router;