import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../../ApiRequest";

const Datatable = () => {
  const [data, setData] = useState(userRows);
  const[users,setUsers] = useState([]);
  const [fetchUsers,setFetchUsers] = useState(false);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const deleteUser = async (id) => {
    try{
        const resp = await publicRequest.post(`/users/deleteUser?id=${id}`);
        if(resp.status === 200)
        alert("User Deleted successfully");
        setUsers([]);
        setFetchUsers(!fetchUsers);
    }
    catch(err)
    {   console.log(err);
        throw err;}
};


  useEffect(() => {
        
    const getAllUser = async () => {
        try{
            const resp = await publicRequest.get(`/users/getUsers`);
            setUsers(resp.data);
        }
        catch(err)
        {   console.log(err);
            throw err;}
    };
    getAllUser();  
},[fetchUsers]);

console.log(users);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/users/${params.row.user_name}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() =>  deleteUser(params.row.user_name)}
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
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={users}
        getRowId={(row) =>  row.user_name}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
