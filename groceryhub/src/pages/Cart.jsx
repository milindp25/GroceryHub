import React from 'react';
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import {useSelector} from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useState, useEffect } from 'react';
//import STRIPE_PUBLIC_KEY from "../Keys";
//import { userRequest } from '../ApiCall';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar1 } from '../components/Navbar1';
import { Footer } from '../components/Footer';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { removeCart,reduceQuantity,increaseQuantity } from '../redux/reduxCart';
import { useDispatch } from 'react-redux';
import {useRef} from 'react';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;
const Container = styled.div``;

const Cart = () => {

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  console.log(cart);

  const handleCartClick = (cartId) =>{
    // if(color ==='' || size ==='')
    // {swal("Enter the deatils to proceede");}
    // else
    dispatch(
      removeCart({...cart,cartId})
    )
  };

  useEffect(() =>{
    console.log("reset");
  },[cart])

  const handleMinusClick = (cartId,quantity) =>{
    // if(color ==='' || size ==='')
    // {swal("Enter the deatils to proceede");}
    // else
    console.log(cartId,quantity);
    if(quantity === 1){
      dispatch(
        removeCart({...cart,cartId})
      )
    }
    else {
      dispatch(
        reduceQuantity({...cart,cartId})
      )
    }
    // dispatch(
    //   removeCart({...cart,value})
    // )
  };

  const handlePlusClick = (cartId,quantity) =>{
    // if(color ==='' || size ==='')
    // {swal("Enter the deatils to proceede");}
    // else
      dispatch(
        increaseQuantity({...cart,cartId})
      )
    // dispatch(
    //   removeCart({...cart,value})
    // )
  };


  return (
    <>
    <Navbar1 />
        <Container>
          <Wrapper>
              <Title>CHECKEDOUT ITEMS</Title>
              <Top>
                  <TopButton>CONTINUE SHOPPING</TopButton>
                  <TopTexts>
                      <TopText>Shopping Bag({cart.quantity})</TopText>
                      <TopText>Your Wishlist (0)</TopText>
                  </TopTexts>
                  <Link to={`/checkout`}>
                  <TopButton type="filled">CHECKOUT NOW</TopButton>
                  </Link>
              </Top>
              <Bottom>
                  <Info> {cart.products.map(product => (
                    <section key={product.cartId} style={{ backgroundColor: "#eee" }}>
                    <MDBContainer >
                      <MDBRow className="justify-content-center align-items-center ">
                        <MDBCol >
                          <MDBCard className="rounded-3 mb-4">
                            <MDBCardBody className="p-4">
                              <MDBRow className="justify-content-between align-items-center">
                                <MDBCol md="2" lg="2" xl="2">
                                  <MDBCardImage className="rounded-3" fluid
                                    src= {product[0].prod_img} 
                                    alt="Product Image" />
                                </MDBCol>
                                <MDBCol md="3" lg="3" xl="3">
                                  <p className="lead fw-normal mb-2">{product[0].prod_name} </p>
                                  <p>
                                    <span className="text-muted">Size: </span> {product[0].size} oz
                                    <span className="text-muted">Category: </span>{product[0].prod_cat}
                                  </p>
                                </MDBCol>
                                <MDBCol md="3" lg="3" xl="2"
                                  className="d-flex align-items-center justify-content-around">
                                  <MDBBtn color="link" className="px-2" onClick={() => {handleMinusClick(product.cartId,product.cartedQuantity)}}>
                                    <MDBIcon fas icon="minus" />
                                  </MDBBtn>
                  
                                  <MDBInput min={1} value={product.cartedQuantity} type="number" size="lg" /> 
                  
                                  <MDBBtn color="link" className="px-2" onClick={() => {handlePlusClick(product.cartId,product.cartedQuantity)}}>
                                    <MDBIcon fas icon="plus" />
                                  </MDBBtn>
                                </MDBCol>
                                <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                                  <MDBTypography tag="h5" className="mb-0">
                                  {(product[0].prod_price * product.cartedQuantity)}
                                  </MDBTypography>
                                </MDBCol>
                                <MDBCol md="1" lg="1" xl="1" className="text-end">
                                <MDBBtn color="link" className="px-2" onClick={() =>handleCartClick(product.cartId)}>
                                    <MDBIcon fas icon="trash text-danger" size="lg" />
                                    </MDBBtn>
                                </MDBCol>
                              </MDBRow>
                            </MDBCardBody>
                          </MDBCard>
                        </MDBCol>
                      </MDBRow>
                    </MDBContainer>
                  </section>
                          // <Product key = {product.cartId}>               
                          //     <ProductDetail>
                          //         <Image src={product[0].prod_img} />
                          //         <Details>
                          //             <ProductName>
                          //                 <b>Product:</b> 
                          //                 {product[0].prod_name} 
                          //             </ProductName>
                          //             <ProductId>
                          //                 <b>ID:</b> 
                          //                  {product[0].id} 
                          //             </ProductId>
                          //             <ProductSize>
                          //                 <b>Size:</b> 
                          //                {product[0].size} 
                          //             </ProductSize>
                          //         </Details>
                          //     </ProductDetail>
                          //     <PriceDetail>
                          //         <ProductAmountContainer>
                          //         <Remove  style = {{width : "50px",height : "50px",fill : "green"}} onClick={() => {handleMinusClick(product.cartId,product.cartedQuantity)}} />  
                          //             <ProductAmount>  {product.cartedQuantity} 
                          //               </ProductAmount>
                          //             <Add style = {{width : "50px",height : "50px",fill : "green"}} onClick={() => handleMinusClick(product.cartId)}/> 
                          //         </ProductAmountContainer>
                          //         <ProductPrice>$
                          //            {(product[0].prod_price * product.cartedQuantity)} 
                          //           </ProductPrice>
                          //           <Button ref={ref} onClick={() =>handleCartClick(product.cartId)}>
                          //         <RemoveShoppingCartIcon >Remove from cart</RemoveShoppingCartIcon>
                          //         </Button>
                          //     </PriceDetail>
                          // </Product>
                           ))} 
                      <Hr />
                  </Info>
                  <Summary>
                      <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                      <SummaryItem>
                          <SummaryItemText>Subtotal</SummaryItemText>
                          <SummaryItemPrice>$
                             {cart.total} 
                            </SummaryItemPrice>
                      </SummaryItem>
                      <SummaryItem>
                          <SummaryItemText>Estimated Shipping</SummaryItemText>
                          <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                      </SummaryItem>
                      <SummaryItem>
                          <SummaryItemText>Shipping Discount</SummaryItemText>
                          <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                      </SummaryItem>
                      <SummaryItem type="total">
                          <SummaryItemText>Total</SummaryItemText>
                          <SummaryItemPrice>$
                             {cart.total} 
                            </SummaryItemPrice>
                      </SummaryItem>
                      <SummaryItem>
                      <MDBCard className="mb-4">
                            <MDBCardBody className="p-4 d-flex flex-row">
                              <MDBInput label="Discound code" wrapperClass="flex-fill" size="ml" style={{width: "100%"}} />
                              <MDBBtn className="ms-3" color="warning" size="lg" style={{width: "100px",height:"50px",marginLeft: "10px"}}>
                                Apply
                              </MDBBtn>
                            </MDBCardBody>
                          </MDBCard>
                      </SummaryItem>
                      {/* <StripeCheckout
                          name="Shop Cart"
                          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0OpsCLto4sXJMMRg3o_x4Gfe3lwYQ5lwx1A&usqp=CAU"
                          billingAddress
                          shippingAddress
                          description={`Total Amount is ${cart.total}`}
                          amount={cart.total * 100}
                          token={onToken}
                          stripeKey={Key}
                      >
                          <Button>CHECKOUT NOW</Button>
                      </StripeCheckout> */}
                  </Summary>
              </Bottom>
          </Wrapper>
          <Footer />
      </Container></>
  )
}

export default Cart