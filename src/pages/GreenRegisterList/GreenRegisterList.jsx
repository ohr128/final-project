import SideMenu from "../../components/SideMenu/SideMenu";
import { Link } from "react-router-dom";

function GreenRegisterList(){

    return(

       <div className="flex font-notokr">

            <SideMenu from="/green-register-list" />

            <div className="w-4/5 px-6 flex justify-center">

                <div className="w-full max-w-3xl flex flex-col text-center mt-20">

                    <span className="mb-6 text-2xl font-semibold">녹색제품 등록내역</span>

                    <div className="flex justify-end mb-4">
                        <Link to="/register-green">
                            <button className="bg-primary-500 border-2 border-primary-500 text-white rounded px-4 cursor-pointer">등록하기</button>
                        </Link>
                    </div>

                        <div className="flex justify-around items-center py-4 border-y border-y-gray-300">
                            <span>제품명</span>
                            <span>확인번호</span>
                            
                            <div className="flex flex-col gap-1">
                                <Link to="/edit-green">
                                <button className="border border-primary-500 rounded px-4 cursor-pointer">수정하기</button>
                                </Link>
                                <button className="bg-primary-500 border-2 border-primary-500 text-white rounded px-4 cursor-pointer">삭제하기</button>
                            </div>
                        </div>

                        

                </div>



            </div>

      </div>

    )
}

export default GreenRegisterList;