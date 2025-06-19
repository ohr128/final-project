function Cart() {
  return (
    <div className="font-notokr p-6">
      <h1 className="text-3xl font-bold text-center my-10">장바구니</h1>


      <div className="p-6 space-y-4 w-full max-w-xl mx-auto flex">
        <div className="w-30">
          <span className="text-left block text-lg font-semibold">배송정보</span>
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex gap-2">
            <input type="text" placeholder="우편번호" className="flex-1 border border-gray-300 rounded p-2"/>
            <button className="border border-primary-500 rounded text-primary-500 px-4 py-2 cursor-pointer">우편번호찾기</button>
          </div>

          <input
            type="text" placeholder="주소" className="w-full border border-gray-300 p-2"/>

          <input type="text"  placeholder="상세주소" className="w-full border border-gray-300 p-2"/>

          <div className="flex justify-center">
            <button className="border border-primary-500 rounded text-primary-500 px-4 py-2 cursor-pointer">배송지 선택</button>
          </div>
        </div>
      </div>


      <div className="p-6 space-y-4 w-full max-w-xl mx-auto flex">
        <div>
          <span className="text-left block text-lg font-semibold">배송요청사항</span>
        </div>

        <div className="ml-4 flex-1">
          <textarea  className="w-full border border-gray-300 p-2" placeholder="(선택) 요청사항을 입력해주세요." rows={5}/>
        </div>
      </div>



      <div className="p-6 space-y-4 w-full max-w-4xl mx-auto ">
        
        <div className="text-xs">
            <span className="cursor-pointer px-2 ">전체선택</span>
            <span className="cursor-pointer">전체해제</span>
        </div>

        <div className="h-40 flex items-center justify-around border-y border-y-gray-400">

            <input className="h-5" type="checkbox" name="" id="" />

          <img className="h-30" src="https://sitem.ssgcdn.com/61/73/61/item/1000188617361_i1_750.jpg" alt="" />
          <span>제품명</span>

        <div className="flex items-center border border-gray-300 rounded">
            <button className="px-3 py-1 text-">-</button>
            <span className="px-3">1</span>
            <button className="px-3 py-1 text-lg">+</button>
        </div>
          <span>가격</span>
        </div>

        <div className="flex justify-end">
            최종 결제 금액:
        </div>

        <div className="flex justify-center my-16">
            <button className="bg-primary-500 text-white font-bold rounded py-4 px-8 cursor-pointer">결제하기</button>
        </div>

      </div>
    </div>
  );
}

export default Cart;
