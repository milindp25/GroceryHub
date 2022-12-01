import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect, useState } from "react";
import { publicRequest } from "../../ApiRequest";

const Widget = ({ type }) => {
  let data;
  const [users,setUsers] = useState();
  const [orders,setOrders] = useState();
  const [saleTotal,setSaleTotal] = useState();
  useEffect(() => {
        
    const getUsers = async () => {
        try{
            const resp = await publicRequest.get(`/users/getUsers`);
            setUsers(resp.data.length);  
        }
        catch(err)
        {   
            throw err;}
    };
    const getOrders = async () => {
      try{
          const resp = await publicRequest.get(`/orders/getOrderID`);
          setOrders(Number(resp.data[0].order_id)-1);  
      }
      catch(err)
      {   
          throw err;}
  };
  const getTotalSale = async () => {
    try{
        const resp = await publicRequest.get(`/orders/getTotalSale`);
        setSaleTotal(Number(resp.data[0].total_sale));  
    }
    catch(err)
    {   
        throw err;}
  };
    getUsers();
    getOrders();
    getTotalSale();  
},[]);

  //temporary
  let amount = 100;
  let diff = 20;

  switch (type) {
    case "user":
      amount = users;
      diff = 10;
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      diff = 11.5;
      amount = orders;
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      diff = 8.6;
      amount = saleTotal;
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      diff = 7.8;
      amount = saleTotal;
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
