import "./new.scss";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState,useEffect} from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { publicRequest } from "../../ApiRequest";
import { v4 } from "uuid";
import { storage } from "../../firebase/Firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const Input = styled.input`
  font-size : 16px

`


const NewProd = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [url, setUrl] = useState("");

  const [productCategory, setProductCategory] = useState([]);
  const [productName,setProductName] = useState(); 
  const [prodCategory,setProdCategory] = useState();
  const [prodductPrice,setProdductPrice] = useState();
  const [prodductDesc,setProdductDesc] = useState();
  const [productDisc,setProductDisc] = useState();
  const [productQuantity,setProductQuantity] = useState();
  const [productWeight,setProductWeight] = useState();

    /* fetches all product caretgories*/
    useEffect(() => {
        
        const getProduct = async () => {
            try{
                const resp = await publicRequest.get(`/getCategory`);
                setProductCategory(resp.data);
            }
            catch(err)
            {   console.log(err);
                throw err;}
        };
        getProduct();  
    },[]);

    useEffect(() => {
      if(url !=="")
      addProduct()
    },[url]);

    console.log(productCategory);

    const addProduct = async () => {
      const prods = {
        name : productName,
        category : prodCategory,
        price : prodductPrice,
        desc : prodductDesc,
        discount : productDisc,
        quantity : productQuantity,
        productWeight : productWeight,
        imgURL : url
      }      
      console.log(prods);
      try {
        const res = await publicRequest.post("/addProduct", {
          prods
          
        });
        console.log("Resp is  " +res);
      } catch {}
      alert("Product added succefully");
      window.location.reload(true);
    };

    const handleUpload = (e) => {

    e.preventDefault();
    const storageRef = ref(storage, `products/${file.name + v4()}`);
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
    console.log(url);
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
                <Input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput" >
                  <label style={{color:"darkblue",fontWeight:"bold",marginBottom:"10px"}}> Product Name </label>
                  <Input type="text" placeholder="Enter Product Name" value = {productName} onChange={(event)=> {event.preventDefault();setProductName(event.target.value)}} style={{fontSize : "16px"}} />
              </div>
              <div className="formInput" >
                  <label style={{color:"darkblue",fontWeight:"bold",marginBottom:"10px"}}> Product Category </label>
                  <Select  options={productCategory}  
                  value = {productCategory.filter(function(option) 
                    {return option.value === prodCategory;})} 
                    onChange={(event)=> setProdCategory(event.value)} 
                    style={{width:"150px",height:"30px",fontSize:"16px",textAlign:"left",fontWeight:"bold"}}>
                    {/* {productCategory.map((item) => (
                      <option value={item.value}>{item.label}</option>
                    ))} */}
                  </Select>
                </div>
              <div className="formInput" >
                  <label style={{color:"darkblue",fontWeight:"bold",marginBottom:"10px"}}> Product Price  </label>
                  <Input type="number" value = {prodductPrice} onChange={(event)=> setProdductPrice(event.target.value)} placeholder="Enter Product Price" />
                </div>
              <div className="formInput" >
                  <label style={{color:"darkblue",fontWeight:"bold",marginBottom:"10px"}}> Product Description  </label>
                  <Input type="text" placeholder="Enter Product Description"  value = {prodductDesc} onChange={(event)=> setProdductDesc(event.target.value)}  style={{height:"100px"}} />
              </div>
              <div className="formInput" >
                  <label style={{color:"darkblue",fontWeight:"bold",marginBottom:"10px"}}> Product Discount </label>
                  <Input type="text" placeholder="Enter Discount if any" value = {productDisc} onChange={(event)=> setProductDisc(event.target.value)} />
              </div>
              <div className="formInput" >
                  <label style={{color:"darkblue",fontWeight:"bold",marginBottom:"10px"}}> Product Stock quantity</label>
                  <Input type="number" placeholder="Enter Product quantity" value = {productQuantity} onChange={(event)=> setProductQuantity(event.target.value)} />
              </div>
              <div className="formInput" >
                  <label style={{color:"darkblue",fontWeight:"bold",marginBottom:"10px"}}> Product weight</label>
                  <Input type="number" placeholder="Enter Product weight " value = {productWeight} onChange={(event)=> setProductWeight(event.target.value)} />
              </div>
              <br/>
              <br/>
              <br/>


              {/* {inputs.map((input) => (
                <>
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} />
                </div>
                <br/>
                </>
              ))} */}
              <button onClick={handleUpload}>Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProd;
