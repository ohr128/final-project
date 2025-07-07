import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../components/SideMenu/SideMenu";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API_PYTHON = import.meta.env.VITE_API_PYTHON
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function CertifyGreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  const [isLoding, setIsLoding] = useState(false);

  const handleBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!imageFile) return toast.error("이미지를 선택하세요.");

    setIsLoding(true);

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const ocrRes = await axios.post(`${API_PYTHON}/ocr/certification`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const authNum = ocrRes.data.auth_num;
      console.log("OCR 결과 인증번호:", authNum);

      if (!authNum) {
        toast.error("인증번호 추출 실패");
        setIsLoding(false);
        return;
      }

      try {
        await axios.get(
          `${API_BASE_URL}/api/green-check?authNum=${encodeURIComponent(authNum)}`
        );
        toast.success("인증 완료");
        navigate("/register-green", { state: { authNum } });
      } catch (checkError) {
        if (checkError.response?.status === 404) {
          toast.error("해당 인증 번호에 대한 정보가 없습니다.");
        } else {
          console.error("Spring 인증번호 확인 중 오류:", checkError);
          toast.error("서버 오류 발생");
        }
      }
    } catch (err) {
      console.error("OCR 처리 실패:", err);
      toast.error("OCR 처리에 실패했습니다.");
    }
    setIsLoding(false);
  };

  return (
    <div className="flex font-notokr">
      <SideMenu from="/certify-green" />
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
        toastStyle={{ width: "500px", fontSize: "16px", whiteSpace: "normal" }}
        />
        
      <div className="w-4/5 px-6 flex justify-center">
        <div className="w-full max-w-xl flex flex-col text-center mt-20">
          <span className="mb-10 text-2xl font-semibold">녹색기술제품 확인서</span>

          <div
            className="border border-gray-300 bg-gray-100 hover:bg-gray-200 cursor-pointer mx-auto mb-6 flex items-center justify-center"
            style={{ width: "460px", height: "600px" }}
            onClick={handleBoxClick}
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="선택된 인증서"
                className="max-w-full max-h-full object-contain p-3"
              />
            ) : (
              <p className="text-gray-500">이미지를 클릭해 추가하세요</p>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>

          <div>
            <button
              className="w-1/4 bg-primary-500 text-white rounded px-4 py-2 cursor-pointer my-10"
              onClick={handleSubmit}
            >
              인증하기
            </button>
          </div>
        </div>
          {isLoding &&
          <div className="absolute top-90 left-20 size-full bg-[#ffffff88] flex justify-center pt-70">
            <div className="size-40 border-6 border-primary-500 border-t-gray-200 rounded-full animate-spin"></div>
          </div>
          }
      </div>
    </div>
  );
}

export default CertifyGreen;