import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../../ApiRequest";

const ProductSingle = () => {

  const id = useLocation().pathname.split("/products/")[1];
  const [product,setProduct] = useState({});
  console.log(id);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/find?id=${id}`);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
    
  }, [id]);

  console.log(product);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={product[0] ? product[0].prod_img : product.prod_img}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{product[0] ? product[0].prod_name : product.prod_name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Category :</span>
                  <span className="itemValue">{product[0] ? product[0].prod_cat : product.prod_cat}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price :</span>
                  <span className="itemValue"> $ {product[0] ? product[0].prod_price : product.prod_price}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{product[0] ? product[0].prod_Description : product.prod_Description}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Product Stock Available :</span>
                  <span className="itemValue">
                  {product[0] ? product[0].quantity : product.quantity} units
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Discount: </span>
                  <span className="itemValue"> {product[0] ? product[0].prod_disc : product.prod_disc} %</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="Product Sales ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
        {/* <h1 className="title">Last Transactions</h1>
          <List/> */}
        </div>
      </div>
    </div>
  );
};

export default ProductSingle;
