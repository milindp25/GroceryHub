import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useEffect, useState } from "react";
import { publicRequest } from "../../redux/ApiRequest";

const Featured = () => {

  const [dailySale,setDailySale] = useState();
  let target = Number(800);
  useEffect(() => {
    const getUsers = async () => {
        try{
          let today = new Date()
          let date = parseInt(today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear()
            const resp = await publicRequest.get(`/orders/getDailyRevenue?date=${date}`);
            console.log(Number(resp.data[0].total_sale))
            setDailySale(Number(resp.data[0].total_sale));  
        }
        catch(err)
        {   
            throw err;}
    };
    getUsers();
},[]);
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={Number(dailySale)/Number(target)*100} text={Math.round(Number(dailySale)/Number(target)*100)+ "%"} strokeWidth={5} />
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">${dailySale}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            {Number(target) > Number(dailySale) ? (<div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">${target-dailySale}</div>
            </div>)  :(
              <div className="itemResult positive">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">${dailySale-target}</div>
            </div>
            )}
            
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">${4800}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">$9800</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
