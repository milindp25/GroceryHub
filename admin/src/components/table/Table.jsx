import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { publicRequest } from "../../ApiRequest";

const List = () => {

  const [orders, setOrders] = useState([]);
  const [fetch,setFetch] = useState(true);

  useEffect(() => {
        
    const getOrders = async () => {
        try{
            const resp = await publicRequest.get(`/orders/fetchLatestOrders`);
            setOrders(resp.data);
            console.log(orders);  
        }
        catch(err)
        {   
            throw err;}
    };
    getOrders();  
    console.log(orders);
},[]);

  // const rows = [
  //   {
  //     id: 1143155,
  //     product: "Acer Nitro 5",
  //     img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
  //     customer: "John Smith",
  //     date: "1 March",
  //     amount: 785,
  //     method: "Cash on Delivery",
  //     status: "Approved",
  //   },
  //   {
  //     id: 2235235,
  //     product: "Playstation 5",
  //     img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
  //     customer: "Michael Doe",
  //     date: "1 March",
  //     amount: 900,
  //     method: "Online Payment",
  //     status: "Pending",
  //   },
  //   {
  //     id: 2342353,
  //     product: "Redragon S101",
  //     img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
  //     customer: "John Smith",
  //     date: "1 March",
  //     amount: 35,
  //     method: "Cash on Delivery",
  //     status: "Pending",
  //   },
  //   {
  //     id: 2357741,
  //     product: "Razer Blade 15",
  //     img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
  //     customer: "Jane Smith",
  //     date: "1 March",
  //     amount: 920,
  //     method: "Online",
  //     status: "Approved",
  //   },
  //   {
  //     id: 2342355,
  //     product: "ASUS ROG Strix",
  //     img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
  //     customer: "Harold Carol",
  //     date: "1 March",
  //     amount: 2000,
  //     method: "Online",
  //     status: "Pending",
  //   },
  // ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Order ID</TableCell>
            <TableCell className="tableCell">Customer Name</TableCell>
            <TableCell className="tableCell">Order Total</TableCell>
            <TableCell className="tableCell">Order Date</TableCell>
            <TableCell className="tableCell">Delivery or Pickup</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((orders) => (
            <TableRow key={orders.orderID}>
              <TableCell className="tableCell">{orders.orderID}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={orders.img_url} alt="" className="image" />
                  {orders.first_name} {orders.last_name}
                </div>
              </TableCell>
              <TableCell className="tableCell">$ {orders.total}</TableCell>
              <TableCell className="tableCell">{orders.order_Date}</TableCell>
              <TableCell className="tableCell">{orders.delivery_or_pickup == 'D' ? 'Delivery' : 'Pickup'}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${orders.order_status.replace(/\s+/g, '-').trim()}`}>{orders.order_status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
