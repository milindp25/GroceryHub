import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Slider from "react-slick";
import { useState,useEffect} from 'react';
import { Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { publicRequest } from '../redux/ApiRequest';
import Product from './Product';
import { useSelector } from 'react-redux';

const Icon = styled.div`

width :100px;
height :100px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
&:hover {
    background-color: blue;
    transform :scale(1.1);

}
`;

const Arrows = styled.div`

width :20px;
height :20px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
&:hover {
    background-color: blue;
    transform :scale(1.1);

}
`;

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <Arrows
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    > <ArrowForwardIcon style={{color:"white"}}/> </Arrows>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <Arrows
      className={className}
      style={{ ...style, display: "flex", background: "black" }}
      onClick={onClick}
    > <ArrowBackIcon style={{color:"white"}}/></Arrows>
  );
}




export const Categories = () => {

    const [productCategory, setProductCategory] = useState([]);
    const [products, setProducts] = useState([]);
    const [suugested, setSuggested] = useState([]);

    const {currentUser, isFetching, error } = useSelector((state) => state.user);

    /* fetches all product caretgories*/
    useEffect(() => {
        
        const getProduct = async () => {
            try{
                const resp = await publicRequest.get(`/getProductCategory`);
                setProductCategory(resp.data);
            }
            catch(err)
            {   console.log(err);
                throw err;}
        };
        const getPopular = async () => {
          try{
              const resp = await publicRequest.get(`/popular`);
              setProducts(resp.data);
          }
          catch(err)
          {   console.log(err);
              throw err;}
      };
      const getSuggested = async () => {
        if(currentUser != null)
        {
          try{
            const resp = await publicRequest.get(`/suggestedProducts?id=${currentUser.user_name}`);
            setSuggested(resp.data);
        }
        catch(err)
        {   console.log(err);
            throw err;}
    };
        }
        getSuggested();
        getProduct();  
        getPopular();
    },[]);

    console.log(suugested);

    

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 4,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
  return (
    <div>
        <Container fluid style={{width : "70%"}}>
        <h2 style = {{color : "red",textAlign :"center"}}> Product Categories </h2>
        <br/>
        <Slider {...settings} >
            {
            productCategory.map(item => (
                <div>
                  <Link to={`/products/${item.prod_category}`}>
                   <Icon>
                   <h5 style= {{display : "flex",alignItems :"center"}}>{item.prod_category}</h5>
                   <img src={item.cat_img} style= {{width : "100%" , height : "100%",display : "flex",alignItems :"center",justifyContent : "center"}} />
                   </Icon>
                   </Link>
                </div>
            ))
            }
        </Slider>
        <br/>
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{height : "300px",objectFit : "absolute"}}
          src="https://t3.ftcdn.net/jpg/02/72/40/68/240_F_272406819_djyh9kysHidrdUOgoDEujj7HGSOwzlmS.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{height : "300px",width : "800px",objectFit : "absolute"}}
          src="https://t3.ftcdn.net/jpg/03/35/61/78/240_F_335617818_D6XfmNhtCyDRTOvK9GXFkNYs3nyLKvfO.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{height : "300px",objectFit : "absolute"}}
          src="https://t3.ftcdn.net/jpg/05/12/64/86/240_F_512648622_cQZ3Q0YBswfRCqoGqc13sBFR1nOXSDjR.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <br/>
    <h2 style = {{color : "red",textAlign :"center"}}> Most popular products </h2>
    <section class="section-products">
		<div class="container">
            <div class="row">
            {products.map((items) => (
            <Product item={items} key={items.prod_id} ></Product>
        ))} 
    				</div>
    </div>
    
    </section>

    {currentUser != null ? (<>
    <h2 style = {{color : "red",textAlign :"center"}}> User Suggested products </h2>
    <section class="section-products">
		<div class="container">
            <div class="row">
            {suugested.map((items) => (
            <Product item={items} key={items.prod_id} ></Product>
        ))} 
    				</div>
    </div>
    </section>
    </>) : (<></>)}
    </Container>
    <br />
    <br />    
    </div>
  )
}
