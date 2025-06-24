import SideMenu from "../../components/SideMenu/SideMenu";
import { useState } from "react";

const AccordionItem = ({ id, title, content, isOpen, onClick }) => {

  return (

    <div className="accordion-item border border-gray-200">
      <h2 id={`accordion-color-heading-${id}`}>
        <button
          type="button"
          className={`flex items-center justify-between w-full p-5 font-medium  border border-gray-200  gap-3 
            ${isOpen 
              ? "bg-primary-500 text-white"
              : "  hover:bg-gray-100 " 
            } 
            
          `}
          onClick={onClick}
          aria-expanded={isOpen}
          aria-controls={`accordion-color-body-${id}`}
        >
            
          <div className="flex justify-between items-center w-full pr-4">
            <span>대전광역시 {title.region}</span>
            <span>{title.requestDate}</span>
          </div>

          <svg
            className={`w-3 h-3 transition-transform duration-300 flex-shrink-0 ${
              isOpen ? "rotate-180 text-white" : "text-gray-500 dark:text-gray-400"
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
          </svg>
        </button>
      </h2>
      <div
        id={`accordion-color-body-${id}`}
        className={`overflow-hidden transition-all duration-300  ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-labelledby={`accordion-color-heading-${id}`}
      >
        <div className="p-3 ">
          {content}
        </div>
      </div>
    </div>
  );
};

function RemodelingList() {
  const quickBtnArray = ["서구", "동구", "중구", "유성구", "대덕구"];
  const [activeBtnIdx, setActiveBtnIdx] = useState(0);

  const [openAccordionId, setOpenAccordionId] = useState(null);

  const handleAccordionClick = (id) => {
    setOpenAccordionId(openAccordionId === id ? null : id);
  };

  const remodelingData = [
    {
      id: 1,
      region: "서구",
      requestDate: "2025-06-15",
      location: "대전광역시 서구 갈마동 OO아파트 OO동 OO호",
      size: "21평(64m²)",
      price: "6,010,284",
    },
    {
      id: 2,
      region: "대덕구",
      requestDate: "2025-06-08",
      location: "대전광역시 대덕구 오정동 OO빌라 OO호",
      size: "18평(59.5m²)",
      price: "5,500,000",
    },
    {
      id: 3,
      region: "유성구",
      requestDate: "2025-06-02",
      location: "대전광역시 유성구 봉명동 OO오피스텔 OO호",
      size: "21평(64m²)",
      price: "6,010,284",
    },
  ];

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
            <div id="accordion-color" className=" overflow-hidden">
              {remodelingData.map((data) => (
                <AccordionItem
                  key={data.id}
                  id={data.id}
                  title={{ region: data.region, requestDate: data.requestDate }}
                  content={
                    <div className="flex flex-col gap-2">
                      <p>
                        <span className="font-semibold">견적 대상: {data.location}</span> 
                      </p>
                      <p>
                        <span className="font-semibold">평수:</span> {data.size}
                      </p>
                      <p>
                        <span className="font-semibold">가격:</span> {data.price}원
                      </p>
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

export default RemodelingList;