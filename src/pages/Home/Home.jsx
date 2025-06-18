function Home() {
  return (

    <div className="container font-notokr">

    <div className="my-8">
        <span className="font-bold text-xl">녹색 제품 목록</span>


        {/* 녹색 제품 */}
        <div className="grid grid-cols-5 mt-3 gap-6">

          <div className="aspect-9/12 group cursor-pointer shadow rounded-xl overflow-hidden">
            <div className="h-3/5 flex justify-center items-center overflow-hidden">
              <img src="https://sitem.ssgcdn.com/61/73/61/item/1000188617361_i1_750.jpg" alt="" />
            </div>
            
            <div className="h-2/5 pt-2 relative flex flex-col justify-evenly ml-3">
              <span>제품명</span>
              <span className="font-bold">가격</span>
              <span className="text-xs mb-3">포인트 75P 적립</span>
            </div>
          </div>

        </div>

        </div>


        {/* 에너지 효율 1등급 제품 */}

        <div className="my-8">
        <span className="font-bold text-xl">에너지 효율 1등급 제품</span>


        <div className="grid grid-cols-5 mt-3 gap-6">

          <div className="aspect-9/12 group cursor-pointer shadow rounded-xl overflow-hidden">
            <div className="h-3/5 flex justify-center items-center overflow-hidden">
              <img src="https://lgsj.co.kr/web/product/small/202504/a6b3d27c840a8a63bf35a93822f520f0.jpg" alt="" />
            </div>
            
            <div className="h-2/5 pt-2 relative flex flex-col justify-evenly ml-3">
              <span>제품명</span>
              <span className="font-bold">가격</span>
              <span className="text-xs mb-3">포인트 75P 적립</span>
            </div>
          </div>

        </div>

        </div>



        <div className="my-10">
          
          <div className="flex mb-2 items-center">
            <span className="font-bold text-xl mr-4">오프라인 적립매장</span>
            <input className="border border-gray-300  rounded-4xl py-1 px-4" placeholder="매장찾기" type="text" />
          </div>

          <div className="border border-gray-500 p-40">

          </div>

        </div>


    </div>

  );
}

export default Home;
