import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import SideMenu from "../../components/SideMenu/SideMenu";
import { FaRegStar } from "react-icons/fa";
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
  const [showInput, setShowInput] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [modalIndex, setModalIndex] = useState(0);

  const navigate = useNavigate();

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
  }, [productId, showInput]);

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
      setTimeout(() => {
        navigate("/login");
      }, 1500);
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
        toast.success("장바구니에 상품을 담았습니다.");
        setTimeout(() => {
        nav("/cart");
      }, 1500);

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
      setTimeout(() => {
        navigate("/login");
      }, 1500);
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

  useEffect(() => {
  if (showInput) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  // 페이지 나갈 때 overflow 초기화 (메모리 누수 방지)
  return () => {
    document.body.style.overflow = "auto";
  };
}, [showInput]);

  return (
    <div className="flex font-notokr">
      {product.classification === "녹색 제품" ? (
        <SideMenu from="/green-product" />
      ) : (
        <SideMenu from="/green-energy-product" />
      )}

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
      />

      <div className="w-4/5 px-6">

        <div className="flex justify-evenly mt-20 mb-20 mx-6">
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
                        className="group absolute top-1/2 left-0 transform -translate-y-1/2 text-xl px-2 cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 16 16"
                          className="bi bi-chevron-left fill-gray-400 group-hover:fill-primary-500 transition-colors"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                          />
                        </svg>
                      </button>

                    <button
                      onClick={nextImage}
                      className="group absolute top-1/2 right-0 transform -translate-y-1/2 text-xl px-2 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 16 16"
                        className="bi bi-chevron-right fill-gray-400 group-hover:fill-primary-500 transition-colors"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                        />
                      </svg>
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

          <div className="flex flex-col gap-5 flex-1">
            <span className="font-semibold text-xl">{product.name}</span>
            
            <span className="text-lg font-bold">{(product.prices * count).toLocaleString()}원</span>
            <span className="text-primary-500">
              {(product.mileage * count).toLocaleString()}P
            </span>

            {product.rating !== 0 && (
              <div className="flex gap-2">
                <FaRegStar className="mt-1" color="#ffc107" />
                {product.rating}
              </div>
            )}
            <div className="w-30 h-10 flex items-center border border-gray-300 rounded cursor-pointer justify-around my-4">
              <button onClick={handleDecrease} className="px-3 py-1 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"/>
                </svg>  
              </button>
              <span className="px-3">{count}</span>
              <button onClick={handleIncrease} className="px-3 py-1 text-lg cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                </svg>
              </button>
            </div>

            <div className="flex">
              <button
                onClick={handleAddToCart}
                className="border border-primary-500 text-primary-500 px-6 py-2 cursor-pointer text-lg"
              >
                장바구니
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-primary-500 text-white px-6 py-2 cursor-pointer text-lg"
              >
                바로구매
              </button>
            </div>
          </div>
        </div>

        <span className="font-semibold text-2xl">상세정보</span>
        <div className="border-y border-y-gray-200 justify-center items-center my-4 py-10 px-4">
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

        <div className=" my-20">
          
          <div className="mb-4">
            <span className="text-xl font-semibold">리뷰</span>
          </div>

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
                      onClick={() => {
                        setModalImages(
                          review.rimages.map(
                            (img) =>
                              `${API_BASE_URL}/${encodeURIComponent(
                                img.rimage
                              )}`
                          )
                        );
                        setModalIndex(i);
                        setShowInput(true);
                      }}
                    />
                  ))}
                </div>
                <div className="flex items-center">
                  <strong className="mr-2">{review.uid}</strong>
                  <span className="text-sm text-gray-500">
                    <span>{new Date(review.rdate).toLocaleString()}</span>
                  </span>
                </div>
                {review.rating !== 0 && (
                  <div className="flex gap-2">
                    <FaRegStar className="mt-1" color="#ffc107" />
                    {review.rating}
                  </div>
                )}
                <span>{review.rreview}</span>
              </div>
            ))
          )}
        </div>
      </div>
      {showInput && (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-100"
        >
          <img
            className="w-1/2 h-1/2"
            src={modalImages[modalIndex]}
            alt="리뷰 모달 이미지"
            onClick={() => setShowInput(false)}
          />
        </div>
      )}
    </div>
  );
}

export default GreenDetail;
