import {
  BrowserRouter as Router,
  Routes ,
  Route,
  Navigate
} from "react-router-dom";
import './css/Style.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import "slick-carousel/slick/slick.css";
import {  useSelector } from "react-redux";
import "slick-carousel/slick/slick-theme.css";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import ProductPage from "./pages/ProductPage";
import Checkout from "./pages/Checkout";
import AccountInfo from "./pages/AccountInfo";



function App() {
  const user = useSelector(state => state.user.currentUser);
  return (  
    <>
    <Router>
      <Routes> <Route exact path ="/" element ={<Home/>} />
      <Route exact path ="/login" element ={user ? <Navigate to="/" /> : <Login/>} />
      <Route exact path ="/register" element ={user ? <Navigate to="/" /> : <Register/>} />
      <Route exact path ="/products" element ={<ProductList />} />
      <Route exact path ="/products/:category" element ={<ProductList/>} />
      <Route exact path ="/cart" element ={user ? <Cart/> : <Navigate to="/login" />} />
      <Route exact path ="/product/:id" element ={<ProductPage/>} />
      <Route exact path ="/checkout" element ={<Checkout/>} />
      <Route exact path ="/account" element ={<AccountInfo/>} />
      </Routes>
    </Router>
    </>
    
  );
}

export default App;
