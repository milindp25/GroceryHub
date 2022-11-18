import React from 'react';
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { publicRequest } from '../redux/ApiRequest';
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { addProduct } from '../redux/reduxCart';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { Navbar1 } from '../components/Navbar1';
import { Footer } from '../components/Footer';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import {useSelector} from "react-redux";
import "../css/ProductPage.css";
import Modal from 'react-bootstrap/Modal';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
  color : darkblue;
  justify-content: center;
  align-items : center;
`;

const Desc = styled.h3`
  margin: 60px 100px;
  display: flex;
  color : green;
  align-items : center;
`;

const Price = styled.div`
  font-weight: bold;
  font-size: 40px;
  align-items: center;
  justify-content: center;
  color : red;
  margin: 0px 150px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.select`
margin-left: 10px;
padding: 5px;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const FilterColorOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px 100px;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 70px;
  height: 70px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button1 = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: darkgoldenrod;
  cursor: pointer;
  width: 200px;
  font-weight: 500;

  &:hover{
      background-color: green;
  }
`;




const ProductPage = () => {

  const id = useLocation().pathname.split("/product/")[1];
  console.log(id);
  const [product,setProduct] = useState({});
  const [cartedQuantity,setcartedQuantity] = useState(1);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const cart = useSelector(state => state.cart);

  console.log(cart.products.length);

  const [cartId,setCartId] = useState();

  useEffect(() =>{
    setCartId(cart.size)
  },[cart])


  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/find?id=${id}`);
        setProduct(res.data);
        console.log(product);
      } catch {}
    };
    getProduct();
    
  }, [id]);

  console.log(product);
  const handleQuantityChange=(type) =>{
    if(type ==='Minus')
      cartedQuantity > 1 && setcartedQuantity(cartedQuantity-1);
    else 
    setcartedQuantity(cartedQuantity + 1); 
  }

  const handleCartClick = () =>{
    // if(color ==='' || size ==='')
    // {swal("Enter the deatils to proceede");}
    // else
    dispatch(
      addProduct({...product, cartedQuantity,cartId})
    )
    setShow(!show);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(!show);

  return (
    <>
    <Container>
      <Navbar1 />

  <main class="container">
 <div class="left-column">
   <img data-image="red" class="active" src={product[0] ? product[0].prod_img : product.prod_img} alt="" />
 </div>
 <div class="right-column">
   <div class="product-description">
     <span>{product[0] ? product[0].prod_cat : product.prod_cat}</span>
     <h1>{product[0] ? product[0].prod_name : product.prod_name}</h1>
     <p>{product[0] ? product[0].prod_Description : product.prod_Description}</p>
   </div>
   <div class="product-configuration">
     {/* <div class="product-color">
       <span>Color</span>
       <div class="color-choose">
         <div>
           <input data-image="red" type="radio" id="red" name="color" value="red" checked />
           <label for="red"><span></span></label>
         </div>
         <div>
           <input data-image="blue" type="radio" id="blue" name="color" value="blue" />
           <label for="blue"><span></span></label>
         </div>
         <div>
           <input data-image="black" type="radio" id="black" name="color" value="black" />
           <label for="black"><span></span></label>
         </div>
       </div>
     </div> */}
     {/* <div class="cable-config">
       <span>Cable configuration</span>

       <div class="cable-choose">
         <button>Straight</button>
         <button>Coiled</button>
         <button>Long-coiled</button>
       </div>

       <a href="#">How to configurate your headphones</a>
     </div> */}
   </div>
   <div class="product-price">
     <span>$ {product[0] ? product[0].prod_price : product.prod_price}</span>
   </div>
   <div class="product-price">
   <Remove style = {{width : "50px",height : "50px",fill : "red"}} onClick={() => handleQuantityChange("Minus")}/>
   <Amount style={{marginTop : "30px",marginLeft:"10px"}}>{cartedQuantity}</Amount>
   <Add style = {{width : "50px",height : "50px",fill : "green",marginLeft:"-10px"}}  onClick={() => handleQuantityChange("Add") }/>
   </div>
   <div class="product-price">
   <button class="cart-btn" onClick={handleCartClick} >Add to cart</button>
   </div>
 </div>
</main>
<Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" style={{width:"1000px",opacity:"0.95"}}>
        <Modal.Header closeButton>
          <Modal.Title>Product added successfully</Modal.Title>
        </Modal.Header>
      </Modal>
    </Container>
    <Footer />
    </>

  )
}

export default ProductPage