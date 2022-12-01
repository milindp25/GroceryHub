import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { sigleOrderColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../../ApiRequest";
import { useLocation } from "react-router-dom";

const SingleOrderDatatable = () => {
  const [data, setData] = useState([]);
  const id = useLocation().pathname.split("/orders/")[1];
  const [orders, setOrders] = useState([]);
  const [fetchOrders,setFetchOrders] = useState(false);
  
  const deleteProduct = async (prod_id) => {
    try{

        const resp = await publicRequest.post(`/orders/deleteProduct?id=${id}&prod_id=${prod_id}`);
        if(resp.status === 200)
        alert("Product Deleted successfully");
        setOrders([]);
        setFetchOrders(!fetchOrders);
    }
    catch(err)
    {   console.log(err);
        throw err;}
};

  useEffect(() => {
        
    const getOrders = async () => {
        try{
            const resp = await publicRequest.get(`/orders/fetchSingleOrder?id=${id}`);
            setOrders(resp.data);
            setData(resp.data);
        }
        catch(err)
        {   console.log(err);
            throw err;}
    };
    getOrders();  
    console.log(orders);
},[fetchOrders]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/products/${params.row.productId}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deliveryUpdation"
              onClick={() => deleteProduct(params.row.productId)}
            >
              Delete Order
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        View Orders
        {/* <Link to="/products/new" className="link">
          Add New
        </Link> */}
      </div>
      <DataGrid
        className="datagrid"
        rows={orders}
        getRowId={(row) =>  row.productId }
        columns={sigleOrderColumns.concat(actionColumn)}
        pageSize={15}
        rowsPerPageOptions={[15]}
        checkboxSelection
      />
    </div>
  );
};

export default SingleOrderDatatable;
