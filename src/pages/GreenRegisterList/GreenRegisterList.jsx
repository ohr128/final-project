import SideMenu from "../../components/SideMenu/SideMenu";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GreenRegisterList() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const rawToken = localStorage.getItem("token");
    if (!rawToken) return;

    try {
      const parsed = JSON.parse(rawToken);
      const userId = parsed?.id;

      if (!userId) return;

      fetch(
        `http://localhost:8080/api/findUserProduct?registrationNum=${userId}`
      )
        .then((res) => res.json())
        .then((data) => {
          setProductList(data);
        })
        .catch((err) => {
          console.error("제품 목록 로딩 실패:", err);
          toast.error("제품 목록을 불러오지 못했습니다.");
        });
    } catch (err) {
      console.error("로컬스토리지 파싱 에러:", err);
    }
  }, []);

  return (
    <div className="flex font-notokr">
      <SideMenu from="/green-register-list" />
      <ToastContainer position="top-center" />

      <div className="w-4/5 px-6 flex justify-center">
        <div className="w-full max-w-3xl flex flex-col text-center mt-20">
          <span className="mb-6 text-2xl font-semibold">녹색제품 등록내역</span>

          <div className="flex justify-end mb-4">
            <Link to="/certify-green">
              <button className="w-20 h-10 bg-primary-500 border-primary-500 text-white rounded cursor-pointer">
                등록하기
              </button>
            </Link>
          </div>
          <div className="flex font-semibold border-b border-b-gray-500 pb-3">
            <span className="ml-25">이름</span>
            <span className="ml-55">인증번호</span>
            <span className="ml-57">가격</span>
          </div>
          {productList.length === 0 ? (
            <div className="text-gray-500 py-10">등록된 제품이 없습니다.</div>
          ) : (
            productList.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-around items-center py-4 border-y border-y-gray-300"
              >
                <span>{item.name}</span>
                <span>{item.productId}</span>
                <span>{item.prices.toLocaleString()}원</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default GreenRegisterList;
