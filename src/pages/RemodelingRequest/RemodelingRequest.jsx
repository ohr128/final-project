import SideMenu from "../../components/SideMenu/SideMenu";

function RemodelingRequest(){


    return(

        <div className="flex font-notokr">
            
            <SideMenu from="/remodeling-request" />

             <div className="w-4/5  flex justify-center">

                <div className="w-full max-w-3xl flex flex-col mt-20">
                    <h1 className="p-10 text-2xl font-bold text-center">그린리모델링 신청</h1>

                    <div className="p-6 space-y-4 w-full max-w-xl mx-auto">

                    <span className="block text-lg font-semibold">지번주소</span>

                    <div className="flex-1 space-y-3">
                        <div className="flex gap-2">
                            <input type="text" placeholder="우편번호" className="flex-1 border border-gray-300 rounded p-2"/>
                            <button className="border border-primary-500 rounded text-primary-500 px-4 py-2 cursor-pointer">우편번호찾기</button>
                        </div>

                        <input type="text" placeholder="지번주소" className="w-full rounded border border-gray-300 p-2"/>
                    </div>
                    

                    <div className="flex items-center gap-4 mt-16">
                        <span className="block text-lg font-semibold">상세주소</span>
                        <span className="text-gray-500 text-xs">※ 단독주택일 경우, 선택사항</span>
                    </div>
                    

                    <div className="flex gap-3 items-center">
                        <input type="text" className="w-16 h-10 border border-gray-300 rounded p-2 text-center placeholder:text-sm" placeholder="선택" />
                        <span>동</span>

                        <input type="text" className="w-16 h-10 border border-gray-300 rounded p-2 text-center placeholder:text-sm" placeholder="필수" />
                        <span>호</span>
                    </div>



                    <div className="flex gap-20">
                        <div>
                            <span className="block text-lg font-semibold mt-16 mb-2">평수찾기</span>

                            <div className="flex-1 space-y-3">
                                <div className="flex gap-2">
                                    <input type="text" className="flex w-24 border border-gray-300 rounded p-2 text-center"/>
                                    <button className="border border-primary-500 rounded text-primary-500 px-4 py-2 cursor-pointer">평수찾기</button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <span className="block text-lg font-semibold mt-16 mb-2">방 개수</span>
                            <select className="border border-gray-300 p-1 rounded m-1" name="" id="">
                                <option value="">선택</option>
                                <option value="">1개</option>
                                <option value="">2개</option>
                                <option value="">3개</option>
                                <option value="">4개</option>
                            </select>

                        </div>

                        <div>
                            <span className="block text-lg font-semibold mt-16 mb-2">욕실 개수</span>
                            <select className="border border-gray-300 p-1 rounded m-1" name="" id="">
                                <option value="">선택</option>
                                <option value="">1개</option>
                                <option value="">2개</option>
                                <option value="">3개</option>
                                <option value="">4개</option>
                            </select>

                        </div>

                    </div>

                    
                    <div className="flex justify-center my-20">
                        <button className="w-1/4 bg-primary-500 text-white rounded px-4 py-2 cursor-pointer my-10">견적서 생성</button>
                    </div>






                </div>

                </div>
            </div>
        
        
        
        
        
        
        
        
        
        
        </div>

    )
}

export default RemodelingRequest;