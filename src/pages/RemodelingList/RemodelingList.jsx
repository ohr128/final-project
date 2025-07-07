import { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import { getCookieValue } from "../../helpers/cookieHelper";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function RemodelingList() {
  const [openAccordionId, setOpenAccordionId] = useState(null);
  const [userRole, setUserRole] = useState([]);
  const [remodelingList, setRemodelingList] = useState([]);
  const [keyWord, setKeyword] = useState("");
  const [appliedList, setAppliedList] = useState([]);

  const jwtToken = getCookieValue("jwt_cookie");
  const stored = localStorage.getItem("token");
  const parsed = stored ? JSON.parse(stored) : {};
  const uId = parsed?.id;
  const token = parsed?.token;
  const navigate =  useNavigate();

  useEffect(() => {
    if (jwtToken) {
      try {
        const decoded = jwtDecode(jwtToken);
        const rawRoles = decoded.authorities || "";
        const roleArray =
          typeof rawRoles === "string" ? rawRoles.split(",") : rawRoles;
        setUserRole(Array.isArray(roleArray) ? roleArray : []);
      } catch (error) {
        console.error("JWT decode error:", error);
        setUserRole([]);
      }
    } else {
      setUserRole([]);
    }
  }, [jwtToken]);

  useEffect(() => {
    if (!token){
      alert("로그인이 필요합니다.");
      navigate("/login")
      return;
    } 
    fetch(`${API_BASE_URL}/api/findAllRemodeling`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRemodelingList(data);
      })
      .catch((err) => {
        console.error("데이터 불러오기 오류:", err);
      });
  }, []);

  const handleAccordionClick = (id) => {
    setOpenAccordionId(openAccordionId === id ? null : id);
  };

  const handleApplication = async (remodelingNo) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/remodelingList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          uId: uId,
          no: remodelingNo,
        }),
      });

      if (res.ok) {
        const result = await res.json();
        toast.success("신청이 완료되었습니다!");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        setAppliedList((prev) => [...prev, remodelingNo]);
        console.log(result);
      } else {
        const err = await res.text();
        toast.error("신청 실패: " + err);
      }
    } catch (error) {
      console.error("신청 오류:", error);
    }
  };

  const filteredList = remodelingList.filter(
    (item) => item.address.includes(keyWord) || item.uId?.includes(keyWord)
  );

  const AccordionItem = ({ id, title, content, isOpen, onClick }) => (
    <div
      className={`accordion-item ${
        isOpen ? "border border-primary-500" : "border border-gray-200"
      }`}
    >
      <h2 id={`accordion-color-heading-${id}`}>
        <button
          type="button"
          className={`flex items-center justify-between w-full p-5 font-medium gap-3 transition-all duration-300
          ${isOpen ? "bg-primary-500 text-white" : "hover:bg-primary-500 hover:text-white cursor-pointer"}`}
          onClick={onClick}
          aria-expanded={isOpen}
          aria-controls={`accordion-color-body-${id}`}
        >
          <div className="flex w-full">
            <span className="w-1/2 text-center truncate" title={title.address}>
              {title.address.split(" ").slice(0, 2).join(" ")}
            </span>
            <span className="w-1/2 text-center truncate">{title.applicationDate.slice(0, 10)}</span>
          </div>
          <svg
            className={`w-3 h-3 transition-transform duration-300 flex-shrink-0 rotate-180 ${
              isOpen ? "rotate-360 text-white" : "text-gray-500"
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
        id={`accordion-color-body-${id}`}
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-labelledby={`accordion-color-heading-${id}`}
      >
        <div className="p-3">{content}</div>
      </div>
    </div>
  );

  return (
    <div className="flex font-notokr">
      <SideMenu from="/remodeling-list" />
      
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


      <div className="w-4/5 flex justify-center">
        <div className="w-full max-w-4xl flex-col mt-20">
          <h1 className="p-10 text-2xl font-bold text-center">
            그린리모델링 목록
          </h1>

          <div className="flex justify-end mb-4">
            <input
              value={keyWord}
              onChange={(e) => setKeyword(e.target.value)}
              className="border border-gray-300 rounded-4xl py-1 px-4"
              placeholder="검색어를 입력해주세요."
              type="text"
            />
          </div>

          <div className="mb-20">
            <div className="flex mt-8 mb-4 font-semibold text-lg gap-87">
              <span className="ml-54">지역</span>
              <span>시공요청날짜</span>
            </div>

            <div id="accordion-color" className="overflow-hidden">
              {filteredList.length === 0 ? (
                <div className="text-center text-gray-500 text-lg py-10">
                  검색결과가 없습니다.
                </div>
              ) : (
                filteredList.map((data) => (
                  <AccordionItem
                    key={data.no}
                    id={data.no}
                    title={{
                      address: data.address,
                      applicationDate: data.applicationDate,
                    }}
                    content={
                      <div className="flex flex-col gap-3 p-2">
                        {userRole?.includes("ROLE_BUSINESS") && (
                          <p>
                            <span className="font-semibold">아이디:</span>{" "}
                            {data.uId}
                          </p>
                        )}
                        <p>
                          <span className="font-semibold">견적 대상:</span>{" "}
                          {data.address}
                        </p>
                        <p>
                          <span className="font-semibold">평수:</span>{" "}
                          {`${data.roomSize}평(${Math.ceil(
                            data.roomSize * 3.3508
                          )}m²)`}
                        </p>
                        <p>
                          <span className="font-semibold">가격:</span>{" "}
                          {data.totalsum.toLocaleString()}원
                        </p>

                        {userRole?.includes("ROLE_BUSINESS") && (
                          appliedList.includes(data.no) ? 
                          <div className="bg-primary-500 h-8 text-white font-bold flex justify-center p-1">
                            <span> 신청완료 </span>
                          </div>
                            :
                          <button
                            className="bg-primary-500 h-8 text-white font-bold cursor-pointer"
                            onClick={() => handleApplication(data.no)}
                          >
                            신청
                          </button>
                        )}
                      </div>
                    }
                    isOpen={openAccordionId === data.no}
                    onClick={() => handleAccordionClick(data.no)}
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

export default RemodelingList;
