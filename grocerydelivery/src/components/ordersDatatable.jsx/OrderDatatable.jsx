import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { ordersColumns } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../../ApiRequest";

const OrderDataTable = () => {
  const [data, setData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [fetchOrders,setFetchOrders] = useState(false);

  const navigate = useNavigate();
  
  const updateStatus = async (id,lat,long) => {
    try{

        const resp = await publicRequest.post(`/orders/updateDelivery?id=${id}`);
        if(resp.status === 200)
        alert("Updated Delivery/Pickup status  successfully");
        setOrders([]);
        setFetchOrders(!fetchOrders);
        navigate(`/orders/lat=${lat}&long=${long}&id=${id}`);
    }
    catch(err)
    {   console.log(err);
        throw err;}
};

  useEffect(() => {
        
    const getOrders = async () => {
        try{
            const resp = await publicRequest.get(`/orders/fetchAllDeliveryOrders`);
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
              onClick={() => updateStatus(params.row.orderID,params.row.location_lattitude,params.row.location_longitude)}
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
        View Orders to deliver
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

export default OrderDataTable;
