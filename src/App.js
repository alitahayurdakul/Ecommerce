import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import Home from './Components/Home/Home';
import Login from "./Components/Login/Login";
import NotFoundWhenLogin from "./Components/NotFounds/NotFoundWhenLogin";
import NotFoundWhenNotLogin from "./Components/NotFounds/NotFoundWhenNotLogin";
import ProductDetail from "./Components/ProductDetail/ProductDetail";
import Payment from "./Components/Shopping/Payment/Payment";
import Shopping from "./Components/Shopping/Shopping";
import { selectOrderList, selectTheme, selectUserId } from "./store/selectors";

function App(props) {
  return (
    <div className="app" data-theme={props.theme ? 'light':'dark'}>
      <Routes>
        {
          props.userId ? <>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product/detail/:productId" element={<ProductDetail />} />
            <Route path="/shopping-summary" element={<Shopping />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="*" element={<NotFoundWhenLogin />} />
          </>
            :
            <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFoundWhenNotLogin />} />
            </>
            
        }
      </Routes>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  userId: selectUserId(),
  orderList: selectOrderList(),
  theme: selectTheme()
});

export default connect(mapStateToProps)(App);
