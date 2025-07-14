import { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import { jwtDecode } from "jwt-decode";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [counts, setCounts] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [isModalShow, setIsModalShow] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({
    
    postAddress: "",
    address: "",
    detailAddress: "",
  });
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [postAddress, setPostAddress] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [memo, setMemo] = useState("");
  const navigate = useNavigate();

  const [userMileage, setUserMileage] = useState(0);
  const [totalPoint, setTotalPoint] = useState(0);

  useEffect(() => {
    const rawToken = localStorage.getItem("token");
    const parsedToken = JSON.parse(rawToken);
    const token = parsedToken?.token;

    if (!token) {
      toast.error("로그인이 필요합니다.");
      setTimeout(() => {
        navigate("/login")
      }, 1500);
      return;
    }

    fetch(`${API_BASE_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          console.error("서버 오류:", text);
          throw new Error("장바구니 정보 불러오기 실패");
        }
        return res.json();
      })
      .then((data) => {
        setCartItems(data);

        const initialCounts = {};
        const initialChecked = {};
        const immediate = JSON.parse(localStorage.getItem("immediatePurchase"));

        data.forEach((item) => {
          initialCounts[item.productId] = item.quantity;

          if (immediate?.pId === item.productId) {
            initialChecked[item.productId] = true;
          } else {
            initialChecked[item.productId] = false;
          }
        });

        setCounts(initialCounts);
        setCheckedItems(initialChecked);

        localStorage.removeItem("immediatePurchase");
      })
      .catch((err) => {
        console.error(err);
        toast.error("장바구니 정보를 불러오지 못했습니다.");
      });
  }, []);

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

  const fetchUserMileage = async () => {
    const raw = localStorage.getItem("token");
    const token = raw ? JSON.parse(raw)?.token : null;
    const uId = getUidFromToken();

    if (!token || !uId) return;

    try {
      const res = await fetch(`${API_BASE_URL}/user/userById?id=${uId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setUserMileage(data.totalPoint || 0);
      }
    } catch (err) {
      console.error("사용자 마일리지 조회 실패:", err);
    }
  };

  const handleDelete = async (pId) => {
    const raw = localStorage.getItem("token");
    const token = raw ? JSON.parse(raw)?.token : null;

    if (!token) {
      toast.error("로그인이 필요합니다.");
      setTimeout(() => {
        navigate("/login")
      }, 1500);

      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/deleteCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ pId }),
      });

      if (res.ok) {
        toast.success("삭제되었습니다.");
        setTimeout(() => {
            window.location.reload();
        }, 1200);
      } else {
        const text = await res.text();
        console.error("삭제 실패:", text);
      }
    } catch (err) {
      console.error("삭제 에러:", err);
    }
  };

  useEffect(() => {
    fetchAddresses();
    fetchUserMileage();
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
        setSelectedAddress({
          postAddress,
          address,
          detailAddress,
        }); 
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

  const handleIncrease = (id) => {
    setCounts((prev) => ({ ...prev, [id]: Math.min(prev[id] + 1, 10) }));
  };

  const handleDecrease = (id) => {
    setCounts((prev) => ({ ...prev, [id]: Math.max(prev[id] - 1, 1) }));
  };

  const toggleCheckbox = (id) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const selectAll = () => {
    const allChecked = {};
    cartItems.forEach((item) => {
      allChecked[item.productId] = true;
    });
    setCheckedItems(allChecked);
  };

  const deselectAll = () => {
    const noneChecked = {};
    cartItems.forEach((item) => {
      noneChecked[item.productId] = false;
    });
    setCheckedItems(noneChecked);
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    return checkedItems[item.productId]
      ? sum + item.prices * counts[item.productId]
      : sum;
  }, 0);

  const totalmileage = cartItems.reduce((sum, item) => {
    return checkedItems[item.productId]
      ? sum + item.mileage * counts[item.productId]
      : sum;
  }, 0);

  const discountedTotal = Math.max(totalPrice - totalPoint);

  const handleMileageChange = (e) => {
    const value = parseInt(e.target.value) || 0;

    if (value < 0) setTotalPoint(0);
    else if (value > userMileage) setTotalPoint(userMileage);
    else if (value > totalPrice) setTotalPoint(totalPrice);
    else setTotalPoint(value);
  };

  const handleOpenAddressModal = () => {
    setIsModalShow(true);
  };

  const handleSelectAddress = (item) => {
    setSelectedAddress(item);
    setIsModalShow(false);
  };

  const getUidFromToken = () => {
    const tokenStr = localStorage.getItem("token");
    if (!tokenStr) return null;

    try {
      const tokenObj = JSON.parse(tokenStr);
      const decoded = jwtDecode(tokenObj.token);
      return decoded.sub;
    } catch (error) {
      console.error("토큰 디코딩 실패:", error);
      return null;
    }
  };

  const handlePayment = () => {
    const IMP = window.IMP;
    IMP.init("imp38151585");

    const selectedItems = cartItems.filter(
      (items) => checkedItems[items.productId]
    );
    if (selectedItems.length === 0) {
      toast.error("결제할 상품을 선택해주세요");
      return;
    }

    const productName =
      selectedItems.length === 1
        ? selectedItems[0].name
        : `${selectedItems[0].name} 외 ${selectedItems.length - 1} 건`;
    const pIdList = selectedItems.map((item) => item.productId);
    const quantity = selectedItems.map((item) => counts[item.productId]);
    const address = selectedAddress.address;
    const detailAddress = selectedAddress.detailAddress;
    if (!address || !detailAddress) {
      toast.error("주소를 입력해주세요");
      return;
    }
    if (discountedTotal < 100) {
      toast.error("최소 결제 금액은 100원 이상이어야 합니다.");
      return;
    }

    IMP.request_pay(
      {
        pg: "html5_inicis",
        pay_method: "card",
        name: productName,
        amount: discountedTotal,
        buyer_name: getUidFromToken(),
        buyer_email: "",
      },
      async function (rsp) {
        if (rsp.success) {
          const raw = localStorage.getItem("token");
          const token = raw ? JSON.parse(raw).token : null;
          const uId = getUidFromToken();
          try {
            const res = await fetch(`${API_BASE_URL}/order/complete`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                uId: uId,
                productId: pIdList,
                memo: memo,
                quantity: quantity,
                address: address,
                detailAddress: detailAddress,
                mileage: totalmileage,
                usedPoint: totalPoint,
              }),
            });

            await fetch(`${API_BASE_URL}/order/saveMileage`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                uId: uId,
                mileage: totalmileage,
              }),
            });

            await fetch(`${API_BASE_URL}/order/minusMileage`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                uId: uId,
                usedPoint: totalPoint,
              }),
            });

            await fetch(`${API_BASE_URL}/order/plusMileage`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                uId: uId,
                mileage: totalmileage,
              }),
            });

            await fetch(`${API_BASE_URL}/order/delete`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                uId: uId,
              }),
            });

            const selectedProductIds = selectedItems.map(
              (item) => item.productId
            );
            const newCartItems = cartItems.filter(
              (item) => !selectedProductIds.includes(item.productId)
            );
            setCartItems(newCartItems);

            const text = await res.text();
            toast.success(text);
            setTimeout(() => {
              navigate("/order-detail");
            }, 2000);
          } catch (err) {
            toast.error("주문처리 실패");
            console.log(err);
          }
        } else {
          toast.error("결제가 취소 되었습니다.");
        }
      }
    );
  };

  useEffect(() => {
  if (isModalShow) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  // 페이지 나갈 때 overflow 초기화 (메모리 누수 방지)
  return () => {
    document.body.style.overflow = "auto";
  };
}, [isModalShow]);

  return (
    <div className="font-notokr p-6">

      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={1000}
        closeOnClick
        theme="colored"
      />
      <h1 className="text-3xl font-bold text-center my-10">장바구니</h1>

      <div className="p-6 w-full max-w-4xl mx-auto">
        <div className="text-sm mb-4">
          <span className="cursor-pointer px-2" onClick={selectAll}>
            전체선택
          </span>
          <span className="cursor-pointer" onClick={deselectAll}>
            전체해제
          </span>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex justify-center items-center h-60 text-gray-500 text-lg">
            장바구니에 제품이 없습니다.
          </div>
        ) : (
          cartItems.map((item, idx) => (
            <div
              key={idx}
              className="h-40 flex items-center justify-around border-y border-y-gray-200"
            >
              <input
                className="w-4 h-4 cursor-pointer"
                type="checkbox"
                checked={checkedItems[item.productId] || false}
                onChange={() => toggleCheckbox(item.productId)}
              />
              <img
                className="h-30 w-30"
                src={`${API_BASE_URL}/${encodeURIComponent(item.images)}`}
                alt="상품 이미지"
              />
              <span className="w-1/5">
                {item.name.length > 13
                  ? item.name.slice(0, 13) + "..."
                  : item.name}
              </span>

              <div className="flex items-center border border-gray-300 rounded py-1">
                <button
                  onClick={() => handleDecrease(item.productId)}
                  className="px-3 py-1 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"/>
                  </svg>
                </button>
                <span className="px-3">{counts[item.productId]}</span>
                <button
                  onClick={() => handleIncrease(item.productId)}
                  className="px-3 py-1 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                  </svg>
                </button>
              </div>

              <span>
                {(item.prices * counts[item.productId]).toLocaleString()}원
              </span>

              <button
                className="bg-primary-500 border-primary-500 text-white rounded px-4 py-1 cursor-pointer"
                onClick={() => handleDelete(item.productId)}
              >
                삭제
              </button>
            </div>
          ))
        )}
        <div className="flex justify-end items-center gap-4 mt-4">
          <span>보유 포인트: {userMileage.toLocaleString()}P</span>
          사용 포인트:
          <input
            type="number"
            min="100"
            max={Math.min(userMileage, totalPrice)}
            value={totalPoint}
            onChange={handleMileageChange}
            className="ml-2 p-1 border rounded w-24 text-right"
          />
          P
        </div>

        <div className="flex justify-end mt-2">
          최종 결제 금액: {discountedTotal.toLocaleString()}원
        </div>
        <div className="flex justify-end mt-2">
          추가 마일리지: {totalmileage.toLocaleString()}점
        </div>
        <div className="flex justify-end mt-2">
          추가 포인트: {totalmileage.toLocaleString()}P
        </div>
      </div>

      <div className="p-6 space-y-4 w-full max-w-xl mx-auto flex">
        <div className="w-30">
          <span className="text-left block text-lg font-semibold">
            배송정보
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
              onClick={handleOpenAddressModal}
              className="border border-primary-500 rounded text-primary-500 px-4 py-2 cursor-pointer"
            >
              배송지 선택
            </button>
          </div>
          <input
            type="text"
            placeholder="주소"
            value={selectedAddress.address}
            readOnly
            className="w-full border border-gray-300 p-2 rounded"
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
      <div className="flex flex-col justify-center my-16">
        <div className="flex justify-center my-4">
          <button
            onClick={() => setShowInput(true)}
            className="bg-primary-500 text-white px-6 py-2 rounded cursor-pointer"
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
                className="bg-gray-400 text-white px-6 py-2 rounded cursor-pointer"
                onClick={() => setShowInput(false)}
              >
                취소
              </button>
              <button
                className="bg-primary-500 text-white px-6 py-2 rounded cursor-pointer"
                onClick={handleSave}
              >
                주소 저장
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="p-6 space-y-4 w-full max-w-xl mx-auto flex">
        <div>
          <span className="text-left block text-lg font-semibold">
            배송요청사항
          </span>
        </div>
        <div className="ml-4 flex-1">
          <textarea
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="(선택) 요청사항을 입력해주세요."
            rows={5}
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-center my-16">
        <button
          className="bg-primary-500 text-white font-bold rounded py-4 px-8 cursor-pointer"
          onClick={handlePayment}
        >
          결제하기
        </button>
      </div>

      {isModalShow && (
        <Modal msg="배송지를 선택하세요" close={() => setIsModalShow(false)}>
          <ul>
            {addresses.map((item, idx) => (
              <li
                key={idx}
                onClick={() => handleSelectAddress(item)}
                className="border border-gray-300 my-6 p-4 rounded cursor-pointer hover:bg-green-50 hover:border-primary-500 flex flex-col gap-2"
              >
                <p className="text-left">{item.address}</p>
                <p className="text-sm text-left">{item.detailAddress}</p>
                <p className="text-sm text-gray-500 text-left">({item.postAddress})</p>
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </div>
  );
}

export default Cart;
