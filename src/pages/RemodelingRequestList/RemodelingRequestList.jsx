import SideMenu from "../../components/SideMenu/SideMenu";
import { useState } from "react";

function RemodelingRequestList() {
  const [openAccordionId, setOpenAccordionId] = useState(null);

  const handleAccordionClick = (id) => {
    setOpenAccordionId(openAccordionId === id ? null : id);
  };

  const remodelingData = [
    {
      id: 1,
      region: "서구",
      userId: "qwer",
      requestDate: "2025-06-15",
      location: "대전광역시 서구 갈마동 OO아파트 OO동 OO호",
      size: "21평(64m²)",
      price: "6,010,284",
    },
  ];

  const AccordionItem = ({ id, title, content, isOpen, onClick }) => {
    return (
      <div className={`accordion-item ${isOpen ? "border border-primary-500" : "border border-gray-200"}`}>
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
              <span>대전광역시 {title.region}</span>
              <span>아이디</span>
              <span>{title.requestDate}</span>
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
          <span className="mb-10 text-2xl font-semibold">그린리모델링 신청내역</span>

          <div className="mb-20">
            <div className="flex justify-around mt-10 mb-2 font-semibold text-lg">
              <span>지역</span>
              <span>아이디</span>
              <span>시공날짜</span>
            </div>

            {/* 아코디언 */}
            <div id="accordion-color" className="overflow-hidden">
              {remodelingData.map((data) => (
                <AccordionItem
                  key={data.id}
                  id={data.id}
                  title={{
                    region: data.region,
                    userId: data.userId,
                    requestDate: data.requestDate,
                  }}
                  content={
                    <div className="flex flex-col gap-2">
                      <div>
                        <div className="border-b border-gray-300 flex justify-between items-center py-2">
                          <div className="flex items-center gap-1 cursor-pointer">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="currentColor"
                              className="bi bi-file-earmark-pdf"
                              viewBox="0 0 16 16"
                            >
                              <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                              <path d="M4.603 14.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.7 11.7 0 0 0-1.997.406 11.3 11.3 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.8.8 0 0 1-.58.029m1.379-1.901q-.25.115-.459.238c-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361q.016.032.026.044l.035-.012c.137-.056.355-.235.635-.572a8 8 0 0 0 .45-.606m1.64-1.33a13 13 0 0 1 1.01-.193 12 12 0 0 1-.51-.858 21 21 0 0 1-.5 1.05zm2.446.45q.226.245.435.41c.24.19.407.253.498.256a.1.1 0 0 0 .07-.015.3.3 0 0 0 .094-.125.44.44 0 0 0 .059-.2.1.1 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a4 4 0 0 0-.612-.053zM8.078 7.8a7 7 0 0 0 .2-.828q.046-.282.038-.465a.6.6 0 0 0-.032-.198.5.5 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822q.036.167.09.346z" />
                            </svg>
                            <span>견적서</span>
                          </div>
                          <div className="flex flex-col text-left">
                            <span>아이디 {data.userId}</span>
                            <span>시공 요청 날짜 {data.requestDate}</span>
                          </div>
                        </div>
                        <div className="flex flex-col p-4 gap-4">
                          <div className="border border-gray-300 p-20">지도</div>
                          <span>{data.location}</span>
                        </div>
                      </div>
                    </div>
                  }
                  isOpen={openAccordionId === data.id}
                  onClick={() => handleAccordionClick(data.id)}
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
