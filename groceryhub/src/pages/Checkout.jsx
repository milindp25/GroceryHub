import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import {userRequest} from '../redux/ApiRequest';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/reduxCart';
import Select from 'react-select';

const Container = styled.div`

`



const Checkout = () => {

const cart = useSelector(state => state.cart);
const data = useSelector(state => state.data);
const {currentUser} = useSelector((state) => state.user);

const [firstName,setFirstName] = useState("");
const [lastName,setLastName] = useState("");
const [email,setEmail] = useState("");
const [address1,setAddress1] = useState("");
const [address2,setAddress2] = useState("");
const [city,setCity] = useState("");
const [state,setState] = useState("");
const [country,setCountry] = useState("");
const [zip,setZip] = useState("");

const[isAddress,setIsAddress]  = useState(false);
const[isUser,setIsUser] = useState(false);
const[phoneNumber,setPhoneNumber] = useState();
const[cardName,setCardName] = useState();
const[cardNumber,setCardNumber] = useState();
const[cardExpiration,setCardExpiration] = useState();
const[cardCVV,setCardCVV] = useState();
const [orderID,setOrderID] = useState();
const [userCategory,setUserCategory] = useState();

const navigate = useNavigate();

const dispatch = useDispatch();

const [isBilling,setIsBilling] = useState(true);

const handleBillingSameClick = (e) => {
  setIsBilling(!isBilling);
  //data.currentLocation.split(",")
};
useEffect(()=>{
  setFirstName(currentUser.first_name);
  setLastName(currentUser.last_name);
  setIsUser(true);
},[currentUser])

useEffect(() =>{
  let add = data.currentLocation.split(",");
  setAddress1(add[0]);
  setCity(add[1]);
  setState(add[2]);
  setCountry(add[3]);
  setIsAddress(true);
},[data])

const category = [{
  value : "D",
  label : "Delivery"
},
{
  value : "P",
  label : "Pickup"
}
];

const submitOrder = async () => {

  try {
    const res = await userRequest.get("/orders/getOrderID");
    setOrderID(res.data[0].order_id);
    
  } catch {}
};

useEffect(() =>{
  const placeOrder = async () => {
    let today = new Date()
    let date = parseInt(today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear()
    console.log(currentUser.user_name);
    let prod = cart.products.map((item) => ({
            productId: item.id ? item.id : item[0].prod_id,
            productPrice : item[0].prod_price,
            quantity: item.cartedQuantity,
          }));
    let shippingAddress = ({
      name: firstName + lastName,
      address : address1 +address2,
      city : city,
      state : state,
      country : country,
      zip : zip,
      phoneNumber :phoneNumber,
      latitude : data.latitude,
      longitude :data.longitude,
      orderDate : date,
      del_pic : userCategory
    })
    let cardDetails = ({
      creditCardName : cardName,
      creditCardNumber : cardNumber
    })
    console.log(prod);
    console.log(shippingAddress);
    console.log(cart.total);
    console.log(cardDetails);
    
    console.log(date);
    
    try {
      console.log("Order id is " +orderID);
      const res = await userRequest.post("/orders/placeOrder", {
        userId: currentUser.user_name,
        products: prod,
        shippingAddress : shippingAddress,
        cardDetails : cardDetails,
        amount: cart.total,
        orderID:orderID
      });
      console.log("Order id is " +res.data.orderID);
    } catch {}
    dispatch(clearCart());
    alert("Order placed successfully and order ID is " + orderID);
    navigate("/");
  };
  if(orderID !== undefined)
    placeOrder();
},[orderID])

  return (
    <>
    <Container className="container">
    <div className="row">
      <div className="py-5 text-center">
        <img className="d-block mx-auto mb-4" src="data:image/jpeg;base64,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"
         alt="" width="150" height="150" />
        <h2>Checkout form</h2>
      </div>
      </div>
      <br/>
      <br/>
      <div className="row">
        <div className="col-md-4 order-md-3 mb-2">
          <h4 className="d-flex justify-content-between align-items-center mb-5 mr-2">
            <span className="text-muted">Your cart</span>
            <span className="badge badge-secondary badge-pill">{cart.quantity}</span>
          </h4>
          <ul className="list-group mb-3">
            {cart.products.map(product => (
            <li key={product.cartId} className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <img src={product[0].prod_img}  alt='Product Image' style={{width : "100px",height : "100px"}}/>
                <h6 className="my-0">{product[0].prod_name}</h6>
                <small className="text-muted">Quantity : {product.cartedQuantity}</small>
              </div>
              <span className="text-muted">$ {(product[0].prod_price * product.cartedQuantity)}</span>
            </li>))}
            <li className="list-group-item d-flex justify-content-between bg-light">
              <div className="text-success">
                <h6 className="my-0">Promo code</h6>
                <small></small>
              </div>
              <span className="text-success">-$5</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>${cart.total} </strong>
            </li>
          </ul>

          <div className="card p-2">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Promo code" />
              <div className="input-group-append">
                <button type="submit" className="btn btn-secondary">Redeem</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8 order-md-1">
          <h4 className="mb-3">Shipping address</h4>
          <div className="needs-validation" noValidate>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First name</label>
                <input type="text" className="form-control" id="firstName" placeholder="" value={firstName} onChange={(event)=> setFirstName(event.target.value)} readOnly={isUser}  required />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input type="text" className="form-control" id="lastName" placeholder="" value={lastName} onChange={(event)=> setLastName(event.target.value)} readOnly={isUser} required />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="email">Email <span className="text-muted">(Optional)</span></label>
              <input type="email" className="form-control" id="email" placeholder="you@example.com" onChange={(event)=> setEmail(event.target.value)}/>
              <div className="invalid-feedback">
                Please enter a valid email address htmlFor shipping updates.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address">Address</label>
              <input type="text" className="form-control" id="address" placeholder="1234 Main St" value={address1} onChange={(event)=> setAddress1(event.target.value)} readOnly={isAddress} required />
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address2">Address 2 <span className="text-muted">(Optional)</span></label>
              <input type="text" className="form-control" id="address2" placeholder="Apartment or suite" onChange={(event)=> setAddress2(event.target.value)} />
            </div>

            <div className="row">
            <div className="col-md-3 mb-3">
                <label htmlFor="country">City</label>
                <input type="text" className="form-control" id="city" value={city} readOnly={isAddress} onChange={(event)=> setCity(event.target.value)}  placeholder="City Name" />
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="state">State</label>
                <input type="text" className="form-control" id="state" value={state} onChange={(event)=> setState(event.target.value)} placeholder="State Name" />
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="country">Country</label>
                <input type="text" className="form-control" id="country" value={country} readOnly={isAddress}  onChange={(event)=> setCountry(event.target.value)} placeholder="Country Name" />
              </div>
              
              <div className="col-md-3 mb-3">
                <label htmlFor="zip">Zip</label>
                <input type="text" className="form-control" id="zip" value={zip} placeholder="" onChange={(event)=> setZip(event.target.value)} required />
                <div className="invalid-feedback">
                  Zip code required.
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="zip">PhoneNumber</label>
                <input type="text" className="form-control" id="phoneNumber" value={phoneNumber} placeholder="" onChange={(event)=> setPhoneNumber(event.target.value)} required />
                <div className="invalid-feedback">
                  Phone number required.
                </div>
              </div>
            </div>
            <hr className="mb-4" />
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="same-address" defaultValue="on" onClick={handleBillingSameClick} />
              <label className="custom-control-label" htmlFor="same-address">Billing address is the same as my Shipping address</label>
            </div>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="save-info" />
              <label className="custom-control-label" htmlFor="save-info">Save this information for next time</label>
            </div>
            <br />  
            <h3 style={{color:"red",fontWeight:"bold",marginBottom:"10px"}}> Select if Delivery or Pickup</h3>
            <Select  options={category}  
                  value = {category.filter(function(option) 
                    {return option.value === userCategory;})} 
                    onChange={(event)=> setUserCategory(event.value)} 
                    style={{width:"150px",height:"30px",fontSize:"16px",textAlign:"left",fontWeight:"bold"}}>
                  </Select>
            {(isBilling && (<>
            <hr className="mb-4" />
            <h4 className="mb-3">Billling address</h4>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First name</label>
                <input type="text" className="form-control" id="firstName" placeholder="" required />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input type="text" className="form-control" id="lastName" placeholder=""  required />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="email">Email <span className="text-muted">(Optional)</span></label>
              <input type="email" className="form-control" id="email" placeholder="you@example.com" />
              <div className="invalid-feedback">
                Please enter a valid email address htmlFor shipping updates.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address">Address</label>
              <input type="text" className="form-control" id="address" placeholder="1234 Main St" required />
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address2">Address 2 <span className="text-muted">(Optional)</span></label>
              <input type="text" className="form-control" id="address2" placeholder="Apartment or suite" />
            </div>

            <div className="row">
              <div className="col-md-5 mb-3">
                <label htmlFor="country">Country</label>
                <input type="text" className="form-control" id="country" placeholder="Country Name" />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="state">State</label>
                <input type="text" className="form-control" id="state" placeholder="State Name" />
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="zip">Zip</label>
                <input type="text" className="form-control" id="zip" placeholder="" required />
                <div className="invalid-feedback">
                  Zip code required.
                </div>
              </div>
            </div>
            </>)
              )}
            <hr className="mb-4" />


            <h4 className="mb-3">Payment</h4>

            <div className="d-block my-3">
              <div className="custom-control custom-radio">
                <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" required />
                <label className="custom-control-label" htmlFor="credit">Credit card</label>
              </div>
              <div className="custom-control custom-radio">
                <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required />
                <label className="custom-control-label" htmlFor="debit">Debit card</label>
              </div>
              <div className="custom-control custom-radio">
                <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" required />
                <label className="custom-control-label" htmlFor="paypal">Paypal</label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="cc-name">Name on card</label>
                <input type="text" className="form-control" id="cc-name" placeholder="" onChange={(event)=> setCardName(event.target.value)} required />
                <small className="text-muted">Full name as displayed on card</small>
                <div className="invalid-feedback">
                  Name on card is required
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="cc-number">Credit card number</label>
                <input type="text" className="form-control" id="cc-number" placeholder="" onChange={(event)=> setCardNumber(event.target.value)} required />
                <div className="invalid-feedback">
                  Credit card number is required
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label htmlFor="cc-expiration">Expiration</label>
                <input type="text" className="form-control" id="cc-expiration" placeholder="" onChange={(event)=> setCardExpiration(event.target.value)} required />
                <div className="invalid-feedback">
                  Expiration date required
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="cc-expiration">CVV</label>
                <input type="password" className="form-control" id="cc-cvv" placeholder="" onChange={(event)=> setCardCVV(event.target.value)} required />
                <div className="invalid-feedback">
                  Security code required
                </div>
              </div>
            </div>
            <hr className="mb-4" />
            <button className="btn btn-primary btn-lg btn-block" onClick={submitOrder} >Continue to checkout</button>
          </div>
          <br/>
          <br/>
        </div>
        </div>
      </Container>
    </>
  )
}

export default Checkout;