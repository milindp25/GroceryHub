import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { ordersColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../../ApiRequest";
import { productColumns, userRows } from "../../datatablesource";

const StockDataTable = () => {
  const [data, setData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [fetchOrders,setFetchOrders] = useState(false);

  useEffect(() => {
        
    const getOrders = async () => {
        try{
            const resp = await publicRequest.get(`/stockLowProds`);
            setOrders(resp.data);
        }
        catch(err)
        {   console.log(err);
            throw err;}
    };
    getOrders();  
},[fetchOrders]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/products/${params.row.prod_id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deliveryUpdation"
            >
              Mark ready for delivery
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
        getRowId={(row) =>  row.prod_id }
        columns={productColumns.concat(actionColumn)}
        pageSize={15}
        rowsPerPageOptions={[15]}
        checkboxSelection
      />
    </div>
  );
};

export default StockDataTable;
