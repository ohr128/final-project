import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function SignUp() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [userId, setUserId] = useState("");
  const [idMessage, setIdMessage] = useState("");
  const [idColor, setIdColor] = useState("black");

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPwConfirm] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [pwColor, setPwColor] = useState("black");

  const navigate = useNavigate();

  const sendEmail = async () => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/mail/send`,
        { email }, // 객체로 감싸기
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setMessage(res.data);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        setMessage(error.response.data);
      } else {
        setMessage("메일 전송 실패");
      }
    }
  };

  const findId = async () => {
    try {
      await axios.get(`${API_BASE_URL}/user/check-userId`, {
        params: { id: userId },
      });
      setIdMessage("사용 가능한 아이디입니다.");
      setIdColor("green");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setIdMessage("이미 존재하는 아이디 입니다.");
        setIdColor("red");
      } else {
        setIdMessage("서버 오류로 확인에 실패했습니다.");
        setIdColor("gray");
      }
    }
  };

  const validatePassword = (pw) => {
  const hasUppercase = /[A-Z]/.test(pw);
  const hasNumber = /[0-9]/.test(pw);
  const hasSpecial = /[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`|\\-]/.test(pw);
  const hasMinLength = pw.length >= 8;

  return hasUppercase && hasNumber && hasSpecial && hasMinLength;
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

  const handleSignUp = async () => {
    if (!userId || !email || !password || !passwordConfirm) {
      toast.error("모두 입력해주세요");
      return;
    }

    if(!validatePassword(password)) {
      toast.error("비밀번호는 영문 대문자, 숫자, 특수문자를 각각 하나 이상 표현해야 하며 8글자 이상이여야 합니다.");
      return;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/user/sign-up`,
        {
          id: userId,
          email: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      
      toast.success("회원가입이 완료되었습니다.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error("아이디 최소 8글자입니다.");
      } else {
        toast.error("서버오류");
      }
    }
  };

  return (
    <div className="container m-auto">
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={1000}
        closeOnClick
        theme="colored"
      />

      <div className="mt-30">
        <div className="flex justify-center mb-16">
          <Link to="/">
            <img className="w-50" src={logo} alt="" />
          </Link>
        </div>

        <div className="flex justify-center items-center flex-col">
          <div>
            <input
              className="border border-gray-300 w-80 h-10 pl-2 rounded mr-1"
              placeholder="아이디 입력(8~20자, @포함 불가능)"
              type="text"
              value={userId}
              onChange={(e) => {
                const value = e.target.value;
                if (!value.includes("@")) {
                  setUserId(value);
                }
              }}
            />

            <button
              className="bg-primary-500 w-28 h-10 text-white ml-1 rounded cursor-pointer"
              onClick={findId}
            >
              중복확인
            </button>
          </div>

          <div className="my-2">
            <input
              className="border border-gray-300 w-80 h-10 pl-2 rounded mr-1"
              placeholder="이메일 주소"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name=""
              id=""
            />
            <button
              className="bg-primary-500 w-28 h-10 text-white ml-1 rounded cursor-pointer"
              onClick={sendEmail}
            >
              인증하기
            </button>
          </div>

          <input
            className="border border-gray-300 w-110 h-10 pl-2 mb-2 rounded"
            placeholder="비밀번호 입력(8~12자리/ 대문자, 숫자, 특수기호 포함)"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => checkPasswordMatch(passwordConfirm)}
          />
          <input
            className="border border-gray-300 w-110 h-10 pl-2 rounded"
            placeholder="비밀번호 재입력"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPwConfirm(e.target.value)}
            onBlur={() => checkPasswordMatch(passwordConfirm)}
          />

          <button
            className="bg-primary-500 w-30 h-10 text-white my-20 rounded cursor-pointer"
            onClick={handleSignUp}
          >
            회원가입
          </button>

          <p
            style={{ color: message.includes("이미 인증된") ? "red" : "green" }}
          >
            {message}
          </p>
          <p style={{ color: idColor }}> {idMessage} </p>
          <p style={{ color: pwColor }}> {pwMessage} </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
