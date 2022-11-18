import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { productColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../../ApiRequest";

const ProdDatatable = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [fetchProd,setFetchProds] = useState(false);
  
  const deleteProduct = async (id) => {
    try{
        const resp = await publicRequest.post(`/deleteProduct?id=${id}`);
        if(resp.status === 200)
        alert("Product Deleted successfully");
        setProducts([]);
        setFetchProds(!fetchProd);
    }
    catch(err)
    {   console.log(err);
        throw err;}
};

  useEffect(() => {
        
    const getProduct = async () => {
        try{
            const resp = await publicRequest.get(`/products`);
            setProducts(resp.data);
            setData(resp.data);
        }
        catch(err)
        {   console.log(err);
            throw err;}
    };
    getProduct();  
    console.log(products);
},[fetchProd]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/products/${params.row.prod_id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => deleteProduct(params.row.prod_id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Product
        <Link to="/products/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={products}
        getRowId={(row) =>  row.prod_id }
        columns={productColumns.concat(actionColumn)}
        pageSize={15}
        rowsPerPageOptions={[15]}
        checkboxSelection
      />
    </div>
  );
};

export default ProdDatatable;
