const mySQL = require("mysql");

var con = mySQL.createConnection({
    host: "34.173.213.55",
    user: "milind",
    password: "password",
    database :"groceryhub",
    multipleStatements: true
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("DB Connected!");
  });


module.exports = con;
