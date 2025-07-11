import { useState, useEffect } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function EditInfo() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPwConfirm] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [pwColor, setPwColor] = useState("black");
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [postAddress, setPostAddress] = useState("");
  const [showInput, setShowInput] = useState(false);

  const navigate = useNavigate();

  const stored = localStorage.getItem("token");
  const parsed = stored ? JSON.parse(stored) : {};
  const userId = parsed?.id;
  const token = parsed?.token;

  const checkPasswordMatch = async (confirm) => {
    if (password === "" || confirm === "") {
      setPwMessage("");
      setPwColor("black");
      return;
    }
    if (password !== confirm) {
      setPwMessage("비밀번호가 다릅니다.");
      setPwColor("red");
    }
  };

  const validatePassword = (pw) => {
  const hasUppercase = /[A-Z]/.test(pw);
  const hasNumber = /[0-9]/.test(pw);
  const hasSpecial = /[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`|\\-]/.test(pw);
  const hasMinLength = pw.length >= 8;

  return hasUppercase && hasNumber && hasSpecial && hasMinLength;
};

  const handleChange = async () => {
    if (!userId || !token) {
      toast.error("로그인 정보가 유효하지 않습니다. 다시 로그인해주세요.");
      return;
    }
    if (!password) {
      toast.error("수정할 항목이 없습니다.");
      return;
    }

    if (password && password !== passwordConfirm) {
      toast.error("비밀번호가 일치하지 않습니다.");
      return;
    }

    if(!validatePassword(password)) {
      toast.error("비밀번호는 영문 대문자, 숫자, 특수문자를 각각 하나 이상 표현해야 하며 8글자 이상이여야 합니다.");
      return;
    }
    const payload = { id: userId, password };
    if (password) payload.password = password;
    console.log("payload to backend:", payload);

    try {
      await axios.patch(`${API_BASE_URL}/user/update`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("회원정보가 수정되었습니다.");
      setTimeout(() => {
        navigate("/point");
      }, 1500);
    } catch (error) {
      console.log(error);
      toast.error("회원정보 수정 중 오류가 발생하였습니다.");
    }
  };
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
      toast.error("로그인이 필요합니다.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
      return;
    }

    const dto = {
      address,
      detailAddress,
      postAddress,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dto),
      });

      if (res.ok) {
        toast.success("주소가 저장되었습니다.");
        fetchAddresses();
        setAddress("");
        setDetailAddress("");
        setPostAddress("");
        setShowInput(false);
      }
    } catch (err) {
      console.error("에러:", err);
      toast.error("네트워크 오류 발생");
    }
  };

  const handleDelete = async (no) => {
    const raw = localStorage.getItem("token");
    const token = raw ? JSON.parse(raw)?.token : null;

    if (!token) {
      toast.error("로그인이 필요합니다.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/deleteAddress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ no }),
      });

      if (res.ok) {
        toast.success("삭제되었습니다.");
        fetchAddresses();
      }
    } catch (err) {
      console.error("삭제 에러:", err);
    }
  };

  return (
    <div className="flex font-notokr">
      <SideMenu from="/checkpw2" />

      <ToastContainer
        position="top-center"
        autoClose={1000}
        limit={1}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastStyle={{ width: "700px", fontSize: "16px", whiteSpace: "normal" }}
      />

      <div className="w-4/5 px-6 flex justify-center">
        <div className="w-250 flex flex-col text-center">
          <h1 className="p-10 text-2xl font-bold">회원정보 수정</h1>

          <div className="flex flex-col w-full gap-2 ml-45">
            <div className="flex">
              <p className="text-start w-25"> 비밀번호 변경 </p>
              <a
                onClick={() => navigate("/del-info")}
                className="text-primary-500 cursor-pointer w-20 justify-end ml-107"
              >
                회원탈퇴
              </a>
            </div>
            <input
              placeholder="새로운 비밀번호 입력"
              type="text"
              className="border border-gray-300 rounded px-3 py-2 w-150"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => checkPasswordMatch(passwordConfirm)}
            />
            <input
              placeholder="비밀번호 확인"
              type="password"
              className="border border-gray-300 rounded px-3 py-2 w-150"
              value={passwordConfirm}
              onChange={(e) => setPwConfirm(e.target.value)}
              onBlur={() => checkPasswordMatch(passwordConfirm)}
            />

            <p className="w-150 mb-5" style={{ color: pwColor }}>
              {" "}
              {pwMessage}{" "}
            </p>

            <div className="flex justify-center gap-2 mr-100 mt-5">
              <button
                className=" bg-primary-500 text-white rounded px-4 py-2 cursor-pointer"
                onClick={handleChange}
              >
                비밀번호 변경
              </button>
            </div>

            <div className="w-4/5 flex justify-center mb-10">
              <div className="w-full max-w-3xl flex flex-col mt-10">
                <h1 className="text-start mb-4">배송지 관리</h1>

                <div className="flex flex-col w-full gap-2 pr-51">
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
                        <span className="w-5/12 text-start">
                          {item.address}
                        </span>
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
                  <div className="flex justify-center">
                    <button
                      onClick={() => setShowInput(true)}
                      className="bg-primary-500 text-white px-6 py-2 rounded cursor-pointer mt-10"
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
        </div>
      </div>
    </div>
  );
}

export default EditInfo;
