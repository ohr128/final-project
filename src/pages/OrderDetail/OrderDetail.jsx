import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideMenu from "../../components/SideMenu/SideMenu";
import axios from "axios";

function groupOrdersByDate(orders) {
  const grouped = {};

  orders.forEach((order) => {
    const date = order.orderTime?.split("T")[0];
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(order);
  });

  return grouped;
}

function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const rawToken = localStorage.getItem("token");

    if (!rawToken) {
      alert("로그인이 필요합니다.");
      window.location.href = "/login";
      return;
    }

    let parsedToken;

    try {
      parsedToken = JSON.parse(rawToken);
    } catch (err) {
      console.error("토큰 파싱 오류", err);
      alert("로그인이 필요합니다.");
      window.location.href = "/login";
      return;
    }

    const token = parsedToken?.token;
    const uId = parsedToken?.id;

    if (!token || !uId) {
      alert("로그인이 필요합니다.");
      window.location.href = "/login";
      return;
    }

    axios
      .get(`http://localhost:8080/api/order-detail?uId=${uId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error("주문 목록 조회 실패", err);
      });
  }, []);

  const groupedOrders = groupOrdersByDate(orders);

  return (
    <div className="flex font-notokr min-h-screen">
      <SideMenu from="/order-detail" />

      <div className="w-4/5 flex justify-center">
        <div className="w-full max-w-5xl flex-col my-20">
          <h1 className="p-10 text-3xl font-semibold text-center">주문목록</h1>

          {orders.length === 0 ? (
            <div className="flex justify-center items-center h-60 text-gray-500 text-lg">
              주문 내역이 없습니다.
            </div>
          ) : (
            Object.entries(groupedOrders).map(([date, dateOrders]) => (
              <div key={date} className="mb-10">
                {/* 날짜 헤더 */}
                <div className="text-lg font-bold text-gray-800 mb-4 border-b border-b-gray-400 pb-2 rounded">
                  {date}
                </div>

                {/* 해당 날짜의 주문 리스트 */}
                {dateOrders.map((order, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded p-4 mb-4"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-6">
                        <img
                          src={`http://localhost:8080/${encodeURIComponent(order.images)}`}
                          alt={order.name}
                          className="w-24 h-24 object-cover rounded"
                        />
                        <div>
                          <div className="font-medium">{order.name}</div>
                          <div className="text-gray-600">
                            {order.prices.toLocaleString()}원 /{" "}
                            <span className="text-primary-500">{order.mileage}P</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <Link to="/takeback">
                          <button className="border border-primary-500 rounded px-2 py-1 hover:bg-primary-50 cursor-pointer">
                            반품하기
                          </button>
                        </Link>
                        <Link to="/review">
                          <button className="bg-primary-500 text-white rounded px-2 py-1 hover:bg-primary-600 cursor-pointer">
                            리뷰작성
                          </button>
                        </Link>
                      </div>
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
