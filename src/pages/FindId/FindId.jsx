import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

function FindId(){


    return(

        <div className="container font-notokr">
            
            <div className="mt-30">

                <div className="flex justify-center mb-16">
                    <Link to="/">
                        <img className="w-50" src={logo} alt="" />
                    </Link>
                </div>

                 <div className="flex justify-center items-center flex-col gap-4" >
                    <div className="flex gap-1">
                        <input className="border border-gray-300 w-100 h-10 pl-2 rounded" placeholder="이메일 주소를 입력해주세요." type="text" name="" id="" />
                        <button className="bg-primary-500 rounded text-white px-4 py-2 cursor-pointer">인증번호 받기</button>
                    </div>

                    <div className="flex gap-1">
                        <input className="border border-gray-300 w-100 h-10 pl-2 rounded" placeholder="인증번호 입력" type="text" name="" id="" />
                        <button className="bg-primary-500 rounded text-white px-4 py-2 cursor-pointer">인증번호 확인</button>
                    </div>

                    <button className="bg-primary-500 text-white rounded py-2 px-8 cursor-pointer mt-10">아이디 찾기</button>                
                    


                 </div>



            </div>


        </div>
    );
};

export default FindId;