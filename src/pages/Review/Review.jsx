import { useRef, useState } from "react";

function Review() {
  const fileInputRef = useRef(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxImages = 3;

  const handleBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (previewImages.length + files.length > maxImages) {
      alert(`최대 ${maxImages}장까지만 등록할 수 있습니다.`);
      return;
    }

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < previewImages.length - 1 ? prev + 1 : prev
    );
  };

  return (
    <div className="font-notokr p-6 flex flex-col">
      <span className="text-xl font-bold my-10 text-center">상품명</span>

      {/* 상세리뷰 */}
      <div className="p-6 space-y-4 w-full max-w-xl mx-auto flex">
        <div className="w-20">
          <span className="text-left block text-lg font-semibold">상세리뷰</span>
        </div>
        <div className="ml-4 flex-1">
          <textarea
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="(필수) 500자 이내로 리뷰를 작성해주세요."
            rows={6}
          />
        </div>
      </div>

      {/* 사진첨부 */}
      <div className="p-6 space-y-4 w-full max-w-xl mx-auto flex">
        <div className="w-20">
          <span className="text-left block text-lg font-semibold">사진 첨부</span>
        </div>

        <div className="w-full ml-3 flex-1">
          {/* 업로드 박스 */}
          <div
            onClick={handleBoxClick}
            className="border border-gray-300 p-2 text-center cursor-pointer rounded">
            <span className="text-gray-400 text-sm">(선택) 여기를 클릭해 사진을 첨부해 주세요</span>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <span className="text-primary-500 text-xs">※ 최대 3장 사진첨부 가능</span>

          {/* 슬라이드 박스 */}
          {previewImages.length > 0 && (
            <div className="relative mt-4 w-full h-60 border border-gray-300 rounded overflow-hidden">
              <img
                src={previewImages[currentIndex]}
                alt={`preview-${currentIndex}`}
                className="w-full h-full p-4 object-contain"
              />

              {/* 왼쪽 화살표 */}
              <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full cursor-pointer"
                disabled={currentIndex === 0}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="green" class="bi bi-chevron-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                </svg>
              </button>

              {/* 오른쪽 화살표 */}
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full cursor-pointer"
                disabled={currentIndex === previewImages.length - 1}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="green" class="bi bi-chevron-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                </svg> 
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 등록 버튼 */}
      <div className="flex justify-center my-16">
        <button className="bg-primary-500 text-white rounded py-2 px-6 cursor-pointer">
          등록하기
        </button>
      </div>
    </div>
  );
}

export default Review;
