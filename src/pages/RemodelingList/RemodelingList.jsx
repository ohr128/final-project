import { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import { getCookieValue } from "../../helpers/cookieHelper";
import { jwtDecode } from "jwt-decode";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function RemodelingList() {
  const quickBtnArray = ["서구", "동구", "중구", "유성구", "대덕구"];
  const [activeBtnIdx, setActiveBtnIdx] = useState(0);
  const [openAccordionId, setOpenAccordionId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [remodelingList, setRemodelingList] = useState([]);
  const [keyWord, setKeyword] = useState("");

  const jwtToken = getCookieValue('jwt_cookie');
  const stored = localStorage.getItem("token");
  const parsed = stored ? JSON.parse(stored) : {};
  const uId = parsed?.id;
  const token = parsed?.token;
  

  useEffect(() => {
    if (jwtToken) {
      try {
          const decoded = jwtDecode(jwtToken);
          const rawRoles = decoded.authorities || "";
          
          // 쉼표로 구분된 문자열을 배열로 변환
          const roleArray = typeof rawRoles === "string" ? rawRoles.split(",") : rawRoles;
  
          // 예: ["ROLE_ADMIN", "ROLE_USER"]
          if (Array.isArray(roleArray) && roleArray.length > 0) {
            setUserRole(roleArray);
          } else {
            setUserRole([]);
          }
  
      } catch (error) {
        console.error("JWT decode error:", error);
        setUserRole([]);
      }
    } else {
      setUserRole([]);
    }

    console.log("userRole", userRole);
    console.log(uId);
  },[jwtToken]);

  const handleAccordionClick = (id) => {
    setOpenAccordionId(openAccordionId === id ? null : id);
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/findAllRemodeling`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRemodelingList(data);
        console.log(data);
      });
  },[])

  const handleApplication = async (remodelingNo) => {
    try{
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

      if(res.ok) {
        const result = await res.json();
        alert("신청이 완료되었습니다!");
        console.log(result);
      } else {
        const err = await res.text();
        alert("신청 실패:" + err);
      }
    } catch (error) {
      console.log("신청에러",error);
    }
  }

  const AccordionItem = ({ id, title, content, isOpen, onClick }) => {
    return (
      <div className={`accordion-item ${isOpen ? "border border-primary-500" : "border border-gray-200"}`}>
        {remodelingList ?
        <h2 id={`accordion-color-heading-${id}`}>
          <button
            type="button"
            className={`flex items-center justify-between w-full p-5 font-medium gap-3
              ${isOpen ? "bg-primary-500 text-white" : "hover:bg-gray-100"}
            `}
            onClick={onClick}
            aria-expanded={isOpen}
            aria-controls={`accordion-color-body-${id}`}
          >
            <div className="flex justify-around items-center w-full gap-20 pr-4">
              <span>{title.address.split(" ").slice(0, 2).join(" ")}</span>
              <span>{title.applicationDate.slice(0,10)}</span>
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
         : null}
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
  };

  return (
    <div className="flex font-notokr">
      <SideMenu from="/remodeling-list" />

      <div className="w-4/5 flex justify-center">
        <div className="w-full max-w-4xl flex-col mt-20">
          <h1 className="p-10 text-2xl font-bold text-center">그린리모델링 목록</h1>

          {/* 빠른메뉴 버튼 */}
          <ul className="w-4/5 max-sm:w-full grid grid-cols-5 m-auto my-8">
            {quickBtnArray.map((name, idx) => (
              <li
                key={idx}
                onClick={() => setActiveBtnIdx(idx)}
                className={`py-3 text-center font-bold cursor-pointer border border-gray-300 ${
                  activeBtnIdx === idx
                    ? "bg-primary-500 text-white"
                    : "text-gray-700"
                }`}
              >
                {name}
              </li>
            ))}
          </ul>

          {/* 검색창 */}
          <div className="flex justify-end">
            <input
            value={keyWord}
            onChange={e => setKeyword(e.target.value)}
              className="border border-gray-300 rounded-4xl py-1 px-4"
              placeholder="검색어를 입력해주세요."
              type="text"
            />
          </div>

          <div className="mb-20">
            <div className="flex justify-around mt-10 mb-2 font-semibold text-lg ">
              <span>지역</span>
              <span>시공요청날짜</span>
            </div>

            {/* 아코디언 */}
            <div id="accordion-color" className="overflow-hidden">
              {remodelingList.map((data) => (
                <AccordionItem
                  key={data.no}
                  id={data.no}
                  title={{ address: data.address, applicationDate: data.applicationDate }}
                  content={
                    <div className="flex flex-col gap-3 p-2">
                      {userRole?.includes("ROLE_BUSINESS") && (
                        <p><span className="font-semibold">아이디:</span> {data.uId}</p>
                      )}
                      <p><span className="font-semibold">견적 대상:</span> {data.address}</p>
                      <p><span className="font-semibold">평수:</span>{`${data.roomSize}평(${Math.ceil(
                  data.roomSize * 3.3508
                )}m²})`}</p>
                      <p><span className="font-semibold">가격:</span> {data.totalsum.toLocaleString()}원</p>
                      {userRole?.includes("ROLE_BUSINESS") && (
                        <button className="bg-primary-500 h-8 text-white font-bold" onClick={() => {
                          console.log("신청 r_no", data.no);
                          handleApplication(data.no);
                        }}> 신청 </button>
                      )}
                    </div>
                  }
                  isOpen={openAccordionId === data.no}
                  onClick={() => handleAccordionClick(data.no)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RemodelingList;
