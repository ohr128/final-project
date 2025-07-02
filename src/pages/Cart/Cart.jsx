import { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import { jwtDecode } from "jwt-decode";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
  console.log("주소:", selectedAddress);

  const [memo, setMemo] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const rawToken = localStorage.getItem("token");
    const parsedToken = JSON.parse(rawToken);
    const token = parsedToken?.token;

    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    fetch("http://localhost:8080/api/cart", {
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
        alert("장바구니 정보를 불러오지 못했습니다.");
      });
  }, []);

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

  const handleDelete = async (pId) => {
    const raw = localStorage.getItem("token");
    const token = raw ? JSON.parse(raw)?.token : null;

    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/deleteCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ pId }),
      });

      if (res.ok) {
        alert("삭제되었습니다.");
        window.location.reload();
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
  }, []);

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

  useEffect(() => {
    console.log("email useEffect 실행됨");
    const uId = getUidFromToken();
    if (!uId) return;

    fetch(`http://localhost:8080/api/user/email?id=${uId}`)
      .then((res) => res.text())
      .then(setEmail)
      .catch((err) => console.error("이메일 불러오기 실패", err));

    console.log(email);
  }, []);

  const handlePayment = () => {
    const IMP = window.IMP;
    IMP.init("imp38151585");

    const selectedItems = cartItems.filter(
      (items) => checkedItems[items.productId]
    );
    if (selectedItems.length === 0) {
      alert("결제할 상품을 선택해주세요");
      return;
    }
    console.log(cartItems);

    const productName =
      selectedItems.length === 1
        ? selectedItems[0].name
        : `${selectedItems[0].name} 외 ${selectedItems.length - 1} 건`;
    const pIdList = selectedItems.map((item) => item.productId);
    const quantity = selectedItems.map((item) => counts[item.productId]);
    const address = selectedAddress.address;
    const detailAddress = selectedAddress.detailAddress;
    if(!address || !detailAddress) {
      alert("주소를 입력해주세요");
      return;
    }
    console.log(pIdList);
    console.log(quantity);
    console.log(address);
    console.log(detailAddress);
    console.log(totalmileage); 

    IMP.request_pay(
      {
        pg: "html5_inicis",
        pay_method: "card",
        name: productName,
        amount: totalPrice,
        buyer_name: getUidFromToken(),
        buyer_email: "",
      },
      async function (rsp) {
        if (rsp.success) {
          const raw = localStorage.getItem("token");
          const token = raw ? JSON.parse(raw).token : null;
          const uId = getUidFromToken();
          console.log(uId);
          try {
            const res = await fetch("http://localhost:8080/order/complete", {
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
              }),
            });

            await fetch("http://localhost:8080/order/saveMileage", {
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

            const selectedProductIds = selectedItems.map((item) => item.productId);
        const newCartItems = cartItems.filter(
          (item) => !selectedProductIds.includes(item.productId)
        );
        setCartItems(newCartItems);

            const text = await res.text();
            alert(text);
          } catch (err) {
            alert("주문처리 실패");
            console.log(err);
          }
        } else {
          alert("결제 실패");
        }
      }
    );
  };

  return (
    <div className="font-notokr p-6">
      <h1 className="text-3xl font-bold text-center my-10">장바구니</h1>

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

      <div className="p-6 space-y-4 w-full max-w-4xl mx-auto">
        <div className="text-xs">
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
            className="h-40 flex items-center justify-around border-y border-y-gray-400"
          >
            <input
              className="h-5"
              type="checkbox"
              checked={checkedItems[item.productId] || false}
              onChange={() => toggleCheckbox(item.productId)}
            />
            <img
              className="h-30 w-30" 
              src={`http://localhost:8080/${encodeURIComponent(item.images)}`}
              alt="상품 이미지"
            />
            <span className="w-1/5">
              {item.name.length > 13
                ? item.name.slice(0, 13) + "..."
                : item.name}
            </span>
            <div className="flex items-center border border-gray-300 rounded">
              <button
                onClick={() => handleDecrease(item.productId)}
                className="px-3 py-1"
              >
                -
              </button>
              <span className="px-3">{counts[item.productId]}</span>
              <button
                onClick={() => handleIncrease(item.productId)}
                className="px-3 py-1 text-lg"
              >
                +
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

        <div className="flex justify-end">
          최종 결제 금액: {totalPrice.toLocaleString()}원
        </div>

        <div className="flex justify-end">
          최종 마일리지: {totalmileage.toLocaleString()}포인트
        </div>

        <div className="flex justify-center my-16">
          <button
            className="bg-primary-500 text-white font-bold rounded py-4 px-8 cursor-pointer"
            onClick={handlePayment}
          >
            결제하기
          </button>
        </div>
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

export default Cart;
