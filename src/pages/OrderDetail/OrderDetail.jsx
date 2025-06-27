import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideMenu from "../../components/SideMenu/SideMenu";
import axios from "axios";

function OrderList() {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    const rawToken = localStorage.getItem("token");
    const parsedToken = JSON.parse(rawToken);

    const token = parsedToken?.token;
    const uId = parsedToken?.id;

    console.log("token:", token);
    console.log("uId:", uId);
    
    
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }
    
    axios
      .get("http://localhost:8080/api/order-detail", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
          params: {
            uId: uId
          },

      })
      .then((res) => setOrders(res.data))
      .catch((err) => {
        console.error("주문 목록 조회 실패", err);
      })
  }, []);

  return (
    <div className="flex font-notokr min-h-screen">
      <SideMenu from="/order-detail" />

      <div className="w-4/5 flex justify-center">
        <div className="w-full max-w-5xl flex-col mt-20">

          <h1 className="p-10 text-2xl font-semibold text-center">주문목록</h1>

          {orders.length === 0 ? (
          <div className="flex justify-center items-center h-60 text-gray-500 text-lg">
            주문 내역이 없습니다.
          </div>
          ) : (
            orders.map((order, idx) => (
              <div key={idx} className="border border-gray-300 rounded p-4 mb-6 shadow-sm">

                {order.products.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-2 border-t border-gray-100"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">
                          {item.price.toLocaleString()}원 / {item.mileage}P
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Link to="/takeback">
                        <button className="border border-primary-500 rounded px-2 py-1 hover:bg-primary-50">
                          반품하기
                        </button>
                      </Link>
                      <Link to="/review">
                        <button className="bg-primary-500 text-white rounded px-2 py-1 hover:bg-primary-600">
                          리뷰작성
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderList;