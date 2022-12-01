import "./list.scss"
import Sidebar from "../sidebar/Sidebar"
import Navbar from "../navbar/Navbar"
import StockDataTable from "../stockDatatable/StockDatatable"

const StockList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <StockDataTable/>
      </div>
    </div>
  )
}

export default StockList  