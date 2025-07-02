import SideMenu from "../../components/SideMenu/SideMenu";
import { useEffect, useState } from "react";
import { getCookieValue } from "../../helpers/cookieHelper";
import { jwtDecode } from "jwt-decode";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function RemodelingRequestList() {
  const [openAccordionId, setOpenAccordionId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [remodelingList, setRemodelingList] = useState([]);

  const jwtToken = getCookieValue("jwt_cookie");
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
        const roleArray =
          typeof rawRoles === "string" ? rawRoles.split(",") : rawRoles;

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
  }, [jwtToken]);

  useEffect(() => {
    const fetchData = async () => {
      const url = userRole?.includes("ROLE_BUSINESS")
        ? "/api/business"
        : `/api/user/${uId}`;

      try {
        fetch(`${API_BASE_URL}${url}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setRemodelingList(data);
            console.log(data);
          });
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };

    if (userRole) {
      fetchData();
    }
    console.log(remodelingList);
  }, [userRole]);

  useEffect(() => {
  if (!window.kakao || !openAccordionId) return;

  const selectedItem = remodelingList.find(item => item.no === openAccordionId);
  if (!selectedItem) return;

  const timer = setTimeout(() => {
    const mapContainer = document.getElementById(`map-${openAccordionId}`);
    if (!mapContainer) return;

    const mapOption = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new window.kakao.maps.Map(mapContainer, mapOption);
    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(selectedItem.address, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        const marker = new window.kakao.maps.Marker({
          map,
          position: coords,
        });
        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="width:250px;text-align:center;padding:6px 0;">${selectedItem.address}</div>`,
        });
        infowindow.open(map, marker);
        map.setCenter(coords);
      }
    });
  }); // 지도 로딩 딜레이

  return () => clearTimeout(timer);
}, [openAccordionId, remodelingList]);

  const handleAccordionClick = (id) => {
    setOpenAccordionId(openAccordionId === id ? null : id);
  };

  const AccordionItem = ({ id, title, content, isOpen, onClick }) => {
    return (
      <div
        className={`accordion-item ${
          isOpen ? "border border-primary-500" : "border border-gray-200"
        }`}
      >
        {remodelingList ? (
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
              <div className="flex justify-between items-center w-full pr-4">
                <span>{title.address.split(" ").slice(0, 2).join(" ")}</span>
                <span>{title.uId}</span>
                <span>{title.applicationDate.slice(0, 10)}</span>
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
        ) : null}
        <div
          id={`accordion-color-body-${id}`}
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
          aria-labelledby={`accordion-color-heading-${id}`}
        >
          <div className="px-4">{content}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex font-notokr">
      <SideMenu from="/remodeling-request-list" />

      <div className="w-4/5 px-6 flex justify-center">
        <div className="w-full max-w-2xl flex flex-col text-center mt-20">
          <span className="mb-10 text-2xl font-semibold">
            그린리모델링 신청내역
          </span>

          <div className="mb-20">
            <div className="flex justify-around mt-10 mb-2 font-semibold text-lg">
              <span>지역</span>
              <span>아이디</span>
              <span>시공날짜</span>
            </div>

            {/* 아코디언 */}
            <div id="accordion-color" className="overflow-hidden">
              {remodelingList.map((data) => (
                <AccordionItem
                  key={data.no}
                  id={data.no}
                  title={{
                    address: data.address,
                    uId: data.uId,
                    applicationDate: data.applicationDate,
                  }}
                  content={
                    <div className="flex flex-col gap-2">
                      <div>
                        <div className="border-b border-gray-300 flex justify-between items-center py-2">
                          <div className="flex items-center gap-1 cursor-pointer"></div>
                          <div className="flex items-start">
                            <p className="mr-13">아이디 {data.uId}</p>
                            <p className="mr-13">
                              시공 요청 날짜 {data.applicationDate.slice(0, 10)}
                            </p>
                            <p className="mr-10">
                              견적합계 {data.totalsum.toLocaleString()}원
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col p-4 gap-4">
                          <div
                            id={`map-${data.no}`}
                            className="w-full h-[350px] border mt-2"
                          />
                          <span>{`${data.address} ${data.dong}동 ${data.ho}호`}</span>
                        </div>
                      </div>
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

export default RemodelingRequestList;
