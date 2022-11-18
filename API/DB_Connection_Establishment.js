const mySQL = require("mysql");

var con = mySQL.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database :"groceryhub"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("DB Connected!");
  });


module.exports = con;
