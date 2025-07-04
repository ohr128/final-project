import { useEffect, useState, useRef } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_PYTHON = import.meta.env.VITE_API_PYTHON;

function CertifyBusiness() {
  const [selectedImage, setSelectedImage] = useState();
  const [imageFile, setImageFile] = useState();
  const [existingImage, setExistingImage] = useState();
  const [uId, setUId] = useState(null);
  const [isLoding, setIsLoding] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    const rawToken = localStorage.getItem("token");
    const parsed = rawToken ? JSON.parse(rawToken) : null;
    const token = parsed?.token;
    const uId = parsed?.id;

    if (!token || !uId) return;

    setUId(uId);

    axios
      .get(`${API_BASE_URL}/api/user/findUserRegistration?uId=${uId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("사업자 등록증 응답:", res.data.bimage);
        const fileName = res.data.bimage;
        if (fileName) {
          setExistingImage(`${API_BASE_URL}/${fileName}`);
        }
      })
      .catch((err) => {
        console.error("사업자 등록증 조회 실패", err);
      });
  }, []);

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
    try {
      const ocrForm = new FormData();
      ocrForm.append("file", imageFile);

      const ocrRes = await axios.post(
        `${API_PYTHON}/ocr/business`,
        ocrForm,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const authNum = ocrRes.data.auth_num;
      const b_no = authNum?.replace(/-/g, "");
      if (!b_no) return toast.error("사업자번호 추출 실패");

      const verifyRes = await axios.post(
        `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=AsKsksTbcdg8cukGUyiMQU%2FawtOq%2BcmyZvZBfGoOZHhAHXweFUxP2W1ysiSuZ6Yh%2Bnsh2KIOC%2FNQDron%2BV9iBQ%3D%3D`,
        { b_no: [b_no] },
        { headers: { "Content-Type": "application/json" } }
      );

      const result = verifyRes.data?.data?.[0];
      if (
        !result ||
        result.tax_type === "국세청에 등록되지 않은 사업자등록번호입니다."
      ) {
        return toast.error("국세청에 등록되지 않은 사업자등록번호입니다.");
      }

      const rawToken = localStorage.getItem("token");
      const parsed = rawToken ? JSON.parse(rawToken) : null;
      const token = parsed?.token;

      if (!token) return toast.error("로그인이 필요합니다.");

      const saveFormData = new FormData();
      saveFormData.append("registrationNum", b_no);
      saveFormData.append("files", imageFile);

      await axios.post(`${API_BASE_URL}/api/registration`, saveFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("사업자 등록이 완료되었습니다.");
      setTimeout(() => {
        window.location.reload();
      }, 2000);

      await axios.post(
        `${API_BASE_URL}/api/user/UserRole`,
        { uId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("사업자 전환");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error("등록 실패:", err);
      toast.error("등록 중 오류 발생");
    }
    setIsLoding(false);
  };

  const handledelete = async (uId) => {
    const raw = localStorage.getItem("token");
    const token = raw ? JSON.parse(raw)?.token : null;

    if (!token) {
      toast.error("로그인이 필요합니다.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/deleteRegistration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ uId }),
      });
      console.log("uId:", uId);

      if (res.ok) {
        const businessRes = await fetch(
          `${API_BASE_URL}/api/user/deleteBusiness`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ id: uId }),
          }
        );
        if (businessRes.ok) {
          toast.success("사업자 등록 및 권한이 모두 삭제되었습니다.");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          window.location.reload();
        } 
      } 
    } catch (err) {
      console.error("삭제 에러:", err);
      toast.error("삭제 중 오류 발생");
    }
  };

  return (
    <div className="flex font-notokr">
      <SideMenu from="/certify-business" />
      <ToastContainer position="top-center" />
      <div className="w-4/5 px-6 flex justify-center">
        <div className="w-full max-w-xl flex flex-col text-center mt-20">
          <span className="mb-10 text-2xl font-semibold">사업자 등록증</span>

          <div
            className="border border-gray-300 bg-gray-100 hover:bg-gray-200 cursor-pointer mx-auto mb-6 flex items-center justify-center"
            style={{ width: "460px", height: "600px" }}
            onClick={!existingImage ? handleBoxClick : undefined}
          >
            {existingImage ? (
              <img
                src={existingImage}
                alt="등록된 인증서"
                onError={() => {
                  console.warn("이미지 로드 실패");
                }}
                className="max-w-full max-h-full object-contain p-3"
              />
            ) : selectedImage ? (
              <img
                src={selectedImage}
                alt="선택된 인증서"
                className="max-w-full max-h-full object-contain p-3"
              />
            ) : (
              <p className="text-gray-500">이미지를 클릭해 업로드하세요</p>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>

          {!existingImage ? (
            <div>
              <button
                onClick={handleSubmit}
                className="w-1/4 bg-primary-500 text-white rounded px-4 py-2 cursor-pointer my-10"
              >
                등록하기
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => handledelete(uId)}
                className="w-1/4 bg-primary-500 text-white rounded px-4 py-2 cursor-pointer my-10"
              >
                삭제하기
              </button>
            </div>
          )}
        </div>
        {isLoding && (
          <div className="absolute top-90 left-20 size-full bg-[#ffffff88] flex justify-center pt-70">
            <div className="size-40 border-6 border-primary-500 border-t-gray-200 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CertifyBusiness;
