import React, {useEffect, useRef, useState} from 'react'
import { View } from "react-native-web";
import { mobile } from "../responsive";
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Search, GpsFixed,AddLocationOutlined } from "@material-ui/icons"
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Autocomplete from 'react-autocomplete';
import SearchBar from './SearchBar';
import Row from 'react-bootstrap/Row';
import PlaceIcon from '@mui/icons-material/Place';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from 'react-redux';
import { locationFetched } from '../redux/dataStorage';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@material-ui/core';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../redux/reduxUser';
import "../css/Navbar.css";


const apiKey = "AIzaSyDzJvc9AR2ArCqrRW4wNzvW7hhRpO06BtQ"
const mapApiJs = 'https://maps.googleapis.com/maps/api/js';
const geocodeJson = 'https://maps.googleapis.com/maps/api/geocode/json';

function loadAsyncScript(src) {
  return new Promise(resolve => {
    const script = document.createElement("script");
    Object.assign(script, {
      type: "text/javascript",
      async: true,
      src
    })
    script.addEventListener("load", () => resolve(script));
    document.head.appendChild(script);
  })
}

const extractAddress = (place) => {

  const address = {
    city: "",
    state: "",
    zip: "",
    country: "",
    plain() {
      const city = this.city ? this.city + ", " : "";
      const zip = this.zip ? this.zip + ", " : "";
      const state = this.state ? this.state + ", " : "";
      return city + zip + state + this.country;
    }
  }

  if (!Array.isArray(place?.address_components)) {
    return address;
  }

  place.address_components.forEach(component => {
    const types = component.types;
    const value = component.long_name;
    if (types.includes("locality")) {
      address.city = value;
    }

    if (types.includes("administrative_area_level_1")) {
      address.state = value;
    }

    if (types.includes("postal_code")) {
      address.zip = value;
    }

    if (types.includes("country")) {
      address.country = value;
    }

  });

  return address;
}


const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  font-weight : bold;
  font-size:36px;
  margin-left:50px;
  text-align:center;
`;
const Oval = styled.div`
    width: 28px;
    height: 28px;
    border: solid 1px #ccc;
    background-color: #f9f9f9;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left:10px;
    position: relative; 
`
const Span = styled.button`
  font-size: 20px;
  color: green;
  font-weight: bold;
  clear: both;
  display: flex;
  background-color : lightblue;
  width: auto;
  margin-right:20px;
  max-width: 300px;
`
export const Navbar1 = () => {


  const searchInput = useRef(null);
  const [address, setAddress] = useState();
   const [location,setLocation] = useState();
  const[value,setValue] = useState();
const {currentUser, isFetching, error } = useSelector((state) => state.user);

const navigate = useNavigate();

  const cart = useSelector(state => state.cart);

  const placesRef = useRef();

  const getAddress = () => {
    console.log(placesRef.current?.getAddressText());
  };
  const data = useSelector(state => state.data);
  const onPressing = () =>{
    console.log("onPress");
  }

  console.log(currentUser);

  const geocode = (add) => {
    const url = `${geocodeJson}?address=${add}&key=${apiKey}`;
    //searchInput.current.value = "Getting your location...";
    fetch(url)
        .then(response => response.json())
        .then(location => {
          const place = location.results[0];
          const _address = extractAddress(place);
          setAddress(place.formatted_address);
          dispatch(
            locationFetched(place)
          )
        })
  }

  const reverseGeocode = ({ latitude: lat, longitude: lng}) => {
    const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
    //searchInput.current.value = "Getting your location...";
    fetch(url)
        .then(response => response.json())
        .then(location => {
          const place = location.results[0];
          const _address = extractAddress(place);
          setAddress(place.formatted_address);
          dispatch(
            locationFetched(place)
          )
        })
  }

  useEffect(() => {
    if(location !=undefined)
    {
      let add="";
      location.value.terms.map((items) => {
        add = add + items.value.replace(/\s/g,"+")
        add = add + "+"
      })
      console.log(add);
      // setAddress(location.label)

      geocode(add);
      // dispatch(
      //   locationFetched(location.label)
      // )
    }
   
  },[location]);

  const findMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        reverseGeocode(position.coords)
      })
    }
  }

  const [show, setShow] = useState(false);
 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const currentLocation = useSelector(state => state.cart);
  const dispatch = useDispatch();


  const [products, setProducts] = useState([]);

 useEffect(() => {
const getProduct = async () => {
            try{
                const resp = await axios.get(`http://localhost:5000/groceryhub/products`);
                setProducts(resp.data);
            }
            catch(err)
            {throw err;}
        };
        getProduct();
}, []);

useEffect (()=>{
  if(data.currentLocation === '')
  setShow(true);
  else
  {
    setAddress(data.currentLocation);
    setShow(false);
  }
  
},[address])

  return (
    <>
     <Box  color="white">       
     <AppBar position="static">
        <Toolbar >
        <Navbar >
      <Container fluid>
        <Navbar.Brand href="/">
          <Left>
            <img src="data:image/jpeg;base64,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" 
          alt="Logo" style={{width:"100px",height : "100px"}}/>
           <span style={{marginLeft:"10px",color:"black"}}>Grocery Hub</span> 
          </Left>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
              <Span onClick={handleShow}>{address}</Span>
             <SearchBar placeholder="Enter Product Name..." data={products} />
            <div>
          </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Nav.Link href="/cart"style = {{marginRight : "40px",marginLeft:"80px"}} >
            <Badge badgeContent={cart.quantity} color="error">
              Cart
               <ShoppingCartIcon></ShoppingCartIcon>
               </Badge>
               </Nav.Link>
          { currentUser === null ? (<Button color="inherit">
          <Nav.Link href="/login"><PersonIcon />Login</Nav.Link>
          </Button>) : ( <>
          <div class ="items">
          <div className="item"  onClick={() => navigate("/account") }>
            <img
              src={currentUser.img_url}
              alt=""
              className="avatar"
            />
            {currentUser.first_name}
          </div>
          </div>
          <Button color='inherit' onClick={() => {dispatch(logout());alert("Logged out succesfully");}}>
            <LogoutIcon /> Logout
          </Button>
          </>)}
          <Modal show={show} onHide={handleClose} size="xl" aria-labelledby="contained-modal-title-vcenter" style={{width:"1000px",opacity:"0.95"}}>
            <Modal.Header closeButton>
              <Modal.Title>Please provide your delivery location to see products at nearby store</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{display: "block",height:"200px" }}>
            <Container>
            <Row>
            <View style={{paddingTop: "70",alignItems: 'center',flexDirection: 'row',justifyContent: 'space-evenly',width: '200px', marginLeft:"250px"}}>
            <Col xs={4} md={3}>
            <button onClick={findMyLocation} style={{background:"#459220",color:"white",borderRadius:"4px",display:"flex",width: '150px'}} > Detect my location</button>
            </Col>
            <Oval style={{marginLeft:"150px",width:"50px"}}>
              <span style={{position:"absolute",display:"flex",alignItems:"center"}}> OR</span>
            </Oval>
            <Col xs ={10} md="auto" style={{marginLeft:"70px",width:"400px"}}>
            <GooglePlacesAutocomplete
            style = {{width:"1000px"}}
                apiKey={apiKey}
                fetchDetails={true}
                onPress={onPressing}
                onFail={error => console.log(error)}
                onNotFound={() => console.log('no results')}
                selectProps={{
                  location,
                  onChange: setLocation,
                }}
                ref={placesRef}
              />
              </Col>
              </View>
              </Row>
              </Container>            
            </Modal.Body>
          </Modal>
        </Toolbar>
      </AppBar>
      </Box>
    </>
    
    
  )
}