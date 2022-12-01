import "./list.scss"
import Sidebar from "../sidebar/Sidebar"
import Navbar from "../navbar/Navbar"
import PickupDataTable from "../pickupDatatable/PickupDataTable"

const PickupList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <PickupDataTable/>
      </div>
    </div>
  )
}

export default PickupList  