import SideMenu from "../../components/SideMenu/SideMenu";
import { useState } from "react";

function Management() {
  const [openAccordionId, setOpenAccordionId] = useState(null);

  const handleAccordionClick = () => {
    setOpenAccordionId(openAccordionId === 1 ? null : 1);
  };

  const AccordionItem = ({ content, isOpen, onClick }) => {
    return (
      <div className={`accordion-item ${isOpen ? "border border-primary-500" : "border border-gray-200"}`}>
        <h2 id="accordion-color-heading-1">
          <button
            type="button"
            className={`flex items-center justify-between w-full p-5 font-medium gap-3 
              ${isOpen ? "bg-primary-500 text-white" : "hover:bg-gray-100"}
            `}
            onClick={onClick}
            aria-expanded={isOpen}
            aria-controls="accordion-color-body-1"
          >
            <div className="flex justify-between items-center w-full pr-4 cursor-pointer">
              <span>잘쓰고 있습니다.</span>
              <button className="text-white rounded py-1 px-2 cursor-pointer">삭제</button>
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
          id="accordion-color-body-1"
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
          aria-labelledby="accordion-color-heading-1"
        >
          <div className="px-4">{content}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex font-notokr">
      <SideMenu from="/management" />
      <div className="w-4/5 px-6 flex justify-center">
        <div className="w-full max-w-xl flex flex-col text-center mt-20">
          <span className="mb-4 text-2xl font-semibold">리뷰관리</span>
          <div className="mt-10 mb-20">
            <div id="accordion-color" className="overflow-hidden">
              <AccordionItem
                content={
                  <div className="flex flex-col p-4 gap-4">
                    <div className="border border-gray-300 p-20">리뷰 이미지</div>
                  </div>
                }
                isOpen={openAccordionId === 1}
                onClick={handleAccordionClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Management;
