import { useEffect, useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function TakeBack() {

  const [isModalShow, setIsModalShow] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({
    postAddress: "",
    address: "",
    detailAddress: "",
  });

  const [memo, setMemo] = useState("");
  
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


  useEffect(() => {
      fetchAddresses();
    }, []);

    const handleSelectAddress = (item) => {
    setSelectedAddress(item);
    setIsModalShow(false);
  };
  
  
  
  return (
    <div className="font-notokr p-6 flex flex-col">

      <span className="text-xl font-bold my-10 text-center">상품명</span>

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
            onChange={e => setMemo(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-center gap-20 mb-10">
        <span>환불금액</span>
        <span>포인트 차감</span>
      </div>


      <div className="p-6 space-y-4 w-full max-w-xl mx-auto flex">
        <div className="w-24">
          <span className="text-left block text-lg font-semibold">반품주소</span>
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex gap-2">
            <input type="text" 
              placeholder="우편번호"
              value={selectedAddress.postAddress}
              readOnly
              className="flex-1 border border-gray-300 rounded p-2"/>
            <button className="border border-primary-500 rounded text-primary-500 px-4 py-2 cursor-pointer">우편번호찾기</button>
          </div>

          <input type="text" placeholder="주소" value={selectedAddress.address}
            readOnly className="w-full rounded border border-gray-300 p-2"/>

          <input type="text"  placeholder="상세주소" value={selectedAddress.detailAddress}
            readOnly className="w-full border border-gray-300 p-2 rounded"/>
            <button className="border border-primary-500 rounded text-primary-500 px-2 py-1 cursor-pointer">반품지 선택</button>
        </div>
      </div>


        <div className="flex justify-center my-16">
            <button className="bg-primary-500 text-white rounded py-2 px-6 cursor-pointer">
            반품하기
            </button>
        </div>



        {isModalShow && (
        <Modal msg="배송지를 선택하세요" close={() => setIsModalShow(false)}>
          <ul className="space-y-2">
            {addresses.map((item, idx) => (
              <li
                key={idx}
                onClick={() => handleSelectAddress(item)}
                className="border p-2 rounded cursor-pointer hover:bg-gray-100"
              >
                <p className="font-semibold">{item.address}</p>
                <p className="text-sm">{item.detailAddress}</p>
                <p className="text-xs text-gray-500">({item.postAddress})</p>
              </li>
            ))}
          </ul>
        </Modal>
      )}





    </div>
  );
}

export default TakeBack;
