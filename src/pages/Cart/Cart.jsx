import { useEffect, useState } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [counts, setCounts] = useState({});
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    const rawToken = sessionStorage.getItem("token");
    const token = JSON.parse(rawToken)?.token;

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
        data.forEach((item) => {
          initialCounts[item.productId] = item.quantity;
          initialChecked[item.productId] = false; 
        });

        setCounts(initialCounts);
        setCheckedItems(initialChecked);
      })
      .catch((err) => {
        console.error(err);
        alert("장바구니 정보를 불러오지 못했습니다.");
      });
  }, []);

  const handleIncrease = (id) => {
    setCounts((prev) => ({
      ...prev,
      [id]: Math.min(prev[id] + 1, 10),
    }));
  };

  const handleDecrease = (id) => {
    setCounts((prev) => ({
      ...prev,
      [id]: Math.max(prev[id] - 1, 1),
    }));
  };

  const toggleCheckbox = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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

  return (
    <div className="font-notokr p-6">
      <h1 className="text-3xl font-bold text-center my-10">장바구니</h1>

      <div className="p-6 space-y-4 w-full max-w-xl mx-auto flex">
        <div className="w-30">
          <span className="text-left block text-lg font-semibold">배송정보</span>
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex gap-2">
            <input type="text" placeholder="우편번호" className="flex-1 border border-gray-300 rounded p-2" />
            <button className="border border-primary-500 rounded text-primary-500 px-4 py-2 cursor-pointer">
              우편번호찾기
            </button>
          </div>
          <input type="text" placeholder="주소" className="w-full border border-gray-300 p-2" />
          <input type="text" placeholder="상세주소" className="w-full border border-gray-300 p-2" />
          <div className="flex justify-center">
            <button className="border border-primary-500 rounded text-primary-500 px-4 py-2 cursor-pointer">
              배송지 선택
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4 w-full max-w-xl mx-auto flex">
        <div>
          <span className="text-left block text-lg font-semibold">배송요청사항</span>
        </div>
        <div className="ml-4 flex-1">
          <textarea
            className="w-full border border-gray-300 p-2"
            placeholder="(선택) 요청사항을 입력해주세요."
            rows={5}
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

        {cartItems.map((item, idx) => (
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
              className="h-30"
              src={`http://localhost:8080/${encodeURIComponent(item.images)}`}
              alt="상품 이미지"
            />
            <span>
              {item.name.length > 13 ? item.name.slice(0, 13) + "..." : item.name}
            </span>
            <div className="flex items-center border border-gray-300 rounded">
              <button onClick={() => handleDecrease(item.productId)} className="px-3 py-1">
                -
              </button>
              <span className="px-3">{counts[item.productId]}</span>
              <button onClick={() => handleIncrease(item.productId)} className="px-3 py-1 text-lg">
                +
              </button>
            </div>
            <span>{(item.prices * counts[item.productId]).toLocaleString()}원</span>
          </div>
        ))}

        <div className="flex justify-end">
          최종 결제 금액: {totalPrice.toLocaleString()}원
        </div>

        <div className="flex justify-center my-16">
          <button className="bg-primary-500 text-white font-bold rounded py-4 px-8 cursor-pointer">
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
