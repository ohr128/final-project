import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideMenu from "../../components/SideMenu/SideMenu";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function groupOrdersByDate(orders) {
  const grouped = {};
  orders.forEach((order) => {
    const date = order.orderTime?.split("T")[0];
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(order);
  });
  return grouped;
}

function OrderDetail() {
  const [orders, setOrders] = useState([]);
  const [refundedOrders, setRefundedOrders] = useState([]);

  useEffect(() => {
    const rawToken = localStorage.getItem("token");
    if (!rawToken) {
      toast.error("로그인이 필요합니다.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      return;
    }

    let parsedToken;
    try {
      parsedToken = JSON.parse(rawToken);
    } catch (err) {
      console.log(err);
      toast.error("로그인이 필요합니다.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      return;
    }

    const token = parsedToken.token;
    const uId = parsedToken.id;

    if (!token || !uId) {
      toast.error("로그인이 필요합니다.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      return;
    }

    axios
      .get(`${API_BASE_URL}/api/order-detail?uId=${uId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.error("주문 목록 조회 실패", err));

    axios
      .get(`${API_BASE_URL}/api/takeback?uId=${uId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setRefundedOrders(res.data);
      })
      .catch((err) => console.error("반품 주문 목록 조회 실패", err.response || err));
  }, []);

  const groupedOrders = groupOrdersByDate(orders);

  return (
    <div className="flex font-notokr min-h-screen">
      <ToastContainer position="top-center" />
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
                <div className="text-lg font-bold text-gray-800 mb-4 border-b border-b-gray-400 pb-2">
                  {date}
                </div>

                {dateOrders.map((order, idx) => {
                  let time = "";
                  if (order.orderTime) {
                    const d = new Date(order.orderTime);
                    const hours = d.getHours().toString().padStart(2, "0");
                    const minutes = d.getMinutes().toString().padStart(2, "0");
                    time = `${hours}:${minutes}`;
                  }

                  return (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded p-4 mb-4 flex items-center justify-between gap-16"
                    >
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className="text-sm self-start text-gray-500 mb-3">{time}</div>
                        <img
                          src={`${API_BASE_URL}/${encodeURIComponent(order.images)}`}
                          alt={order.name}
                          className="w-24 h-24 object-cover rounded"
                        />
                      </div>

                      <div className="flex-1 min-w-[20px] font-medium">{order.name}</div>

                      <div className="w-24 text-gray-700">
                        {(order.prices * order.quantity).toLocaleString()}원
                      </div>

                      <div className="w-20 text-primary-500">
                        {(order.mileage * order.quantity).toLocaleString()}P
                      </div>

                      <div className="w-16 text-gray-700">{order.quantity}개</div>

                      <div className="flex flex-col gap-2 px-3">
                        {refundedOrders.some((r) => Number(r) === Number(order.oNo)) ? (
                          <span className="text-primary-500 font-semibold">반품진행중</span>
                        ) : (
                          <>
                            <Link
                              to="/takeback"
                              state={{
                                productName: order.name,
                                orderNo: order.oNo,
                                refundAmountValue: order.prices,
                                pointUsed: order.mileage,
                                quantity: order.quantity,
                              }}
                            >
                              <button className="border border-primary-500 rounded px-2 py-1 hover:bg-primary-50 cursor-pointer">
                                반품하기
                              </button>
                            </Link>

                            <Link to={`/review?pId=${order.productId}`}>
                              <button className="bg-primary-500 text-white rounded px-2 py-1 hover:bg-primary-600 cursor-pointer">
                                리뷰작성
                              </button>
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
