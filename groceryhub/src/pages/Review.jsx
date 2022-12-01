import React, { useEffect, useState } from 'react';
import { Navbar1 } from '../components/Navbar1';
import {
  Card,
  CardSubtitle,
  CardText,
  CardTitle,
  CardBody,
  CardImg,
} from "reactstrap";
import ReviewForm from '../components/ReviewForm';
import { publicRequest } from '../redux/ApiRequest';
import RatingStar from '../components/RatingStar';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
export const Radio = styled.input`
   display: none;
`
export const Rating = styled.div`
   cursor: pointer;
`


const Review = ({productID}) => {


  const [allReviews,setAllReviews] = useState([]);
  const [product,setProduct] = useState({});

  const id = useLocation().pathname.split("/reviews/")[1];
  console.log(allReviews.length)
  useEffect(() => {
        
    const getReviews = async () => {
        try{
            const resp = await publicRequest.get(`reviews/fetchReviews?id=${id}`);
            setAllReviews(resp.data);
        }
        catch(err)
        {   console.log(err);
            throw err;}
    };  
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/find?id=${id}`);
        setProduct(res.data);
        console.log(product);
      } catch {}
    };
    getProduct();
    getReviews();
  },[id]);
  

  
  return (
    <>
    <Navbar1 />
    <Card>
   <CardBody>
       <CardTitle tag="h1" style={{alignItems:"center",textAlign:"center",fontWeight:"bold",color:"darkviolet"}}>Reviews Page</CardTitle>
       <div className="row">
        <div className="column"  style={{float:"left",width:"50%"}}>
            <CardImg
               className="avatar"
               src=
                {product[0] ? product[0].prod_img : product.prod_img}
               alt="user avatar"
               style={{width:"400px",height:"400px",alignContent:"center",justifyContent:"center",display:"block",marginLeft: "auto",marginRight:"auto"}}
             />
             <br/>
             <h2 style={{alignContent:"center",justifyContent:"center",textAlign:"center"}}>{product[0] ? product[0].prod_name : product.prod_name}</h2>
             </div>

             <div className="column" style={{float:"right",width:"50%"}}>
             <ReviewForm />
             </div>
            {allReviews.length > 0 ? (allReviews.map((items) =>(
              <>
              <div className="item" style={{justifyContent:"center",alignItems:"center",display:"flex",marginTop:"50px"}}>
              <img
              src={items.userPic}
              alt=""
              className="avatar"
              style={{width:"50px",height:"50px"}}
              />
              <CardSubtitle className="mb-2 text-muted" tag="h2" style={{color:"deepskyblue"}}>
              {items.firstName} {items.LastName}
             </CardSubtitle>
             </div>
             <br />
             <div>
              <RatingStar rating ={items.rating} />
              </div>
              <div style={{justifyContent:"center",alignItems:"center",display:"flex"}}>
             <CardText tag="h4">
               {items.reviews}
             </CardText>
           </div>
           <div style={{justifyContent:"center",alignItems:"center",display:"flex"}}>
           <CardText>
             <h4 className="text-muted text-bold" >
               {items.date}
             </h4>
           </CardText>
           </div>
           <br/>
           <br/>

           </>
            ))) :
            (<>
            <h3>NO Reviews Found</h3>
            </>)}
            
           </div>
       </CardBody>
     </Card>
    </>
  );
}

export default Review