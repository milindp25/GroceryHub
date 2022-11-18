import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import Select from 'react-select';
import { publicRequest } from "../../ApiRequest";
import { v4 } from "uuid";
import styled from 'styled-components';
import { storage } from "../../firebase/Firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useEffect } from "react";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [url, setUrl] = useState("");
  const [userCategory,setUserCategory] = useState();

  const [userName,setUserName] = useState();
  const [password,setPassword] = useState();
  const [firstName,setFirstName] = useState();
  const [lastName,setLastName] = useState();
  const [email,setEmail] = useState();
  const [mobile,setMobile] = useState();
  const [address,setAddress] = useState();
  const [city,setCity] = useState();
  const [sate,setState] = useState();
  const [zip,setZip] = useState();


  const category = [{
    value : "Customer",
    label : "Customer"
  },
  {
    value : "Admin",
    label : "Admin"
  },
  {
    value : "Delivery",
    label : "Delivery"
  },
];

const addUser = async () => {
  const user = {
    userName : userName,
    userCategory : userCategory,
    password : password,
    email : email,
    fname : firstName,
    lname : lastName,
    address : address,
    city : city,
    state : sate,
    zip : zip,
    mobileNumber : mobile,
    url : url
  }      
  console.log(user);
  try {
    const res = await publicRequest.post("/register/addNewUser", {
      user
    });
    console.log("Resp is  " +res.data);
  } catch {}
  alert("Product added succefully");
  window.location.reload(true);
};

useEffect(() => {
  if(url !=="")
  addUser();
},[url]);

const handleUpload = (e) => {

  e.preventDefault();
  const storageRef = ref(storage, `users/${file.name + v4()}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on("state_changed",
    (snapshot) => {
      const progress =
        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      // setProgresspercent(progress);
    },
    (error) => {
      alert(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setUrl(downloadURL);
      });
    }
  );
  console.log("url is " + url);
  //addProduct();

  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput" >
                  <label> User Name </label>
                  <input type="text" key="username"  style={{fontSize:"16px"}} placeholder="Enter Username" value = {userName} onChange={(event)=> setUserName(event.target.value)} />
              </div>
              <div className="formInput" >
                  <label> Password </label>
                  <input type="password" placeholder="Enter password" style={{fontSize:"16px"}} value = {password} onChange={(event)=> setPassword(event.target.value)} />
                </div>
                <div className="formInput" >
                  <label style={{color:"darkblue",fontWeight:"bold",marginBottom:"10px"}}> User Category </label>
                  <Select  options={category}  
                  value = {category.filter(function(option) 
                    {return option.value === userCategory;})} 
                    onChange={(event)=> setUserCategory(event.value)} 
                    style={{width:"150px",height:"30px",fontSize:"16px",textAlign:"left",fontWeight:"bold"}}>
                  </Select>
                </div>
              <div className="formInput" >
                  <label> First Name  </label>
                  <input type="text" placeholder="Enter First Name " style={{fontSize:"16px"}}  value = {firstName} onChange={(event)=> setFirstName(event.target.value)}/>
                </div>
              <div className="formInput" >
                  <label> Last Name  </label>
                  <input type="text" placeholder="Enter Last Name " style={{fontSize:"16px"}} value = {lastName} onChange={(event)=> setLastName(event.target.value)} />
              </div>
              <div className="formInput" >
                  <label> Email </label>
                  <input type="text" placeholder="Enter Email " style={{fontSize:"16px"}} value = {email} onChange={(event)=> setEmail(event.target.value)} />
              </div>
              <div className="formInput" >
                  <label> Mobile Number</label>
                  <input type="number" placeholder="Enter mobile number " style={{fontSize:"16px"}} value = {mobile} onChange={(event)=> setMobile(event.target.value)}  />
              </div>
              <div className="formInput" >
                  <label> Address </label>
                  <input type="text" placeholder="Enter address " style={{fontSize:"16px"}}  value = {address} onChange={(event)=> setAddress(event.target.value)}/>
              </div>
              <div className="formInput" >
                  <label> City </label>
                  <input type="text" placeholder="Enter city name " style={{fontSize:"16px"}} value = {city} onChange={(event)=> setCity(event.target.value)}/>
              </div>
              <div className="formInput" >
                  <label> State </label>
                  <input type="text" placeholder="Enter state name " style={{fontSize:"16px"}} value = {sate} onChange={(event)=> setState(event.target.value)} />
              </div>
              <div className="formInput" >
                  <label> Zip </label>
                  <input type="text" placeholder="Enter zip code " style={{fontSize:"16px"}} value = {zip} onChange={(event)=> setZip(event.target.value)} />
              </div>
              <br/>
              <br/>
              <br/>
              <button onClick={handleUpload}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
