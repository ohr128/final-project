import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";



function App() {
  return (
    <div className="container m-auto">
      



      {/* 페이지 전환 */}
      <Routes>
        <Route path="/" element= {<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />

      </Routes>
    </div>
  );
}

export default App;
