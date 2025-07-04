import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import SideMenu from "../../components/SideMenu/SideMenu";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GreenDetail() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");
  const [product, setProduct] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [count, setCount] = useState(1);
  const [reviews, setReviews] = useState([]);

  const nav = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/product/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProduct(data);
        setCurrentImageIndex(0);
        setCount(1);
      });

    fetch(`${API_BASE_URL}/api/reviews?pId=${productId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("리뷰 데이터", data);
        setReviews(data);
      });
  }, [productId]);

  const nextImage = () => {
    if (product.images && product.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product.images && product.images.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + product.images.length) % product.images.length
      );
    }
  };

  const handleDecrease = () => {
    setCount((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setCount((prev) => Math.min(10, prev + 1));
  };

  const handleAddToCart = () => {
    const token = JSON.parse(localStorage.getItem("token"))?.token;
    if (!token) {
      toast.error("로그인이 필요합니다.");
      return;
    }

    fetch(`${API_BASE_URL}/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        pId: product.productId,
        quantity: count,
      }),
    }).then(async (res) => {
      if (res.ok) {
        alert("장바구니에 상품을 담았습니다.")
        nav("/cart");
      } else {
        const text = await res.text();
        if (text.includes("ORA-00001")) {
          toast.error("이미 사용자께서 담은 제품입니다.");
        }
      }
    });
  };

  const handleBuyNow = () => {
    const token = JSON.parse(localStorage.getItem("token"))?.token;
    if (!token) {
      toast.error("로그인이 필요합니다.");
      return;
    }

    const item = {
      pId: product.productId,
      quantity: count,
    };

    localStorage.setItem("immediatePurchase", JSON.stringify(item));
    fetch(`${API_BASE_URL}/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(item),
    }).then(async (res) => {
      if (res.ok) {
        nav("/cart");
      } else {
        const text = await res.text();
        if (text.includes("ORA-00001")) {
          toast.error("이미 사용자께서 담은 제품입니다.");
        }
      }
    });
  };

  return (
    <div className="flex font-notokr">
      {product.classification === "녹색 제품" ? 
      <SideMenu from="/green-product" />
      :
      <SideMenu from="/green-energy-product" />
      }
      <ToastContainer position="top-center" />
      <div className="w-4/5 px-6">
        <div className="flex justify-evenly mt-20 mb-8">
          <div className="relative w-3/5 h-90 mr-8 border-gray-400">
            {product.images && product.images.length > 0 ? (
              <>
                <img
                  className="w-full h-full object-contain"
                  src={`${API_BASE_URL}/${encodeURIComponent(
                    product.images[currentImageIndex]
                  )}`}
                  alt="제품 이미지"
                />
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute top-1/2 left-0 transform -translate-y-1/2 text-xl px-2"
                    >
                      {"<"}
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute top-1/2 right-0 transform -translate-y-1/2 text-xl px-2"
                    >
                      {">"}
                    </button>
                  </>
                )}
              </>
            ) : (
              <img
                className="w-full h-full"
                src={`${API_BASE_URL}/no_image.jpg`}
                alt="기본 이미지"
              />
            )}
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <span>제품명 : {product.name}</span>
            <span>가격 : {(product.prices * count).toLocaleString()}원</span>
            <span>포인트 : {(product.mileage * count).toLocaleString()}포인트</span>

            <div className="w-25 flex items-center border border-gray-300 rounded">
              <button onClick={handleDecrease} className="px-3 py-1">
                -
              </button>
              <span className="px-3">{count}</span>
              <button onClick={handleIncrease} className="px-3 py-1 text-lg">
                +
              </button>
            </div>

            <div className="flex">
              <button
                onClick={handleAddToCart}
                className="border border-primary-500 text-primary-500 px-4 py-2 cursor-pointer"
              >
                장바구니
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-primary-500 text-white px-4 py-2 cursor-pointer"
              >
                바로구매
              </button>
            </div>
          </div>
        </div>

        <span className="font-bold text-3xl">상세정보</span>
        <div className="border-y border-y-gray-200 justify-center items-center my-4">
          {product.classification === "녹색 제품" ? (
            <>
              <div className="my-2">제조 회사 : {product.company}</div>
              <div className="my-2">
                사업자 등록증 번호 : {product.registrationNum}
              </div>
            </>
          ) : (
            <>
              <div className="my-2">kc인증 정보 : {product.kc}</div>
              <div className="my-2">제조국 : {product.madeIn}</div>
              <div className="my-2">
                인증 기간 : {product.authenticationPeriod}
              </div>
            </>
          )}
        </div>

        <div className="border-y border-y-gray-200">
          <span className="text-xl">리뷰</span>
          {reviews.length === 0 ? (
            <div className="flex justify-center items-center h-60 text-gray-500 text-lg">
              리뷰가 없습니다.
            </div>
          ) : (
            reviews.map((review, idx) => (
              <div
                key={idx}
                className="border-y border-y-gray-200 p-10 flex flex-col gap-2"
              >
                <div className="flex gap-2">
                  {(review.rimages || []).map((img, i) => (
                    <img
                      key={i}
                      className="w-1/5 h-32 object-cover"
                      src={`${API_BASE_URL}/${encodeURIComponent(img.rimage)}`}
                      alt="리뷰 이미지"
                    />
                  ))}
                </div>
                <div className="flex items-center">
                  <strong className="mr-2">{review.uid}</strong>
                  <span className="text-sm text-gray-500">
                    <span>{new Date(review.rdate).toLocaleString()}</span>
                  </span>
                </div>
                <span>{review.rreview}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default GreenDetail;
