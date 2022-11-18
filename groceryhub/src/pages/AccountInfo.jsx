import React, { useEffect, useState } from 'react';
import { Footer } from '../components/Footer';
import { Navbar1 } from '../components/Navbar1';
import "../css/Account.css";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useSelector } from 'react-redux';
import { storage } from "../firebase/Firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { publicRequest } from '../redux/ApiRequest';
import { v4 } from "uuid";
import EditIcon from '@mui/icons-material/Edit';

const AccountInfo = () => {

    const {currentUser, isFetching, error } = useSelector((state) => state.user);

    const [file, setFile] = useState("");
    
    const [url, setUrl] = useState("");
    const [finalURL,setFinalURL] = useState("");
    const [firstName,setFirstName] = useState();
    const [lastName,setLastName] = useState();
    const [email,setEmail] = useState();
    const [mobile,setMobile] = useState();
    const [address,setAddress] = useState();
    const [city,setCity] = useState();
    const [sate,setState] = useState();
    const [zip,setZip] = useState();
    const [readable,setReadable] = useState(true);

const updateDetails = (e) =>{
  e.preventDefault();
  if(finalURL !== file)
  {
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
        setFinalURL(downloadURL);
      });
    }
    
  );
  console.log("url is " + url);
}
    else
    addUser();
    };
const addUser = async () => {
        const user = {
          email : email,
          fname : firstName,
          lname : lastName,
          address : address,
          city : city,
          state : sate,
          zip : zip,
          mobileNumber : mobile,
          url : finalURL
        }      
        console.log(user);
        try {
          const res = await publicRequest.post(`/users/updateUser?id=${currentUser.user_name}`, {
            user
          });
          console.log("Resp is  " +res.data);
        } catch {}
        alert("User details updated succefully");
        window.location.reload(true);
      };

  useEffect(() =>{
      if(finalURL !== file)
        addUser();
    },[finalURL]);

    console.log(currentUser);
    useEffect(() =>{
        const setData = () =>{
            console.log(currentUser);
            setFirstName(currentUser.first_name);
            setLastName(currentUser.last_name);
            setEmail(currentUser.email_id);
            setAddress(currentUser.address);
            setCity(currentUser.city);
            setState(currentUser.state);
            setZip(currentUser.zip);
            setMobile(currentUser.mobileNumber);
            setUrl(currentUser.img_url);
            setFile(currentUser.img_url);
            setFinalURL(currentUser.img_url);
        };
        if(currentUser !== null)
        setData();
    },[currentUser]);



  return (
    <>
    <Navbar1 />
    <div class="container rounded bg-white mt-5 mb-5">
    <div class="row">
        <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
        {file ===url ? (<img class="rounded-circle mt-5" width="150px" 
        src={url} />) : (<img
            class="rounded-circle mt-5" width="150px"
             src={
               file
                 ? URL.createObjectURL(file)
                 : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
             }
             alt=""
           />)}
        
        {/* <span class="font-weight-bold">Edogaru</span><span class="text-black-50">edogaru@mail.com.my</span><span> </span> */}
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
              <br/>
              
        </div>
        </div>
        <div class="col-md-5 border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">User Details</h4>
                    <button><EditIcon onClick={() => setReadable(false)}/></button>
                </div>
                
                <div class="row mt-2">
                    <div class="col-md-6"><label class="labels">First Name</label>
                    <input type="text" class="form-control" placeholder="first name" value={firstName} onChange={(event)=> setFirstName(event.target.value)} readOnly={readable}/></div>
                    <div class="col-md-6"><label class="labels">Last Name</label>
                    <input type="text" class="form-control" value={lastName} placeholder="Last Name" onChange={(event)=> setLastName(event.target.value)}  readOnly={readable}/></div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12"><label class="labels">Email ID</label>
                    <input type="text" class="form-control" placeholder="enter email id" value={email} onChange={(event)=> setEmail(event.target.value)} readOnly={readable} /></div>
                    <div class="col-md-12"><label class="labels">Address Line 1</label>
                    <input type="text" class="form-control" placeholder="enter address line 1" value={address} onChange={(event)=> address(event.target.value)} readOnly={readable} /></div>
                    <div class="col-md-12"><label class="labels">City</label>
                    <input type="text" class="form-control" placeholder="Enter city name" value={city} onChange={(event)=> setCity(event.target.value)} readOnly={readable} /></div>
                    <div class="col-md-12"><label class="labels">State</label>
                    <input type="text" class="form-control" placeholder="Enter state name" value={sate} onChange={(event)=> setState(event.target.value)} readOnly={readable} /></div>
                    <div class="col-md-12"><label class="labels">Zip code</label>
                    <input type="text" class="form-control" placeholder="Zip code" value={zip} onChange={(event)=> setZip(event.target.value)} readOnly={readable} /></div>
                    <div class="col-md-12"><label class="labels">Mobile Number</label>
                    <input type="text" class="form-control" placeholder="enter phone number" value={mobile} onChange={(event)=> setMobile(event.target.value)} readOnly={readable} /></div>
                </div>
                <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button" onClick={updateDetails}>Save Profile</button></div>
            </div>
        </div>
</div>
</div>
<Footer />
    </>
  )
}

export default AccountInfo