const express = require("express");
const app = express();
const dbConfig = require("dotenv");
const cors = require('cors');
const products = require("./routes/Products");
const register = require("./routes/Registration");
const login = require("./routes/Login");
const orders = require("./routes/Orders")
const users = require("./routes/Users")

dbConfig.config();


app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000','http://localhost:3001']
}));
app.use("/groceryhub",products);    
app.use("/groceryhub/register",register);
app.use("/groceryhub/login",login);
app.use("/groceryhub/orders",orders);
app.use("/groceryhub/users",users);

app.listen(5000,() => {
    console.log("Server is running on port 5000");
})