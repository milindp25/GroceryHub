export const userColumns = [
  { field: "user_name", headerName: "User Name", width: 150 },
  {
    field: "first_name",
    headerName: "Name",
    width: 400,
    renderCell: (params) => {
      return (
        <div className="cellWithImg" style={{width:"400px"}}>
          <img className="cellImg" src={params.row.img_url} alt="avatar" />
          {params.row.first_name + params.row.last_name  }
        </div>
      );
    },
  },
  {
    field: "user_category",
    headerName: "User category",
    width: 230,
  },

  {
    field: "address",
    headerName: "Address",
    width: 400,
    renderCell: (params) => {
      return (
        <div >
          {params.row.address+","+params.row.city+","+params.row.state+","+params.row.zip}
        </div>
      );
    },
  },
  {
    field: "mobileNumber",
    headerName: "Mobile Number",
    width: 160,
  },
];

export const productColumns = [
  { field: "prod_id", headerName: "ID", width: 70 },
  {
    field: "prod_name",
    headerName: "Product Name",
    width: 400,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.prod_img} alt="avatar" />
          {params.row.prod_name}
        </div>
      );
    },
  },
  {
    field: "prod_cat",
    headerName: "Product category",
    width: 230,
  },

  {
    field: "prod_price",
    headerName: "Product Price",
    width: 150,
    renderCell: (params) => {
      return (
        <div style={{textAlign:"center",justifyContent:"center"}}>
          $ {params.row.prod_price}
        </div>
      );
    },
  },
  {
    field: "quantity",
    headerName: "Product Stock Quantity",
    width: 180,
  },
];

export const ordersColumns = [
  { field: "orderID", headerName: "ID", width: 70 },
  {
    field: "customer_name",
    headerName: "Customer Name",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img_url} alt="avatar" />
          {params.row.customer_name}
        </div>
      );
    },
  },
  {
    field: "total",
    headerName: "Order Total",
    width: 150,
    renderCell: (params) => {
      return (
        <div style={{textAlign:"center",justifyContent:"center"}}>
          $ {params.row.total}
        </div>
      );
    },
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    width: 150,
  },
  {
    field: "address",
    headerName: "Delivery/Pickup Location",
    width: 400,
    renderCell: (params) => {
      return (
        <div style={{textAlign:"center",justifyContent:"center"}}>
          {params.row.address}, {params.row.city} , {params.row.state} , {params.row.zip}
        </div>
      );
    },
  },
  {
    field: "delivery_or_pickup",
    headerName: "Delivery or Pickup",
    width: 150,
    renderCell: (params) => {
      return (
        <div style={{textAlign:"center",justifyContent:"center"}}>
          {params.row.delivery_or_pickup === 'D' ? 'Delivery' : 'Pickup'}
        </div>
      );
    },
  },
  {
    field: "order_status",
    headerName: "Order Status",
    width: 180,
  },
];

export const sigleOrderColumns = [
  { field: "productId", headerName: "ID", width: 70 },
  {
    field: "prod_name",
    headerName: "Product Name",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.prod_img} alt="avatar" />
          {params.row.prod_name}
        </div>
      );
    },
  },
  {
    field: "totalPrice",
    headerName: "Order Total",
    width: 150,
    renderCell: (params) => {
      return (
        <div style={{textAlign:"center",justifyContent:"center"}}>
          $ {params.row.totalPrice}
        </div>
      );
    },
  },
  {
    field: "prod_cat",
    headerName: "Product Category",
    width: 150,
  },
  
  {
    field: "prod_cat",
    headerName: "Product Category",
    width: 180,
  },
  {
    field: "quantity",
    headerName: "Product Stock Quantity",
    width: 180,
  },
];

//temporary data
export const userRows = [
  {
    id: 1,
    username: "Snow",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "active",
    email: "1snow@gmail.com",
    age: 35,
  },
  {
    id: 2,
    username: "Jamie Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "2snow@gmail.com",
    status: "passive",
    age: 42,
  },
  {
    id: 3,
    username: "Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "3snow@gmail.com",
    status: "pending",
    age: 45,
  },
  {
    id: 4,
    username: "Stark",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    status: "active",
    age: 16,
  },
  {
    id: 5,
    username: "Targaryen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "5snow@gmail.com",
    status: "passive",
    age: 22,
  },
  {
    id: 6,
    username: "Melisandre",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "6snow@gmail.com",
    status: "active",
    age: 15,
  },
  {
    id: 7,
    username: "Clifford",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "7snow@gmail.com",
    status: "passive",
    age: 44,
  },
  {
    id: 8,
    username: "Frances",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "8snow@gmail.com",
    status: "active",
    age: 36,
  },
  {
    id: 9,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "pending",
    age: 65,
  },
  {
    id: 10,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    age: 65,
  },
];
