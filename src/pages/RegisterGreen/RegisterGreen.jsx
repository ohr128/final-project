import SideMenu from "../../components/SideMenu/SideMenu";
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function RegisterGreen() {
  console.log('test');
  const location = useLocation();
  const navigate = useNavigate();
  const passedAuthNum = location.state?.authNum || "";

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const fileInputRef = useRef(null);
  const maxImages = 3;


  const handleBoxClick = () => {
    if (selectedImages.length >= maxImages) return;
    fileInputRef.current.click();
  };

  const [mileage, setMileage] = useState("");
  const [authNum, setAuthNum] = useState(passedAuthNum);
  const [name, setName] = useState("");
  const [prices, setPrices] = useState("");
  const [classification, setClassification] = useState("녹색 제품");
  const [company, setCompany] = useState("");
  const [makeDate, setMakeDate] = useState("");
  const [registrationNum, setRegistrationNum] = useState("");

  useEffect(() => {
    const rawToken = localStorage.getItem("token");
    if (rawToken) {
      try {
        const parsed = JSON.parse(rawToken);
        const userId = parsed?.id;
        if (userId) setRegistrationNum(userId);
      } catch (err) {
        console.error("토큰 파싱 에러:", err);
      }
    }
  }, []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (selectedImages.length + files.length > maxImages) {
      alert(`최대 ${maxImages}장까지만 등록할 수 있습니다.`);
      return;
    }

    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prev) => [...prev, ...imageUrls]);
    setSelectedFiles((prev) => [...prev, ...files]); 
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (currentIndex < selectedImages.length - 1)
      setCurrentIndex(currentIndex + 1);
  };

  const handleSubmit = async () => {
    try {
      const data = {
        productId: authNum,
        name,
        makeDate,
        classification,
        company,
        registrationNum,
        prices: parseInt(prices),
        mileage: parseInt(mileage),
      };

      const res = await axios.post(`${API_BASE_URL}/api/addobject`, data);

      if (res.status === 200 || res.status === 201) {
        const formData = new FormData();
        formData.append("productId", authNum);
        formData.append("productName", name);

        for (let i = 0; i < selectedFiles.length; i++) {
          formData.append("files", selectedFiles[i]);
        }

        await axios.post(`${API_BASE_URL}/api/uploadImage`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        alert("제품이 성공적으로 등록되었습니다.");
        navigate("/green-register-list");
      }
    } catch (error) {
      console.error(error);
      alert("등록 실패");
    }
  };

  return (
    <div className="flex font-notokr">
      <SideMenu from="/green-register-list" />
      <div className="w-4/5 px-6 flex justify-center">
        <div className="w-full max-w-3xl flex flex-col text-center mt-20">
          <span className="mb-10 text-2xl font-semibold">
            녹색기술제품 등록
          </span>

          <div className="flex gap-30">
            <div>
              <span className="font-semibold">제품사진</span>
              <div
                className={`relative h-80 w-80 p-4 border border-gray-300 ${
                  selectedImages.length >= maxImages
                    ? "bg-gray-200"
                    : "bg-gray-100 hover:bg-gray-200"
                } cursor-pointer mt-6 mx-auto mb-6 flex items-center justify-center`}
                onClick={handleBoxClick}
              >
                {selectedImages.length > 0 ? (
                  <>
                    <img
                      src={selectedImages[currentIndex]}
                      alt="제품 이미지"
                      className="max-w-full max-h-full object-contain"
                    />
                    {currentIndex > 0 && (
                      <button
                        onClick={handlePrev}
                        className="absolute left-2 top-1/2 -translate-y-1/2  text-white  cursor-pointer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="green" class="bi bi-chevron-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                        </svg>

                      </button>
                    )}
                    {currentIndex < selectedImages.length - 1 && (
                      <button
                        onClick={handleNext}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-white  cursor-pointer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="green" class="bi bi-chevron-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                        </svg> 

                      </button>
                    )}
                  </>
                ) : (
                  <p className="text-gray-500">이미지를 클릭해 추가하세요</p>
                )}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
              <span className="text-primary-500 text-sm">
                ※ 최대 3장 사진첨부 가능
              </span>
            </div>

            <div className="mt-10 flex flex-col gap-10">
              <div className="flex items-center gap-6">
                <span>확인번호</span>
                <input
                  className="border border-gray-300 p-1"
                  type="text"
                  value={authNum}
                  readOnly
                />
              </div>
              <div className="flex items-center gap-10">
                <span>제품명</span>
                <input
                  className="border border-gray-300 p-1"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-14">
                <span>가격</span>
                <input
                  className="border border-gray-300 p-1"
                  type="text"
                  value={prices}
                  onChange={(e) => setPrices(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-14">
                <span>구분</span>
                <input
                  className="border border-gray-300 p-1"
                  type="text"
                  value={classification}
                  readOnly
                />
              </div>
              <div className="flex items-center gap-10">
                <span>제조사</span>
                <input
                  className="border border-gray-300 p-1"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-10">
                <span>제조일</span>
                <input
                  className="border border-gray-300 p-1"
                  type="text"
                  placeholder="YYYY-MM-DD"
                  value={makeDate}
                  onChange={(e) => setMakeDate(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <span>사업자 등록</span>
                <input
                  className="border border-gray-300 p-1"
                  type="text"
                  value={registrationNum}
                  readOnly
                />
              </div>
              <div className="flex items-center gap-6">
                <span>마일리지</span>
                <input
                  className="border border-gray-300 p-1"
                  type="text"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                />
              </div>
              <div>
                <button
                  className="bg-primary-500 text-white rounded px-4 py-2 cursor-pointer my-10"
                  onClick={handleSubmit}
                >
                  등록하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterGreen;
