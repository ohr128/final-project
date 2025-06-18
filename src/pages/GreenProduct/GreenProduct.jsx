import SideMenu from "../../components/SideMenu/SideMenu";
import { useState } from "react";

function GreenProduct() {

  const [page, setPage] = useState(1);
  const pageNumArray = [1, 2, 3, 4, 5];

  return (

    <div className="flex font-notokr">
      
      
      {/* 사이드바 */}
      <SideMenu from="/green-product"/>

        {/* 오른쪽 영역 */}
      <div className="w-4/5 px-6">
        

        {/* 카드 */}
        <div className="my-8">
          <h1 className="p-10 text-3xl font-bold text-center">녹색 제품</h1>

          <div>

            <div className="flex items-center justify-between mx-20">
                
                <div>
                    <span className="mx-2">가격순</span>
                    <span>적립순</span>
                </div>
                <input className="border border-gray-300  rounded-4xl py-1 px-4" placeholder="검색어를 입력해주세요." type="text" />
            </div>


          </div>


            {/* 카드 3개 */}
          <div className="grid grid-cols-3 mt-3 gap-6 m-20">
            <div className="aspect-9/12 group cursor-pointer shadow rounded-xl overflow-hidden">
              <div className="h-3/5 flex justify-center items-center overflow-hidden">
                <img
                  src="https://sitem.ssgcdn.com/61/73/61/item/1000188617361_i1_750.jpg"
                />
              </div>

              <div className="h-2/5 pt-2 relative flex flex-col justify-evenly ml-3">
                <span>제품명</span>
                <span className="font-bold">가격</span>
                <span className="text-xs mb-3">포인트 75P 적립</span>
              </div>
            </div>
              
          </div>

        </div>


        {/* 페이징 */}
        <ul className="flex gap-1 justify-center my-10 select-none">
          <li className="size-9 bg-gray-100 flex justify-center items-center border border-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#777777" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
            </svg>
          </li>

          <li className="size-9 bg-gray-100 flex justify-center items-center border border-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#777777" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </li>

          {pageNumArray.map((num) => (
            <li key={num} onClick={() => setPage(num)} className={`size-9 flex justify-center items-center ${page == num ? "bg-primary-500 text-white" : "border cursor-pointer border-gray-300"}`}>
              {num}
            </li>
          ))}

          <li className="size-9 bg-gray-100 flex justify-center items-center border border-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#777777" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </li>

          <li className="size-9 bg-gray-100 flex justify-center items-center border border-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#777777" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
            </svg>
          </li>

        </ul>



      </div>


    </div>



  );
}

export default GreenProduct;
