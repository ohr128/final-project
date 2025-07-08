import { useState } from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function FindId() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const handleSendCode = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/mail/sendCode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        toast.success("인증번호가 이메일로 전송되었습니다.");
          setTimeout(() => {
                  window.location;
                }, 2000);

      } else {
        toast.error("이메일 전송 실패");
      }
    } catch (error) {
      console.error(error);
      toast.error("서버 오류: 인증번호 전송 실패");
    }
  };

  const handleVerifyCode = async () => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/mail/verifyCode`,
        {
          email: email,
          code: code,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status === 200) {
        toast.success("인증 성공! 아이디 찾기를 눌러주세요.");
        setIsVerified(true);
      } else {
        toast.error("인증번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("인증 실패:", error);
      toast.error("인증번호가 일치하지 않거나 만료되었습니다.");
    }
  };

  const handleFindId = async () => {
    if (!isVerified) {
      toast.error("먼저 인증번호를 확인해주세요.");
      return;
    }

    try {
      const res = await axios.get(`${API_BASE_URL}/api/user/Id`, {
        params: { email },
      });



      if (res.data?.id) {
        navigate("/showId", { state: { userId: res.data.id } });
      } else {
        toast.error("아이디를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("아이디 조회 실패:", error);
      toast.error("서버 오류로 아이디를 찾을 수 없습니다.");
    }
  };

  return (
    <div className="container font-notokr">

      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={1000}
        closeOnClick
        theme="colored"
        toastStyle={{ width: "400px", fontSize: "16px", whiteSpace: "normal" }}
      />

      <div className="mt-30">
        <div className="flex justify-center mb-16">
          <Link to="/">
            <img className="w-50" src={logo} alt="로고" />
          </Link>
        </div>

        <div className="flex justify-center items-center flex-col gap-4">
          <div className="flex">
            <input
              className="border border-gray-300 w-70 h-10 pl-2 rounded mr-2"
              placeholder="이메일 주소를 입력해주세요."
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="bg-primary-500 rounded text-white px-4 py-2 cursor-pointer"
              onClick={handleSendCode}
            >
              인증번호 받기
            </button>
          </div>

          <div className="flex">
            <input
              className="border border-gray-300 w-70 h-10 pl-2 rounded mr-2"
              placeholder="인증번호 입력"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              className="bg-primary-500 rounded text-white px-4 py-2 cursor-pointer"
              onClick={handleVerifyCode}
            >
              인증번호 확인
            </button>
          </div>

          <button
            className="bg-primary-500 text-white rounded py-2 px-8 cursor-pointer mt-10"
            onClick={handleFindId}
          >
            아이디 찾기
          </button>
        </div>
      </div>
    </div>
  );
}

export default FindId;
