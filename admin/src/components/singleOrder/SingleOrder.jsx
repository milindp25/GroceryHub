import "./list.scss"
import Sidebar from "../sidebar/Sidebar"
import Navbar from "../navbar/Navbar"
import SingleOrderDatatable from "../singleOrderDatatable/SingleOrderDatatable"

const SingleOrder = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <SingleOrderDatatable/>
      </div>
    </div>
  )
}

export default SingleOrder  