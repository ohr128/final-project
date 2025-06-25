import SideMenu from "../../components/SideMenu/SideMenu";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function GreenRegisterList() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const rawToken = localStorage.getItem("token");
    if (!rawToken) return;

    try {
      const parsed = JSON.parse(rawToken);
      const userId = parsed?.id;

      if (!userId) return;

      fetch(`http://localhost:8080/api/findUserProduct?registrationNum=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setProductList(data);
        })
        .catch((err) => {
          console.error("제품 목록 로딩 실패:", err);
          alert("제품 목록을 불러오지 못했습니다.");
        });
    } catch (err) {
      console.error("로컬스토리지 파싱 에러:", err);
    }
  }, []);

  return (
    <div className="flex font-notokr">
      <SideMenu from="/green-register-list" />

      <div className="w-4/5 px-6 flex justify-center">
        <div className="w-full max-w-3xl flex flex-col text-center mt-20">
          <span className="mb-6 text-2xl font-semibold">녹색제품 등록내역</span>

          <div className="flex justify-end mb-4">
            <Link to="/register-green">
              <button className="bg-primary-500 border-2 border-primary-500 text-white rounded px-4 cursor-pointer">
                등록하기
              </button>
            </Link>
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

                <div className="flex flex-col gap-1">
                  <Link to={`/edit-green?productId=${item.productId}`}>
                    <button className="border border-primary-500 rounded px-4 cursor-pointer">
                      수정하기
                    </button>
                  </Link>
                  <button className="bg-primary-500 border-2 border-primary-500 text-white rounded px-4 cursor-pointer">
                    삭제하기
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default GreenRegisterList;
