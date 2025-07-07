import SideMenu from "../../components/SideMenu/SideMenu";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DelInfo() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [agreeText, setAgreeText] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const rawToken = localStorage.getItem("token");

    if (rawToken) {
      const parsed = JSON.parse(rawToken);
      setUserId(parsed?.id || null);
      setToken(parsed?.token?.token || null);
    }

  }, []);

  const handleDelete = async () => {
    if (agreeText !== "동의합니다") {
      toast.error("동의합니다를 정확히 입력해 주세요.");
      return;
    }

    if (!password) {
      toast.error("비밀번호를 입력해 주세요.");
      return;
    }

    if (!token || !userId) {
      toast.error("사용자 정보가 없습니다. 다시 로그인 해주세요.");
      setTimeout(() => {
        navigate("/login")
      }, 1500);

      return;
    }

    try {
      const checkRes = await fetch("http://localhost:8080/api/user/checkPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: userId, password }),
      });

      const checkResult = await checkRes.json();
      if (!(checkResult === true || checkResult?.isMatch === true)) {
        toast.error("비밀번호가 일치하지 않습니다.");
        return;
      }
    } catch (err) {
      console.error("비밀번호 확인 오류:", err);
      toast.error("비밀번호 확인 중 오류가 발생했습니다.");
      return;
    }

    try {
      const delRes = await fetch("http://localhost:8080/api/user/byebye", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: userId }),
      });

      if (delRes.ok) {
        toast.success("회원 탈퇴가 완료되었습니다.");
        setTimeout(() => {
            navigate("/");
          }, 1200);
        sessionStorage.clear();
      } else {
        const errText = await delRes.text();
        console.error("탈퇴 실패:", errText);
        toast.error("회원 탈퇴 실패");
      }
    } catch (err) {
      console.error("탈퇴 요청 오류:", err);
      toast.error("회원 탈퇴 중 오류가 발생했습니다.");
    }
  };

  
  return (
    <div className="flex font-notokr">
      <SideMenu from="/checkpw2" />

      <ToastContainer
        position="top-center"
        autoClose={1000}
        limit={1}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastStyle={{ width: "500px", fontSize: "16px", whiteSpace: "normal" }}
        />



      <div className="w-4/5 flex justify-center">
        <div className="w-full max-w-3xl flex flex-col mt-20 gap-5">
          <h1 className="p-10 text-2xl font-bold text-center">회원탈퇴</h1>

          <div className="flex flex-col w-full gap-2">
            <div className="bg-gray-100 flex flex-col px-6 py-10 gap-1">
              <span className="font-bold mb-4">※ 회원 탈퇴 전 유의사항 ※</span>
              <span>탈퇴 시 모든 이용내역은 삭제되며, 복구가 불가능합니다.</span>
              <span>보유 중인 쿠폰, 적립금 등 모든 혜택은 소멸됩니다.</span>
              <span>배송 중이거나 반품이 진행 중인 내역이 있을 경우, 탈퇴가 제한됩니다.</span>
              <span>탈퇴 후 동일한 아이디로 재가입하실 수 없습니다.</span>
              <span>
                상기 내용을 모두 확인하였으며 이에 동의하시는 경우, 아래 빈칸에{" "}
                <span className="text-primary-500 font-bold">‘동의합니다’</span>를 정확히 입력해 주세요.
              </span>
            </div>

            <div className="flex justify-center my-4">
              <input
                value={agreeText}
                onChange={(e) => setAgreeText(e.target.value)}
                className="border border-gray-300 p-2 w-2/5 text-center"
                placeholder="'동의합니다'"
                type="text"
              />
            </div>

            <div className="bg-gray-100 flex flex-col p-8 gap-1 my-16">
              <span className="font-bold mb-4">본인확인을 위해 비밀번호를 입력해주세요.</span>

              <div className="flex justify-around">
                <span>아이디 : {userId}</span>
                <span>
                  비밀번호{" "}
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white border border-gray-300 rounded"
                    type="password"
                  />
                </span>
              </div>
            </div>

            <div className="flex justify-center my-16">
              <button
                onClick={handleDelete}
                className="w-1/4 bg-primary-500 text-white rounded px-4 py-2 cursor-pointer"
              >
                탈퇴하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DelInfo;
