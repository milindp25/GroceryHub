import React from 'react'
import { Footer } from '../components/Footer'
import { Navbar1 } from '../components/Navbar1';
import Product from '../components/Product';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useState,useEffect} from 'react';
import { publicRequest } from '../redux/ApiRequest';
import "../css/Product.css"

const Container = styled.div`
    padding :20px;
    display: flex; 
    flex-wrap :wrap;
    justify-content: space-between;
`;




const ProductList = ({category}) => {
    
    const id = useLocation().pathname.split("/products/")[1];
    const [title,setTitle] = useState("All Products");
    console.log("Location value " +id);
    let [rowVal,setRowVal] = useState(1);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if(id !== undefined)
        setTitle(id + "  Products")
        const getProduct = async () => {
            try{
                const resp =  await publicRequest.get(id ? `/products?category=${id}` :`/products`);
                setProducts(resp.data);
            }
            catch(err)
            {throw err;}
        };
        getProduct();
        
    }, [id]);

  return (
    <div>
        <Navbar1 />
        <div class="row justify-content-center text-center">
            <div class="header" style={{marginTop : "20px"}}>
                    <h3>{title}</h3>
            </div>
        </div>
        <section class="section-products">
		<div class="container">
            <div class="row">
            {products.map((items) => (
            <Product item={items} key={items.prod_id} ></Product>
        ))} 
    				</div>
    </div>
    </section>
        <Footer />
    </div>
  )
}

export default ProductList