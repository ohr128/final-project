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

                 <div className="flex justify-center items-center flex-col gap-4 " >
                        
                    <input type="text" placeholder="아이디 입력" className="w-100 border rounded border-gray-300 p-2"/>
                    <input type="text" placeholder="비밀번호 입력" className="w-100 border rounded border-gray-300 p-2"/>
                    <input type="text" placeholder="비밀번호 확인" className="w-100 border rounded border-gray-300 p-2"/>


                    <div className="flex gap-1">
                        <input className="border border-gray-300 w-80 h-10 pl-2 rounded" placeholder="이메일 주소를 입력해주세요." type="text" name="" id="" />
                        <button className="bg-primary-500 rounded text-white px-4 py-2 cursor-pointer">인증번호 받기</button>
                    </div>

                    <div className="flex gap-1">
                        <input className="border border-gray-300 w-80 h-10 pl-2 rounded" placeholder="인증번호" type="text" name="" id="" />
                        <button className="bg-primary-500 rounded text-white px-4 py-2 cursor-pointer">인증번호 확인</button>
                    </div>


                    <button className="bg-primary-500 text-white rounded py-2 px-8 cursor-pointer mt-10">변경하기</button>                
                    


                 </div>



            </div>


        </div>
    );
};

export default FindId;