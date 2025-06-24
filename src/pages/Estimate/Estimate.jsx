import SideMenu from "../../components/SideMenu/SideMenu";

function Estimate(){

    return(

        <div className="flex font-notokr">
            
            <SideMenu from="/remodeling-request" />

             <div className="w-4/5  flex justify-center">

                <div className="w-full max-w-3xl flex flex-col mt-20">
                    <h1 className="p-10 text-2xl font-bold text-center">그린리모델링 견적서</h1>

                    <div className="border-y border-y-gray-300 flex flex-col gap-6 p-6">
                        <span>견적대상: 대전광역시 중구 용두동 OO아파트 OO동 OO호</span>
                        <span>공사규모: 21평(64m²)  방 2, 욕실 1</span>
                        <span className="font-bold">견적합계: 6,010,284</span>
                    </div>

                    

                    <div className="flex justify-end m-4">
                        <button className="border-2 border-primary-500 rounded flex justify-center items-center gap-2 p-1">
                            <span className="text-primary-500 font-bold">PDF 다운로드</span>
                        </button>
                    </div>


                    <div className="flex justify-center mt-10 mb-30">
                        <table className="border-collapse block">

                            <thead>
                                <tr>
                                    <td className="py-2 px-10 border border-gray-200 bg-green-100 text-center font-bold">공사명</td>
                                    <td className="py-2 px-10 border border-gray-200 bg-green-100 text-center font-bold">금액</td>
                                </tr>
                            </thead>
                            
                            <tbody>
                                <tr>
                                    <td className="py-2 px-10 border border-gray-200">창호공사</td>
                                    <td className="py-2 px-10 border border-gray-200">2,650,071</td>
                                </tr>

                                <tr>
                                    <td className="py-2 px-10 border border-gray-200">조명공사</td>
                                    <td className="py-2 px-10 border border-gray-200">810,071</td>
                                </tr>

                                <tr>
                                    <td className="py-2 px-10 border border-gray-200">바닥공사</td>
                                    <td className="py-2 px-10 border border-gray-200">1,700,071</td>
                                </tr>

                                <tr>
                                    <td className="py-2 px-10 border border-gray-200">철거공사</td>
                                    <td className="py-2 px-10 border border-gray-200">850,071</td>
                                </tr>

                            </tbody>

                        </table>
                    </div>
                    



                </div>



            </div>






        </div>
    )
}

export default Estimate;