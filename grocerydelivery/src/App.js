import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import NewProd from "./components/newProd/NewProd";
import ProdList from "./components/prodLlist/ProdList";
import ProductSingle from "./pages/ProductList/ProductSingle";
import OrderList from "./components/orderList/OrderList";
import SingleOrder from "./components/singleOrder/SingleOrder";
import DeliveryList from "./components/deliveryList/DeliveryList";
import PickupList from "./components/pickupList/PickupList";
import { useSelector } from "react-redux";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const user = useSelector(state => state.deliveryUser.currentUser);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
        <Route path="/">
            <Route index element ={user ? <Home /> : <Login/>}/>
            <Route path="login" element ={user ? <Navigate to="/" /> : <Login/>}/>
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<ProdList />} />
              <Route path=":productId" element={<ProductSingle />} />
              <Route
                path="new"
                element={<NewProd inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            <Route path="orders">
              <Route index element={<OrderList />} />
              <Route path=":orderId" element={<SingleOrder />} />
              <Route
                path="new"
                element={<NewProd inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            <Route path="delivery">
              <Route index element={<DeliveryList />} />
              <Route path=":orderId" element={<SingleOrder />} />
              {/* <Route
                path="new"
                element={<NewProd inputs={productInputs} title="Add New Product" />}
              /> */}
            </Route>
            <Route path="pickup">
              <Route index element={<PickupList />} />
              <Route path=":orderId" element={<SingleOrder />} />
              {/* <Route
                path="new"
                element={<NewProd inputs={productInputs} title="Add New Product" />}
              /> */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
