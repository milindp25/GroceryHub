import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { ordersColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../../ApiRequest";

const PickupDataTable = () => {
  const [data, setData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [fetchOrders,setFetchOrders] = useState(false);
  
  const updateStatus = async (id) => {
    try{

        const resp = await publicRequest.post(`/orders/updateDelivery?id=${id}`);
        if(resp.status === 200)
        alert("Updated Delivery/Pickup status  successfully");
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
            const resp = await publicRequest.get(`/orders/fetchAllPickupOrders`);
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
            <Link to={`/orders/${params.row.orderID}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deliveryUpdation"
              onClick={() => updateStatus(params.row.orderID)}
            >
              Mark ready for pickup
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
        getRowId={(row) =>  row.orderID }
        columns={ordersColumns.concat(actionColumn)}
        pageSize={15}
        rowsPerPageOptions={[15]}
        checkboxSelection
      />
    </div>
  );
};

export default PickupDataTable;
