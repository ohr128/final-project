import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../components/SideMenu/SideMenu";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Review() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pIdFromUrl = params.get("pId");

  const fileInputRef = useRef(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [productId, setProductId] = useState(null);
  const navigate = useNavigate();
  const maxImages = 3;

  useEffect(() => {
    const rawToken = localStorage.getItem("token");
    if (!rawToken) return;

    try {
      const parsed = JSON.parse(rawToken);
      const userId = parsed?.id;
      if (!userId) return;

      if (pIdFromUrl) {
        setProductId(pIdFromUrl);
      }
    } catch (err) {
      console.error("로컬스토리지 파싱 에러:", err);
    }
  }, []);

  const handleBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (previewImages.length + files.length > maxImages) {
      toast.success(`최대 ${maxImages}장까지만 등록할 수 있습니다.`);
      setTimeout(() => {
        window.location;
      }, 2000);
      return;
    }
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
    setImageFiles((prev) => [...prev, ...files]);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < previewImages.length - 1 ? prev + 1 : prev
    );
  };

  const handleSubmitReview = async () => {
    const rawToken = localStorage.getItem("token");
    if (!rawToken) return toast.error("로그인이 필요합니다.");

    const parsed = JSON.parse(rawToken);
    const token = parsed?.token;

    if (!reviewText.trim()) {
      toast.error("리뷰 내용을 작성해 주세요.");
      return;
    }

    try {
      // 1. 리뷰 등록
      const reviewRes = await axios.post(
        `${API_BASE_URL}/api/review`,
        {
          pId: productId,
          rReview: reviewText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const reNo = reviewRes.data;
      if (imageFiles.length > 0) {
        const formData = new FormData();
        formData.append("reNo", reNo);
        imageFiles.forEach((file) => formData.append("files", file));

        await axios.post(`${API_BASE_URL}/api/uploadRImage`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      toast.success("리뷰가 성공적으로 등록되었습니다.");
      setTimeout(() => {
        window.location;
      }, 2000);
      setReviewText("");
      setPreviewImages([]);
      setImageFiles([]);
      setCurrentIndex(0);
      navigate("/");
    } catch (error) {
      console.error("리뷰 등록 실패:", error);
      toast.error("리뷰 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="font-notokr flex min-h-screen">
      {" "}
      <SideMenu from="/order-detail" />
      <ToastContainer position="top-center" />
      <div className="flex-1 p-6">
        {" "}
        <span className="text-xl font-bold my-10 text-center block">
          리뷰 작성
        </span>
        <div className="p-6 space-y-4 w-full max-w-xl mx-auto flex">
          <div className="w-20">
            <span className="text-left block text-lg font-semibold">
              상세리뷰
            </span>
          </div>
          <div className="ml-4 flex-1">
            <textarea
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="(필수) 500자 이내로 리뷰를 작성해주세요."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </div>
        </div>
        {/* 이미지 업로드 */}
        <div className="p-6 space-y-4 w-full max-w-xl mx-auto flex">
          <div className="w-20">
            <span className="text-left block text-lg font-semibold">
              사진 첨부
            </span>
          </div>

          <div className="w-full ml-3 flex-1">
            <div
              onClick={handleBoxClick}
              className="border border-gray-300 p-2 text-center cursor-pointer rounded"
            >
              <span className="text-gray-400 text-sm">
                (선택) 여기를 클릭해 사진을 첨부해 주세요
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <span className="text-primary-500 text-xs">
              ※ 최대 2장 사진첨부 가능
            </span>

            {previewImages.length > 0 && (
              <div className="relative mt-4 w-full h-60 border border-gray-300 rounded overflow-hidden">
                <img
                  src={previewImages[currentIndex]}
                  alt={`preview-${currentIndex}`}
                  className="w-full h-full p-4 object-contain"
                />
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full cursor-pointer"
                  disabled={currentIndex === 0}
                >
                  &#8592;
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full cursor-pointer"
                  disabled={currentIndex === previewImages.length - 1}
                >
                  &#8594;
                </button>
              </div>
            )}
          </div>
        </div>
        {/* 등록 버튼 */}
        <div className="flex justify-center my-16">
          <button
            className="bg-primary-500 text-white rounded py-2 px-6 cursor-pointer"
            onClick={handleSubmitReview}
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Review;
