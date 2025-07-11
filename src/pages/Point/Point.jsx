import { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import lv1 from "../../assets/lv0.jpg";
import lv2 from "../../assets/lv1.jpg";
import lv3 from "../../assets/lv2.jpg";
import lv4 from "../../assets/lv3.jpg";
import lv5 from "../../assets/lv4.jpg";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Point() {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [mileage, setMileage] = useState(0);
  const [userMileage, setUserMileage] = useState(0);

  useEffect(() => {
    const rawToken = localStorage.getItem("token");
    if (rawToken) {
      const parsed = JSON.parse(rawToken);
      setUserId(parsed?.id || null);
      setToken(parsed?.token || null);
    }
  }, []);

  useEffect(() => {
    if (!token || !userId) return;

    fetch(`${API_BASE_URL}/api/user/userById?id=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (result) => {
        if (!result.ok) {
          const text = await result.text();
          console.error("서버 응답 오류 상태코드:", result.status);
          console.error("서버 응답 본문:", text);
          return null;
        }
        return result.json();
      })
      .then((data) => {
        if (!data) return;
        if (data?.totalMileage !== undefined) {
          setMileage(Number(data.totalMileage));
        }
        if (data?.totalPoint !== undefined) {
          setUserMileage(Number(data.totalPoint));
        }
      })
      .catch((err) => {
        console.error("사용자 정보 조회 실패:", err);
      });
  }, [token, userId]);

  return (
    <div className="flex font-notokr">
      <SideMenu from="/point" />

      <div className="w-4/5 px-6 justify-center flex m-auto mt-5">
        <div className="my-8 flex flex-col justify-center">
          <div className="flex justify-center">
            <div className="mt-10 flex justify-center">
              <span className="p-4 text-2xl font-bold">
                {userId}님의 현재 마일리지는 <span className="text-primary-500">{mileage.toLocaleString()}</span>점 입니다.
              </span>
            </div>
          </div>

          {mileage >= 50000 ? (
            <img className="px-10 w-100 mx-20 mt-10" src={lv5} alt="레벨5" />
          ) : mileage >= 37500 ? (
            <img className="px-10 w-100 mx-20 mt-10 h-[337px]" src={lv4} alt="레벨4" />
          ) : mileage >= 25000 ? (
            <img className="px-10 w-100 mx-20 mt-10 h-[337px]" src={lv3} alt="레벨3" />
          ) : mileage >= 12500 ? (
            <img className="px-10 pt-10 w-100 mx-11 h-[337px]" src={lv2} alt="레벨2" />
          ) : mileage >= 0 ? (
            <img className="px-10 pt-16 w-100 mx-20 mt-3 h-[337px]" src={lv1} alt="레벨1" />
          ) : null}

          {mileage >= 50000 ? (
            <span className="p-5 text-2xl font-bold text-center">
              당신의 노력 덕분에 달콤한 열매를 맺게 되었습니다.
            </span>
          ) : mileage >= 37500 ? (
            <span className="p-5 text-2xl font-bold text-center">
              당신의 꾸준한 노력으로 나무가 튼튼하게 성장했습니다.
            </span>
          ) : mileage >= 25000 ? (
            <span className="p-5 text-2xl font-bold text-center">
              당신의 노력 끝에 아름다운 꽃이 피어났습니다.
            </span>
          ) : mileage >= 12500 ? (
            <span className="p-6 text-2xl font-bold text-center">
              당신의 노력으로 새싹을 피웠습니다.
            </span>
          ) : (
            <span className="p-5 text-2xl font-bold text-center">
              당신이 세상의 생동감을 부여 할 수 있습니다.
            </span>
          )}

          {/* 보유 포인트 표시 */}
          <div className="mt-8 mb-20 text-xl font-semibold text-center">
            보유 포인트: {userMileage.toLocaleString()}P
          </div>
        </div>
      </div>
    </div>
  );
}

export default Point;
