import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../components/SideMenu/SideMenu";

function Checkpw2() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleCheck = async () => {
    const token = localStorage.getItem("token");
    const parsed = token ? JSON.parse(token) : null;
    const userId = parsed?.id;

    try {
      const response = await fetch("http://localhost:8080/api/user/checkPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parsed?.token}`,
        },
        body: JSON.stringify({ id: userId, password }),
      });

      const result = await response.json();

      if (result === true || result?.isMatch === true) {
        navigate("/edit-Info");
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      alert("서버 오류가 발생했습니다.");
      console.error(error);
    }
  };

  return (
    <div className="flex font-notokr">
      <SideMenu from="/checkpw2" />

      <div className="w-4/5 px-6 flex justify-center">
        <div className="w-full max-w-md flex flex-col text-center mt-20">
          <h1 className="p-10 text-2xl font-bold">회원정보 확인</h1>

          <div className="flex flex-col w-full gap-4">
            <span>회원정보 보안을 위해 비밀번호를 입력해주세요.</span>

            <input
              placeholder="비밀번호 입력"
              type="password"
              className="border border-gray-300 rounded px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex justify-center my-6">
              <button
                onClick={handleCheck}
                className="w-1/4 bg-primary-500 border-primary-500 text-white rounded px-4 py-2 cursor-pointer"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkpw2;
