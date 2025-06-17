import logo from "../../assets/logo.png"
import kakao from "../../assets/KakaoTalk_logo.png"
import { Link } from "react-router-dom";


function Login(){

    return(
    
        <div className="container m-auto">

            <div className="mt-30">

                <div className="flex justify-center mb-16">
                    <Link to="/">
                        <img className="w-50" src={logo} alt="" />
                    </Link>
                </div>
    
                <div className="flex justify-center items-center flex-col" >
    

                    <input className="border border-gray-300 w-100 h-10 pl-2 rounded" placeholder="아이디" type="text" name="" id="" />

                    <input className="border border-gray-300 w-100 h-10 pl-2  my-2" placeholder="비밀번호" type="text" name="" id="" />

                    <button className="bg-primary-500 w-100 h-10 text-white rounded cursor-pointer">로그인</button>

                    <div className="flex justify-end text-xs text-gray-500 mt-2">
                            <Link to="/signUp" className="ml-50">회원가입</Link>
                            <Link className="ml-2">아이디 찾기</Link>
                            <Link className="ml-2">비밀번호 찾기</Link>
                    </div>

                    <button className="border border-gray-300 w-100 h-10 flex justify-center items-center my-10 rounded">
                        <img className="h-5 mr-6" src={kakao} alt="" />
                        <p>카카오톡 로그인</p>
                    </button>
    
    
                </div>

            </div>
    
    
    
        </div>
        )


}

export default Login;