import "./list.scss"
import Sidebar from "../sidebar/Sidebar"
import Navbar from "../navbar/Navbar"
import OrderDataTable from "../ordersDatatable.jsx/OrderDatatable"

const OrderList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <OrderDataTable/>
      </div>
    </div>
  )
}

export default OrderList  