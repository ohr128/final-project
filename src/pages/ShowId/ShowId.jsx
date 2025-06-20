import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

function ShowId(){

    return(

        <div className="container font-notokr">
            
            <div className="mt-30">

                <div className="flex justify-center mb-20">
                    <Link to="/">
                        <img className="w-50" src={logo} alt="" />
                    </Link>
                </div>

                 <div className="flex justify-center items-center flex-col gap-10" >
                    
                    <span>아이디 wir***입니다.</span>
                    
                    <div className="flex gap-2">
                        <button className="bg-primary-500 text-white rounded py-2 px-8 cursor-pointer mt-10">로그인하기</button>                
                        <Link to="/findPw">
                            <button className="bg-primary-500 text-white rounded py-2 px-8 cursor-pointer mt-10">비밀번호 찾기</button>                
                        </Link>
                    </div>
                    


                 </div>



            </div>


        </div>
    );
};

export default ShowId;