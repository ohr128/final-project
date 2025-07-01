import { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import { useLocation } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function TakeBack() {
  const location = useLocation();
  const {
    productName = "상품명 없음",
    orderNo,
    refundAmountValue = 0,
    pointUsed = 0,
  } = location.state || {};

  const [isModalShow, setIsModalShow] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({
    postAddress: "",
    address: "",
    detailAddress: "",
  });
  const [memo, setMemo] = useState("");

  useEffect(() => {
    const fetchAddresses = async () => {
      const raw = localStorage.getItem("token");
      const token = raw ? JSON.parse(raw)?.token : null;
      if (!token) return;

      try {
        const res = await fetch(`${API_BASE_URL}/api/address`, {
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
      alert("반품 사유를 작성해주세요.");
      return;
    }

    const raw = localStorage.getItem("token");
    const token = raw ? JSON.parse(raw)?.token : null;
    if (!token) {
      alert("로그인 필요");
      return;
    }

    if (!orderNo) {
      alert("주문번호 없음");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/takeback`, {
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
        alert("반품이 완료되었습니다.");
        window.location.href = "/order-detail";
      } else {
        const errorMsg = await res.text();
        alert("반품 요청 실패: " + errorMsg);
      }
    } catch (err) {
      console.error("반품 요청 실패:", err);
      alert("반품 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="font-notokr p-6 flex flex-col">
      <span className="text-xl font-bold my-10 text-center">{productName}</span>

      <div className="p-6 space-y-4 w-full max-w-xl mx-auto flex">
        <div className="w-20">
          <span className="text-left block text-lg font-semibold">반품사유</span>
        </div>
        <div className="ml-4 flex-1">
          <textarea
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="(필수) 반품사유를 입력해주세요."
            rows={6}
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-center gap-20 mb-10">
        <span>환불금액: {refundAmountValue.toLocaleString()}원</span>
        <span>포인트 차감: {pointUsed}P</span>
      </div>

      <div className="p-6 space-y-4 w-full max-w-xl mx-auto flex">
        <div className="w-24">
          <span className="text-left block text-lg font-semibold">반품주소</span>
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
                <p className="text-sm text-gray-500 text-left">({item.postAddress})</p>
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
