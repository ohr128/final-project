import "./App.css";
import banner from "./assets/banner.png";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Footer from "./components/Footer/Footer";
import Navigation from "./components/Navigation/Navigation";
import GreenProduct from "./pages/GreenProduct/GreenProduct";
import GreenEnergyProduct from "./pages/GreenEnergyProduct/GreenEnergyProduct";
import GreenDetail from "./pages/GreenDetail/GreenDetail";
import OrderDetail from "./pages/OrderDetail/OrderDetail";
import FindId from "./pages/FindId/FindId";
import FindPw from "./pages/FindPw/FindPw";
import VerifySuccess from "./pages/verify/VerifySuccess";
import Auth from "./pages/Login/Auth";
import ShowId from "./pages/ShowId/ShowId";
import Review from "./pages/Review/Review";
import TakeBack from "./pages/TakeBack/TakeBack";
import Point from "./pages/Point/Point";
import EditInfo from "./pages/EditInfo/EditInfo";
import DelInfo from "./pages/DelInfo/DelInfo";
import EditAddress from "./pages/EditAddress/EditAddress";
import CertifyGreen from "./pages/CertifyGreen/CertifyGreen";
import RegisterGreen from "./pages/RegisterGreen/RegisterGreen";
import GreenRegisterList from "./pages/GreenRegisterList/GreenRegisterList";
import EditGreen from "./pages/EditGreen/EditGreen";
import CertifyBusiness from "./pages/CertifyBusiness/CertifyBusiness";
import RemodelingRequest from "./pages/RemodelingRequest/RemodelingRequest";
import Estimate from "./pages/Estimate/Estimate";
import RemodelingList from "./pages/RemodelingList/RemodelingList";
import Checkpw from "./pages/EditAddress/checkpw";
import Checkpw2 from "./pages/EditInfo/checkpw2";
import RemodelingRequestList from "./pages/RemodelingRequestList/RemodelingRequestList";
import Performance from "./pages/Performance/Performance";
import Forecast from "./pages/Forecast/Forecast";
import Management from "./pages/Management/Management";
import IntroductionRemodeling from "./pages/IntroductionRemodeling/IntroductionRemodeling";
import GreenConsumption from "./pages/GreenConsumption/GreenConsumption";

function App() {
  const location = useLocation();

  const hideHeaderFooter = [
    "/login",
    "/signUp",
    "/findId",
    "/findPw",
    "/verify-success",
    "/showId",
  ].includes(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="w-full">
      {!hideHeaderFooter && (
        <div className="mb-2 container m-auto">
          <Navigation />
        </div>
      )}

      {!hideHeaderFooter && (
        <div className="w-full mb-10">
          <img
            src={banner}
            alt="배너 이미지"
            className="w-full object-cover"
          />
        </div>
      )}
            
      <div className="container m-auto">
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
          <Route path="/green-detail" element={<GreenDetail />} />
          <Route path="/showId" element={<ShowId />} />
          <Route path="/review" element={<Review />} />
          <Route path="/takeback" element={<TakeBack />} />
          <Route path="/point" element={<Point />} />
          <Route path="/edit-info" element={<EditInfo />} />
          <Route path="/del-info" element={<DelInfo />} />
          <Route path="/edit-Address" element={<EditAddress />} />
          <Route path="/certify-green" element={<CertifyGreen />} />
          <Route path="/register-green" element={<RegisterGreen />} />
          <Route path="/green-register-list" element={<GreenRegisterList />} />
          <Route path="/edit-green" element={<EditGreen />} />
          <Route path="/certify-business" element={<CertifyBusiness />} />
          <Route path="/remodeling-request" element={<RemodelingRequest />} />
          <Route path="/estimate" element={<Estimate />} />
          <Route path="/remodeling-list" element={<RemodelingList />} />
          <Route path="/remodeling-request-list" element={<RemodelingRequestList />} />
          <Route path="/checkpw2" element={<Checkpw2 />} />
          <Route path="/checkpw" element={<Checkpw />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/management" element={<Management />} />
          <Route path="/green-consumption" element={<GreenConsumption />} />
          <Route path="/introduction-remodeling" element={<IntroductionRemodeling />} />
        </Routes>
      </div>

      {!hideHeaderFooter && (
        <div className="w-full">
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
