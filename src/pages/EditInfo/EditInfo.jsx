import { useState } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("API_BASE_URL", API_BASE_URL);

function EditInfo() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPwConfirm] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [pwColor, setPwColor] = useState("black");

  const [currentPassword, setCurrentPassword] = useState("");
  const navigate = useNavigate();

    const stored = localStorage.getItem("token");
    const parsed = stored ? JSON.parse(stored) : {};
    const userId = parsed?.id;
    const token = parsed?.token;

  const handleSendCode = async () => {
    try{
        const res = await fetch(`${API_BASE_URL}/mail/sendCode`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email}),
        });

        if(res.ok) {
            alert("인증번호가 이메일로 발송되었습니다.");
        } else {
            alert("이메일 주소를 확인해 주세요");
        }
    }catch (error){ 
        console.log(error);
    }
  };

  const handleVerifyCode = async () => {
    try {
        await axios.post(`${API_BASE_URL}/mail/verifyCode`,{
            email: email,
            code:code,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert("이메일 인증 완료");
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
    if (password !== confirm) {
      setPwMessage("비밀번호가 다릅니다.");
      setPwColor("red");
    }
  };

  const handleChange = async () => {
    if (!userId || !token) {
      alert("로그인 정보가 유효하지 않습니다. 다시 로그인해주세요.");
      return;
    }
    if (!email && !password) {
      alert("수정할 항목이 없습니다.");
      return;
    }

    if (password && password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    const payload = { id: userId, password };
    if (email) payload.email = email;
    if (password) payload.password = password;
    console.log("payload to backend:", payload);

    try {
        if(password) {
            const checkRes = await fetch(`${API_BASE_URL}/api/user/checkPassword`, {
                method: "POST",
                 headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ id: userId, password: currentPassword }),
          }
        );
        const isValid = await checkRes.json();
        console.log(userId);

        if (!isValid) {
          alert("현재 비밀번호가 일치하지 않습니다.");
          return;
        }
      }
      await axios.patch(`${API_BASE_URL}/api/user/update"`, payload,{
        headers: { "Content-Type": "application/json" },
      });
      alert("회원정보가 수정되었습니다.");
      navigate("/point");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 500) {
        alert("이미 존재하는 이메일 입니다.");
      } else {
        alert("회원정보 수정 중 오류가 발생하였습니다.");
      }
    }
  };

  return (
    <div className="flex font-notokr">
      <SideMenu from="/checkpw2" />

      <div className="w-4/5 px-6 flex justify-center">
        <div className="w-full max-w-md flex flex-col text-center mt-20">
          <h1 className="p-10 text-2xl font-bold">회원정보 수정</h1>

          <div className="flex flex-col w-full gap-2">
            <div>
              <input
                className="border border-gray-300 w-82 h-10 pl-2 rounded mr-1"
                placeholder="이메일 주소"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="bg-primary-500 w-28 h-10 text-white ml-1 rounded cursor-pointer"
                onClick={handleSendCode}
              >
                인증번호 전송
              </button>
            </div>

            <div>
              <input
                className="border border-gray-300 w-82 h-10 pl-2 rounded mr-1"
                placeholder="인증번호"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button
                className="bg-primary-500 w-28 h-10 text-white ml-1 rounded cursor-pointer"
                onClick={handleVerifyCode}
              >
                인증하기
              </button>
            </div>

            <input
              placeholder="기존 비밀번호 입력"
              type="password"
              className="border border-gray-300 rounded px-3 py-2"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              placeholder="새로운 비밀번호 입력"
              type="text"
              className="border border-gray-300 rounded px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => checkPasswordMatch(passwordConfirm)}
            />
            <input
              placeholder="비밀번호 확인"
              type="password"
              className="border border-gray-300 rounded px-3 py-2"
              value={passwordConfirm}
              onChange={(e) => setPwConfirm(e.target.value)}
              onBlur={() => checkPasswordMatch(passwordConfirm)}
            />

            <div className="flex justify-baseline">
              <button
                onClick={() => navigate("/del-info")}
                className="w-1/4 h-10 bg-primary-500 border-primary-500 text-white rounded cursor-pointer"
              >
                회원탈퇴
              </button>
            </div>
            <p style={{ color: pwColor }}> {pwMessage} </p>

            <div className="flex justify-center gap-3 my-20">
              <Link to="/order-detail">
                <button className="border border-primary-500 text-primary-500 rounded px-4 py-2 cursor-pointer">
                  뒤로가기
                </button>
              </Link>
              <button
                className=" bg-primary-500 text-white rounded px-4 py-2 cursor-pointer"
                onClick={handleChange}
              >
                수정하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditInfo;
