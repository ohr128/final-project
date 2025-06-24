import { useState, useRef } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";

function CertifyBusiness() {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    
    <div className="flex font-notokr">

      <SideMenu from="/certify-business" />

      <div className="w-4/5 px-6 flex justify-center">

        <div className="w-full max-w-xl flex flex-col text-center mt-20">

          <span className="mb-10 text-2xl font-semibold">녹색기술 인증서</span>


          <div
            className="border border-gray-300 bg-gray-100 hover:bg-gray-200 cursor-pointer mx-auto mb-6 flex items-center justify-center"
            style={{ width: "460px", height: "600px" }}
            onClick={handleBoxClick}
            >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="선택된 인증서"
                className="max-w-full max-h-full object-contain p-3"/>) : (<p className="text-gray-500">선택된 파일 없음</p>)}
            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange}/>
          </div>


          {/* 등록 버튼 */}
          <div>
            <button className="w-1/4 bg-primary-500 text-white rounded px-4 py-2 cursor-pointer my-10">등록하기</button>
          </div>


        </div>

      </div>


    </div>
  );
}

export default CertifyBusiness;
