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

function App() {
  const location = useLocation();
  const hideHeaderFooter = ["/login", "/signUp"].includes(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="container m-auto">
      {/* Navigation과 배너: 로그인/회원가입 페이지가 아닐 때만 */}
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
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/green-product" element={<GreenProduct />} />
        <Route path="/green-energy-product" element={<GreenEnergyProduct />} />
        <Route path="/GreenDetail" element={<GreenDetail/>} />
      </Routes>

      {/* Footer: 로그인/회원가입 페이지가 아닐 때만 */}
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
