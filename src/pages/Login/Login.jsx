import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import kakao from "../../assets/KakaoTalk_logo.png";
import logo from "../../assets/logo.png";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE = import.meta.env.VITE_API_BASE;
console.log("API_BASE_URL", API_BASE_URL);
console.log("API_BASE", API_BASE);

const { Kakao } = window;

function Login() {
  const [id, setId] = useState("");
  const [password, setPw] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/user/sign-in`,
        {
          id,
          password,
        },
        { withCredentials: true }
      );

      localStorage.setItem(
        "token",
        JSON.stringify({
          id: id,
          token: response.data.token,
        })
      );

      const saveToken = JSON.parse(localStorage.getItem("token"));
      console.log(saveToken);
      alert("로그인 성공");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("로그인실패: 아이디 또는 비밀번호를 확인해주세요");
    }
  };

  const handleKakaoLogin = () => {
    Kakao.Auth.authorize({
      redirectUri: `${API_BASE}/login/auth`,
    });
  };

  return (
    <div className="container m-auto">
      <div className="mt-30">
        <div className="flex justify-center mb-16">
          <Link to="/">
            <img className="w-50" src={logo} alt="" />
          </Link>
        </div>
        <div className="flex justify-center items-center flex-col">
          <input
            className="border border-gray-300 w-100 h-10 pl-2 rounded"
            placeholder="아이디"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />

          <input
            className="border border-gray-300 w-100 h-10 pl-2  my-2"
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleLogin();
              }
            }}
          />

          <button
            type="submit"
            className="bg-primary-500 w-100 h-10 text-white rounded cursor-pointer"
            onClick={handleLogin}
          >
            로그인
          </button>

          <div className="flex justify-end text-xs text-gray-500 mt-2">
            <Link to="/signUp" className="ml-50">
              회원가입
            </Link>
            <Link to="/findId" className="ml-2">
              아이디 찾기
            </Link>
            <Link to="/findPw" className="ml-2">
              비밀번호 찾기
            </Link>
          </div>
          <button
            className="border border-gray-300 w-100 h-10 flex justify-center items-center my-10 rounded"
            onClick={handleKakaoLogin}
          >
            <img className="h-5 mr-6" src={kakao} alt="" />
            <p>카카오톡 로그인</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
