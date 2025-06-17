import logo from "../../assets/logo.png"
import { Link } from "react-router-dom";

function SignUp(){

    return(

    <div className="container m-auto">

        <div className="mt-30">

            <div className="flex justify-center mb-16">
                <Link to="/">
                    <img className="w-50" src={logo} alt="" />
                </Link>
            </div>

            <div className="flex justify-center items-center flex-col" >

                <div>
                    <input className="border border-gray-300 w-80 h-10 pl-2 rounded" placeholder="아이디 입력(8~20자)" type="text" name="" id="" />
                    <button className="bg-primary-500 w-28 h-10 text-white ml-1 rounded cursor-pointer">중복확인</button>
                </div>

                <div className="my-2">
                    <input className="border border-gray-300 w-80 h-10 pl-2 rounded" placeholder="이메일 주소" type="text" name="" id="" />
                    <button className="bg-primary-500 w-28 h-10 text-white ml-1 rounded cursor-pointer">인증하기</button>
                </div>
                
                <input className="border border-gray-300 w-110 h-10 pl-2 mb-2 rounded" placeholder="비밀번호 입력(8~12자리/ 대문자, 숫자, 특수기호 포함)" type="text" name="" id="" />
                <input className="border border-gray-300 w-110 h-10 pl-2 rounded" placeholder="비밀번호 재입력" type="text" name="" id="" />
                
                
                <button className="bg-primary-500 w-30 h-10 text-white my-20 rounded cursor-pointer">회원가입</button>


            </div>

        </div>


    </div>
    )


}

export default SignUp;