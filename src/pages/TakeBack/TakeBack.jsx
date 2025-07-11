import { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function TakeBack() {
  const location = useLocation();
  const {
    productName = "상품명 없음",
    orderNo,
    refundAmountValue = 0,
    pointUsed = 0,
    quantity = 1,
  } = location.state || {};

  const [isModalShow, setIsModalShow] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({
    postAddress: "",
    address: "",
    detailAddress: "",
  });
  
  const [memo, setMemo] = useState("");

  const totalRefundAmount = refundAmountValue * quantity;
  const totalPointUsed = pointUsed * quantity;

  useEffect(() => {
    const fetchAddresses = async () => {
      const raw = localStorage.getItem("token");
      const token = raw ? JSON.parse(raw)?.token : null;
      if (!token) return;

      try {
        const res = await fetch(`${API_BASE_URL}/address`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setAddresses(data);
        } else {
          const text = await res.text();
          console.error("주소 API 응답 실패:", text);
        }
      } catch (err) {
        console.error("주소 목록 불러오기 오류:", err);
      }
    };

    fetchAddresses();
  }, []);

  const handleSelectAddress = (item) => {
    setSelectedAddress(item);
    setIsModalShow(false);
  };

  const handleSubmitRefund = async () => {
    if (!memo.trim()) {
      toast.error("※ 반품 사유를 작성해주세요.");
      return;
    }

    const raw = localStorage.getItem("token");
    const token = raw ? JSON.parse(raw)?.token : null;
    if (!token) {
      toast.error("로그인 필요");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
      return;
    }

    if (!orderNo) {
      toast.error("주문번호 없음");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/takeback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderNo,
          why: memo,
          address: selectedAddress.address,
          detailAddress: selectedAddress.detailAddress,
        }),
      });

      if (res.ok) {
        toast.success("반품이 완료되었습니다.");
        setTimeout(() => {
          window.location.href = "/order-detail";
        }, 1500);
      } else {
        const errorMsg = await res.text();
        toast.error("반품 요청 실패: " + errorMsg);
      }
    } catch (err) {
      console.error("반품 요청 실패:", err);
      toast.error("반품 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="font-notokr p-6 flex flex-col">
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={1000}
        closeOnClick
        theme="colored"
      />

      <span className="text-xl font-bold my-10 text-center">{productName}</span>

      <div className="p-6 space-y-4 w-full max-w-xl mx-auto flex">
        <div className="w-20">
          <span className="text-left block text-lg font-semibold">
            반품사유<span className="text-red-600 ml-1">*</span>
          </span>
        </div>
        <div className="ml-4 flex-1">
          <textarea
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="반품사유를 입력해주세요."
            rows={6}
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-center gap-20 mb-10 ml-20">
        <span>환불금액: {totalRefundAmount.toLocaleString()} 원</span>
        <span>포인트 차감: {totalPointUsed} P</span>
      </div>

      <div className="p-6 space-y-4 w-full max-w-xl mx-auto flex">
        <div className="w-24">
          <span className="text-left block text-lg font-semibold">
            반품주소<span className="text-red-600 ml-1">*</span>
          </span>
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="우편번호"
              value={selectedAddress.postAddress}
              readOnly
              className="flex-1 border border-gray-300 rounded p-2"
            />
            <button
              className="border border-primary-500 rounded text-primary-500 px-4 py-2 cursor-pointer"
              onClick={() => setIsModalShow(true)}
            >
              반품지 선택
            </button>
          </div>

          <input
            type="text"
            placeholder="주소"
            value={selectedAddress.address}
            readOnly
            className="w-full rounded border border-gray-300 p-2"
          />

          <input
            type="text"
            placeholder="상세주소"
            value={selectedAddress.detailAddress}
            readOnly
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
      </div>

      <div className="flex justify-center my-16">
        <button
          className="bg-primary-500 text-white rounded py-2 px-6 cursor-pointer"
          onClick={handleSubmitRefund}
        >
          반품하기
        </button>
      </div>

      {isModalShow && (
        <Modal msg="반품지 선택" close={() => setIsModalShow(false)}>
          <ul>
            {addresses.map((item, idx) => (
              <li
                key={idx}
                onClick={() => handleSelectAddress(item)}
                className="border border-gray-300 my-6 p-4 rounded cursor-pointer hover:bg-green-50 hover:border-primary-500 flex flex-col gap-2"
              >
                <p className="text-sm text-left">{item.detailAddress}</p>
                <p className="text-sm text-gray-500 text-left">
                  ({item.postAddress})
                </p>
                <p>{item.address}</p>
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </div>
  );
}

export default TakeBack;
