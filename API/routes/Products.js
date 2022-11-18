const router = require("express").Router()
const mysql = require('mysql');

// Fetch all Prodct categories

router.get("/getProductCategory", async (req, resp) => {
    
    const db_con = require("../DB_Connection_Establishment");
    
    var result = db_con.query(`Select * from product_category`,(err,res,fields) => {
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

  router.get("/getCategory", async (req, resp) => {
    
    const db_con = require("../DB_Connection_Establishment");
    
    var result = db_con.query(`Select prod_category as value, prod_category as label from product_category`,(err,res,fields) => {
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

  router.get("/products", async (req, resp) => {
    
    const db_con = require("../DB_Connection_Establishment");
    const qCategory = req.query.category == undefined ? "" : req.query.category;
    
    var result = db_con.query(`Select *,ROW_NUMBER() OVER(PARTITION BY prod_id) AS row_num from products where quantity > 0 and  prod_cat like ?`, '%' + qCategory + '%',(err,res,fields) => {
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

router.get("/find", async (req, resp) => {

    const db_con = require("../DB_Connection_Establishment");
    const id = req.query.id;
    
    var result = db_con.query(`Select * from products where prod_id =${id}`,(err,res,fields) => {
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

router.post("/addProduct",(req,resp) => {

    const db_con = require("../DB_Connection_Establishment");
    console.log("Enter Reg");

    const userDetails = {
        prod_name : req.body.prods.name,
        prod_cat : req.body.prods.category,
        prod_price : req.body.prods.price,
        prod_Description : req.body.prods.desc,
        prod_disc : req.body.prods.discount,
        prod_img : req.body.prods.imgURL,
        quantity : req.body.prods.quantity,
        size : req.body.prods.productWeight
      };
         db_con.query('Insert into products SET ?',userDetails,(err,res) => {
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

router.post("/addProduct",(req,resp) => {

  const db_con = require("../DB_Connection_Establishment");
  console.log("Enter Reg");

  const userDetails = {
      prod_name : req.body.prods.name,
      prod_cat : req.body.prods.category,
      prod_price : req.body.prods.price,
      prod_Description : req.body.prods.desc,
      prod_disc : req.body.prods.discount,
      prod_img : req.body.prods.imgURL,
      quantity : req.body.prods.quantity,
      size : req.body.prods.productWeight
    };
       db_con.query('Insert into products SET ?',userDetails,(err,res) => {
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

router.post("/deleteProduct", async (req, resp) => {

  const db_con = require("../DB_Connection_Establishment");
  console.log(req.query);
  const id = req.query.id;
  
  var result = db_con.query(`Delete from products where prod_id =${id}`,(err,res,fields) => {
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

router.get("/popular", async (req, resp) => {
    
  const db_con = require("../DB_Connection_Establishment");

  
  var result = db_con.query(`select a.* from order_details o , products a where o.productId = a.prod_id group by a.prod_id order by count(1) desc limit 6`,(err,res,fields) => {
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





module.exports = router;