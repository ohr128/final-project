import { useState } from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function FindId() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const handleSendCode = async () => {
    try {
      const res = await fetch("http://localhost:8080/mail/sendCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        alert("인증번호가 이메일로 전송되었습니다.");
      } else {
        alert("이메일 전송 실패");
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleVerifyCode = async () => {
    try {
      await axios.post(
        "http://localhost:8080/mail/verifyCode",
        {
          email: email,
          code: code,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert("인증성공");
    } catch (error) {
      console.log(error);
    }
  };

  const GoShowId = () => {
    navigate("/showId");
  };

  return (
    <div className="container font-notokr">
      <div className="mt-30">
        <div className="flex justify-center mb-16">
          <Link to="/">
            <img className="w-50" src={logo} alt="" />
          </Link>
        </div>

        <div className="flex justify-center items-center flex-col gap-4">
          <div className="flex gap-1">
            <input
              className="border border-gray-300 w-70 h-10 pl-2 rounded"
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

          <div className="flex gap-1">
            <input
              className="border border-gray-300 w-70 h-10 pl-2 rounded"
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
            onClick={GoShowId}
          >
            아이디 찾기
          </button>
        </div>
      </div>
    </div>
  );
}

export default FindId;
