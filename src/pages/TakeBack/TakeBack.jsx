function TakeBack() {
  return (


    <div className="font-notokr p-6 flex flex-col">

      <span className="text-xl font-bold my-10 text-center">상품명</span>

      <div className="p-6 space-y-4 w-full max-w-xl mx-auto flex">

        <div className="w-20">
          <span className="text-left block text-lg font-semibold">반품사유</span>
        </div>

        <div className="ml-4 flex-1">
          <textarea
            className="w-full border border-gray-300 p-2"
            placeholder="(필수) 반품사유를 입력해주세요."
            rows={6}
          />
        </div>
      </div>

      <div className="flex justify-center gap-20 mb-10">
        <span>환불금액</span>
        <span>포인트 차감</span>
      </div>


      <div className="p-6 space-y-4 w-full max-w-xl mx-auto flex">
        <div className="w-24">
          <span className="text-left block text-lg font-semibold">반품주소</span>
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex gap-2">
            <input type="text" placeholder="우편번호" className="flex-1 border border-gray-300 rounded p-2"/>
            <button className="border border-primary-500 rounded text-primary-500 px-4 py-2 cursor-pointer">우편번호찾기</button>
          </div>

          <input type="text" placeholder="주소" className="w-full border border-gray-300 p-2"/>

          <input type="text"  placeholder="상세주소" className="w-full border border-gray-300 p-2"/>
            <button className="border border-primary-500 rounded text-primary-500 px-2 py-1 cursor-pointer">반품지 선택</button>

        </div>
      </div>


        <div className="flex justify-center my-16">
            <button className="bg-primary-500 text-white rounded py-2 px-6 cursor-pointer">
            반품하기
            </button>
        </div>





    </div>
  );
}

export default TakeBack;
