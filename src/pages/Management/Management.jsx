import SideMenu from "../../components/SideMenu/SideMenu";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Management() {
  const [openAccordionId, setOpenAccordionId] = useState(null);
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    const rawToken = localStorage.getItem("token");
    const parsed = rawToken ? JSON.parse(rawToken) : null;
    const token = parsed?.token;

    if (!token) {
      toast.error("로그인이 필요합니다.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/allreview", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        console.log("리뷰 데이터", data);
        setReviews(data);
      }
    } catch (err) {
      console.error("리뷰 불러오기 오류:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleAccordionClick = (id) => {
    setOpenAccordionId(openAccordionId === id ? null : id);
  };

  const handleDelete = async (no) => {
    const raw = localStorage.getItem("token");
    const token = raw ? JSON.parse(raw)?.token : null;

    if (!token) {
      toast.error("로그인이 필요합니다.");
      return;
    }

    try {
      await fetch("http://localhost:8080/api/deleteReviewImg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ no }),
      });

      const res = await fetch("http://localhost:8080/api/deleteReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ no }),
      });

      if (res.ok) {
        toast.success("삭제 성공");
        setTimeout(fetchReviews, 500); // 알림이 보이도록 약간 지연
      }
    } catch (err) {
      console.error("삭제 에러:", err);
    }
  };

  const AccordionItem = ({ review, isOpen, onClick }) => {
    const { no, name, uid, rreview, rdate, rimages } = review;
    const imageList = rimages || [];

    return (
      <div
        className={`accordion-item ${
          isOpen ? "border border-primary-500" : "border border-gray-200"
        } mb-4`}
      >
        <h2 id={`accordion-heading-${no}`}>
          <button
            type="button"
            className={`flex items-center justify-between w-full p-5 font-medium gap-3 
              ${isOpen ? "bg-primary-500 text-white" : "hover:bg-gray-100"}
            `}
            onClick={onClick}
            aria-expanded={isOpen}
            aria-controls={`accordion-body-${no}`}
          >
            <div className="flex justify-between items-center w-full pr-4 cursor-pointer">
              <span>{name}</span>
            </div>
            <svg
              className={`w-3 h-3 transition-transform duration-300 flex-shrink-0 ${
                isOpen ? "rotate-180 text-white" : "text-gray-500"
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id={`accordion-body-${no}`}
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
          aria-labelledby={`accordion-heading-${no}`}
        >
          <div className="px-4 py-2 text-start">
            <div>작성 시간: {rdate.substr(0, 16).replace("T", " ")}</div>
            <div>사용자: {uid}</div>
            <div>리뷰 내용: {rreview}</div>
            {imageList.length > 0 && (
              <div className="mt-2">
                <div>이미지:</div>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {imageList.map((img, idx) => (
                    <img
                      key={idx}
                      src={`http://localhost:8080/${encodeURIComponent(img.rimage)}`}
                      className="w-24 h-24 object-cover border"
                    />
                  ))}
                </div>
              </div>
            )}
            <button
              className="text-white rounded py-1 px-2 cursor-pointer border-primary-500 bg-primary-500 mt-2 w-full"
              onClick={() => handleDelete(no)}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex font-notokr">
      <SideMenu from="/management" />
      <ToastContainer position="top-center" />
      <div className="w-4/5 px-6 flex justify-center">
        <div className="w-full max-w-xl flex flex-col text-center mt-20">
          <span className="mb-4 text-2xl font-semibold">리뷰관리</span>
          <div className="mt-10 mb-20">
            <div id="accordion-color" className="overflow-hidden">
              {reviews.length === 0 ? (
                <div className="flex justify-center items-center h-60 text-gray-500 text-lg">
                  리뷰가 없습니다.
                </div>
              ) : (
                reviews.map((review) => (
                  <AccordionItem
                    key={review.no}
                    review={review}
                    isOpen={openAccordionId === review.no}
                    onClick={() => handleAccordionClick(review.no)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Management;
