import "./list.scss"
import Sidebar from "../sidebar/Sidebar"
import Navbar from "../navbar/Navbar"
import ProdDatatable from "../prodDatatable/ProdDatatable"

const ProdList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <ProdDatatable/>
      </div>
    </div>
  )
}

export default ProdList