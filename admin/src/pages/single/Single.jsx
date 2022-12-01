import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useEffect, useState } from "react";
import { publicRequest } from "../../ApiRequest";
import { useLocation } from "react-router-dom";

const Single = () => {

  const id = useLocation().pathname.split("/users/")[1];
  const [user,setUser] = useState({});
  console.log(id);

  useEffect(() => {
    const getSelectedUser = async () => {
      try {
        const res = await publicRequest.get(`/users/getUser?id=${id}`);
        setUser(res.data);
      } catch {}
    };
    getSelectedUser();
    
  }, [id]);

  console.log(user);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={user[0] ? user[0].img_url : user.img_url}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{user[0] ? user[0].first_name : user.first_name} {user[0] ? user[0].last_name : user.last_name}</h1>
                <div className="detailItem">
                  <span className="itemKey">User Name:</span>
                  <span className="itemValue">{user[0] ? user[0].user_name : user.user_name}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{user[0] ? user[0].email_id : user.email_id}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{user[0] ? user[0].mobileNumber : user.mobileNumber}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                  {user[0] ? user[0].address : user.address} , {user[0] ? user[0].city : user.city} , {user[0] ? user[0].state : user.state}, {user[0] ? user[0].zip : user.zip}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">USA</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} 
            title="User Spending ( Last 4 Months)" 
            element={"User"}
            id = {id}
            />
          </div>
        </div>
        <div className="bottom">
        {/* <h1 className="title">Last Transactions</h1>
          <List/> */}
        </div>
      </div>
    </div>
  );
};

export default Single;
