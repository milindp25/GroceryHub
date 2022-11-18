import React from 'react';
import styled from 'styled-components';
import {ShoppingCartOutlined,SearchOutlined,FavoriteBorder} from '@material-ui/icons';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link } from "react-router-dom";

const Info = styled.div`
  opacity: 0;
  width: 100%;
    height :100%;
    position:absolute;
    top: 0;
    left : 0;
    background-color : black;
  z-index: 3;
    display :flex;
    align-items :center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
    flex: 1;
    margin :5px;
    min-width :600px;
    height : 500px;
    display: flex;
    background-color :lightgray;
    position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
`;

const Circle = styled.div`
    width :70%;
    height :70%;
    border-radius:60%;
    position: absolute;
`;

const Image  = styled.img`

    height :50%;
    width :50%;
    z-index :2;
    align-items : bottom;
    justify-content : bottom;
`;

const Icon = styled.div`

width :40px;
height :40px;
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

const Product = ({item}) => {
  return (
    <>
						<div class="col-md-8 col-lg-8 col-xl-4">
								<div id="product-2" class="single-product">
										<div class="part-1">
                      <img src={item.prod_img} style={{objectFit:"contain"}}/>
												{item.prod_disc > 0 && <span class="discount">{item.prod_disc}% off</span>}
												<ul>
														<li><a href="#"><i class="fas fa-shopping-cart"></i></a></li>
														<li><a href="#"><i class="fas fa-heart"></i></a></li>
														{/* <li><a href="#"><i class="fas fa-plus"></i></a></li> */}
														<li><Link to={`/product/${item.prod_id}`}><i class="fas fa-expand"></i></Link></li>
												</ul>
										</div>
										<div class="part-2">
												<h3 class="product-title" style={{fontWeight:"bold",fontSize: "20px"}}>{item.prod_name}</h3>
												<h4 class="product-price" style={{fontWeight:"bold",fontSize: "20px",color: "green",textAlign:"center"}}>${item.prod_price}</h4>
										</div>
								</div>
						</div>
            
</>
)
    
}

export default Product