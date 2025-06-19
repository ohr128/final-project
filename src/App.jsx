import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import VerifySuccess from "./pages/verify/VerifySuccess";
import Auth from "./pages/Login/Auth";

function App() {
  return (
    <div className="container m-auto">
      

      {/* 페이지 전환 */}
      <Routes>
        <Route path="/" element= {<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/verify-success" element={<VerifySuccess />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/auth" element={<Auth />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
