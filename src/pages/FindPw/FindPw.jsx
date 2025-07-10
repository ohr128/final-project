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

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPwConfirm] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [pwColor, setPwColor] = useState("black");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const handleSendCode = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/mail/sendCode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        toast.success("인증번호가 이메일로 발송되었습니다.");
      } else {
        toast.error("이메일 주소를 확인해 주세요");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/mail/verifyCode`,
        {
          email: email,
          code: code,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("이메일 인증 완료");
    } catch (error) {
      console.log(error);
    }
  };

  const checkPasswordMatch = async (confirm) => {
    if (password === "" || confirm === "") {
      setPwMessage("");
      setPwColor("black");
      return;
    }
    if (password == confirm && password !== "") {
      setPwMessage("비밀번호가 일치합니다.");
      setPwColor("green");
    } else {
      setPwMessage("비밀번호가 다릅니다.");
      setPwColor("red");
    }
  };

  const validatePassword = (pw) => {
  const hasUppercase = /[A-Z]/.test(pw);
  const hasNumber = /[0-9]/.test(pw);
    const hasSpecial = /[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`|\\-]/.test(pw);
  const hasMinLength = pw.length >= 8;

  return hasUppercase && hasNumber && hasSpecial && hasMinLength;
};

  const handleChangePw = async () => {
    if (!id || !password || !passwordConfirm || !email || !code) {
      toast.error("모두 입력해주세요");
      return;
    }

    if (password !== passwordConfirm) {
      toast.error("비밀번호가 일치하지 않습니다.");
      return;
    }

    if(!validatePassword(password)) {
      toast.error("비밀번호는 영문 대문자, 숫자, 특수문자를 각각 하나 이상 표현해야 하며 8글자 이상이여야 합니다.");
      return;
    }

    try {
      await axios.patch(
        `${API_BASE_URL}/api/user/changePw`,
        {
          id: id,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("비밀번호가 변경되었습니다.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("비밀번호 변경 중 오류가 발생하였습니다.");
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
        toastStyle={{ width: "700px", fontSize: "16px", whiteSpace: "normal" }}
      />

      <div className="mt-30">
        <div className="flex justify-center mb-16">
          <Link to="/">
            <img className="w-50" src={logo} alt="" />
          </Link>
        </div>

        <div className="flex justify-center items-center flex-col gap-4 ">
          <input
            type="text"
            placeholder="아이디 입력"
            className="w-113 border rounded border-gray-300 p-2"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />

          <div className="flex">
            <input
              className="border border-gray-300 w-80 h-10 pl-2 rounded mr-2"
              placeholder="이메일 주소를 입력해주세요."
              type="text"
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
              className="border border-gray-300 w-80 h-10 pl-2 rounded mr-2"
              placeholder="인증번호"
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

          <input
            type="text"
            placeholder="비밀번호 입력"
            className="w-113 border rounded border-gray-300 p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => checkPasswordMatch(passwordConfirm)}
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="w-113 border rounded border-gray-300 p-2"
            value={passwordConfirm}
            onChange={(e) => setPwConfirm(e.target.value)}
            onBlur={() => checkPasswordMatch(passwordConfirm)}
          />

          <p style={{ color: pwColor }}> {pwMessage} </p>

          <button
            className="bg-primary-500 text-white rounded py-2 px-8 cursor-pointer mt-10"
            onClick={handleChangePw}
          >
            변경하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default FindId;
