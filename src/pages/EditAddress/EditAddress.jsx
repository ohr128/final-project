import { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("API_BASE_URL", API_BASE_URL);

function EditAddress() {
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [postAddress, setPostAddress] = useState("");
  const [showInput, setShowInput] = useState(false);
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
      }
    } catch (err) {
      console.error("주소 목록 불러오기 오류:", err);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  useEffect(() => {
    if (!window.kakao || !window.daum) return;
    const mapContainer = document.getElementById("map");
    if (!mapContainer) return;
    const mapOption = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new window.kakao.maps.Map(mapContainer, mapOption);
    const geocoder = new window.kakao.maps.services.Geocoder();

    window.getAddress = () => {
      new window.daum.Postcode({
        oncomplete: function (data) {
          setAddress(data.roadAddress);
          setPostAddress(data.zonecode);
          document.getElementById("detail")?.focus();

          geocoder.addressSearch(data.roadAddress, function (result, status) {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(
                result[0].y,
                result[0].x
              );
              const marker = new window.kakao.maps.Marker({
                map,
                position: coords,
              });

              const infowindow = new window.kakao.maps.InfoWindow({
                content:
                  '<div style="width:150px;text-align:center;padding:6px 0;">배송지</div>',
              });

              infowindow.open(map, marker);
              map.setCenter(coords);
            }
          });
        },
      }).open();
    };
  }, [showInput]);

  const handleSave = async () => {
    const raw = localStorage.getItem("token");
    const token = raw ? JSON.parse(raw)?.token : null;

    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    const dto = {
      address,
      detailAddress,
      postAddress,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dto),
      });

      if (res.ok) {
        alert("주소가 저장되었습니다.");
        fetchAddresses();
        setAddress("");
        setDetailAddress("");
        setPostAddress("");
        setShowInput(false);
      }
    } catch (err) {
      console.error("에러:", err);
      alert("네트워크 오류 발생");
    }
  };

  const handleDelete = async (no) => {
    const raw = localStorage.getItem("token");
    const token = raw ? JSON.parse(raw)?.token : null;

    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/deleteAddress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ no }),
      });

      if (res.ok) {
        alert("삭제되었습니다.");
        fetchAddresses();
      }
    } catch (err) {
      console.error("삭제 에러:", err);
    }
  };

  return (
    <div className="flex font-notokr">
      <SideMenu from="/checkpw" />
      <div className="w-4/5 flex justify-center">
        <div className="w-full max-w-3xl flex flex-col mt-20">
          <h1 className="p-10 text-2xl font-bold text-center">배송지 관리</h1>

          <div className="flex flex-col w-full gap-2 px-20">
            <div className="flex justify-between font-semibold border-b border-b-gray-500 pb-3">
              <span className="ml-20">주소</span>
              <span className="ml-32">상세주소</span>
              <span className="mr-4">관리</span>
            </div>

            {addresses.length === 0 ? (
              <div className="flex justify-center items-center h-60 text-gray-500 text-lg">
                주소를 등록을 해주셔야 합니다.
              </div>
            ) : (
              addresses.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between border-b border-b-gray-200 py-2"
                >
                  <span className="w-5/12">{item.address}</span>
                  <span>{item.detailAddress}</span>
                  <button
                    className="bg-primary-500 border-primary-500 text-white rounded px-4 py-1 cursor-pointer"
                    onClick={() => handleDelete(item.no)}
                  >
                    삭제
                  </button>
                </div>
              ))
            )}
            <div className="flex justify-center my-4">
              <button
                onClick={() => setShowInput(true)}
                className="bg-primary-500 text-white px-6 py-2 rounded"
              >
                배송지 추가
              </button>
            </div>

            {showInput && (
              <div className="flex flex-col gap-3 border p-4 rounded mb-4">
                <input
                  type="text"
                  value={postAddress}
                  placeholder="우편번호"
                  className="border border-gray-300 rounded px-3 py-2"
                  readOnly
                  onClick={() => window.getAddress()}
                />
                <input
                  type="text"
                  value={address}
                  placeholder="주소"
                  className="border border-gray-300 rounded px-3 py-2"
                  readOnly
                  onClick={() => window.getAddress()}
                />
                <input
                  id="detail"
                  type="text"
                  value={detailAddress}
                  onChange={(e) => setDetailAddress(e.target.value)}
                  placeholder="상세 주소"
                  className="border border-gray-300 rounded px-3 py-2"
                />

                <div id="map" className="w-full h-[350px] border mt-2" />

                <div className="flex justify-center gap-2">
                  <button
                    className="bg-gray-400 text-white px-6 py-2 rounded"
                    onClick={() => setShowInput(false)}
                  >
                    취소
                  </button>
                  <button
                    className="bg-primary-500 text-white px-6 py-2 rounded"
                    onClick={handleSave}
                  >
                    주소 저장
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditAddress;
