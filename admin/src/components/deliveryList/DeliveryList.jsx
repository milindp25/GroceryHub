import "./list.scss"
import Sidebar from "../sidebar/Sidebar"
import Navbar from "../navbar/Navbar"
import DeliveryDataTable from "../deliveryDatatable/DeliveryDataTable"

const DeliveryList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DeliveryDataTable/>
      </div>
    </div>
  )
}

export default DeliveryList  