const router = require("express").Router()
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb+srv://milind:milindp25@groceryhub.5soeh8h.mongodb.net/?retryWrites=true&w=majority";

router.post("/addReview",(req,resp) => {

MongoClient.connect(url, function(err, db) {

    
    if (err) throw err;
    var dbo = db.db("groceryHub");
    var myobj =  { firstName: req.body.review.firstName,lastName : req.body.review.lastName, reviews: req.body.review.reviews,rating : req.body.review.rating,date :  req.body.review.date,
        userPic : req.body.review.userPic,productId : req.body.review.productId}
        dbo.collection("reviews").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: 1");
      db.close();
    });
  });

});

router.get("/fetchReviews",(req,resp) => {

    const id = req.query.id;
    const reviews = [];
    MongoClient.connect(url).then((client) => {
  
        const connect = client.db("groceryHub");
      
        // Connect to collection
        const collection = connect
                .collection("reviews");
      
        collection.find({ "productId": id })
            .toArray().then((ans) => {
                console.log(ans);
                resp.status(200).json(ans);
            });
        
    }).catch((err) => {
      
        // Printing the error message
        console.log(err.Message);
    })
});


module.exports = router;