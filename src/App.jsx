import "./App.css";
import banner from "./assets/banner.png";
import { Routes, Route, useLocation } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Footer from "./components/Footer/Footer";
import Navigation from "./components/Navigation/Navigation";
import GreenProduct from "./pages/GreenProduct/GreenProduct";
import GreenEnergyProduct from "./pages/GreenEnergyProduct/GreenEnergyProduct";
import GreenDetail from "./pages/GreenDetail/GreenDetail";
import { useEffect } from "react";
import OrderDetail from "./pages/OrderDetail/OrderDetail";
import FindId from "./pages/FindId/FindId";
import FindPw from "./pages/FindPw/FindPw";
import VerifySuccess from "./pages/verify/VerifySuccess";
import Auth from "./pages/Login/Auth";
import ShowId from "./pages/ShowId/ShowId";
import Review from "./pages/Review/Review";
import TakeBack from "./pages/TakeBack/TakeBack";
import Point from "./pages/Point/Point";
import CheckInfo from "./pages/CheckInfo/CheckInfo";
import EditInfo from "./pages/EditInfo/EditInfo";
import DelInfo from "./pages/DelInfo/DelInfo";

function App() {
  const location = useLocation();
  const hideHeaderFooter = ["/login", "/signUp", "/findId", "/findPw", "/verify-success", "/showId"].includes(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="container m-auto">

      {!hideHeaderFooter && (
        <>
          <Navigation />
          <div>
            <img src={banner} alt="배너 이미지" />
          </div>
        </>
      )}

      {/* 라우팅 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/findId" element={<FindId />} />
        <Route path="/findPw" element={<FindPw />} />
        <Route path="/verify-success" element={<VerifySuccess />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/auth" element={<Auth />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/green-product" element={<GreenProduct />} />
        <Route path="/green-energy-product" element={<GreenEnergyProduct />} />
        <Route path="/order-detail" element={<OrderDetail />} />
        <Route path="/GreenDetail" element={<GreenDetail />} />
        <Route path="/showId" element={<ShowId />} />
        <Route path="/review" element={<Review />} />
        <Route path="/takeback" element={<TakeBack />} />
        <Route path="/point" element={<Point />} />
        <Route path="/check-info" element={<CheckInfo />} />
        <Route path="/edit-info" element={<EditInfo />} />
        <Route path="/del-info" element={<DelInfo />} />

      </Routes>


      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
