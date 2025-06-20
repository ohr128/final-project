import SideMenu from "../../components/SideMenu/SideMenu";
import { Link } from "react-router-dom";

function EditInfo(){

    return(

        <div className="flex font-notokr">
            <SideMenu from="/check-info" />

            <div className="w-4/5 px-6 flex justify-center">
                <div className="w-full max-w-md flex flex-col text-center mt-20">
                    <h1 className="p-10 text-2xl font-bold">회원정보 수정</h1>

                    <div className="flex flex-col w-full gap-2">

                        <div>
                            <input className="border border-gray-300 w-80 h-10 pl-2 rounded" placeholder="이메일 주소" type="text" name="" id="" />
                            <button className="bg-primary-500 w-28 h-10 text-white ml-1 rounded cursor-pointer">인증번호 전송</button>
                        </div>

                        <div>
                            <input className="border border-gray-300 w-80 h-10 pl-2 rounded" placeholder="인증번호" type="text" name="" id="" />
                            <button className="bg-primary-500 w-28 h-10 text-white ml-1 rounded cursor-pointer">인증하기</button>
                        </div>

                        <input placeholder="기존 비밀번호 입력" type="password" className="border border-gray-300 rounded px-3 py-2"/>
                        <input placeholder="새로운 비밀번호 입력" type="password" className="border border-gray-300 rounded px-3 py-2"/>
                        <input placeholder="비밀번호 확인" type="password" className="border border-gray-300 rounded px-3 py-2"/>

                        <div className="flex justify-baseline">
                            <button className=" w-1/4 bg-primary-500 border-primary-500 text-white rounded cursor-pointer">회원탈퇴</button>
                        </div>

                        <div className="flex justify-center gap-3 my-20">
                            <Link to="/order-detail">
                                <button className="border border-primary-500 text-primary-500 rounded px-4 py-2 cursor-pointer">뒤로가기</button>
                            </Link>
                            <button className=" w-1/4 bg-primary-500 text-white rounded px-4 py-2 cursor-pointer">수정하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default EditInfo;