import { useState } from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function FindId(){
const [email, setEmail] = useState("");
const [code, setCode] = useState("");

const [password, setPassword] = useState("");
const [passwordConfirm, setPwConfirm] = useState("");
const [pwMessage, setPwMessage] = useState("");
const [pwColor, setPwColor] = useState("black");
const [id,setId] = useState("");
const navigate = useNavigate();

const handleSendCode = async () => {
    try{
        const res = await fetch("http://localhost:8080/mail/sendCode", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email}),
        });

        if(res.ok) {
            alert("인증번호가 이메일로 발송되었습니다.");
        } else {
            alert("이메일 주소를 확인해 주세요");
        }
    }catch (error){ 
        console.log(error);
    }
}

const handleVerifyCode = async () => {
    try {
        await axios.post("http://localhost:8080/mail/verifyCode",{
            email: email,
            code:code,
        },
        {
            headers: {"Content-Type": "application/json"},
        }
    );
    alert("이메일 인증 완료");
    }catch(error) {
        console.log(error);
    }
}

const checkPasswordMatch = async (confirm) => {
    if(password === "" || confirm === "") {
        setPwMessage("");
        setPwColor("black");
        return;
    }
    if(password == confirm && password !== "") {
        setPwMessage("비밀번호가 일치합니다.");
        setPwColor("green");
    } else {
        setPwMessage("비밀번호가 다릅니다.");
        setPwColor("red");
    }
  }

  const handleChangePw = async () => {
    if(!id || !password || !passwordConfirm || !email || !code) {
        alert("모두 입력해주세요");
        return;
    }

    if(password !== passwordConfirm) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }
    try {
        await axios.patch("http://localhost:8080/api/user/changePw", {
            id: id,
            password:password,
        },{
            headers: {"Content-Type": "application/json"}
        });
            alert("비밀번호가 변경되었습니다.");
            navigate("/login");
    }catch(error) {
        console.log(error);
        alert("비밀번호 변경 중 오류가 발생하였습니다.");
    }

  }

    return(

        <div className="container font-notokr">
            
            <div className="mt-30">

                <div className="flex justify-center mb-16">
                    <Link to="/">
                        <img className="w-50" src={logo} alt="" />
                    </Link>
                </div>

                 <div className="flex justify-center items-center flex-col gap-4 " >
                        
                    <input type="text" placeholder="아이디 입력" className="w-90 border rounded border-gray-300 p-2" value={id} onChange={e => setId(e.target.value)}/>
                    <input type="text" placeholder="비밀번호 입력" className="w-90 border rounded border-gray-300 p-2"  value={password} onChange={e => setPassword(e.target.value)} onBlur={() => checkPasswordMatch(passwordConfirm)}/>
                    <input type="password" placeholder="비밀번호 확인" className="w-90 border rounded border-gray-300 p-2" value={passwordConfirm} onChange={(e) => setPwConfirm(e.target.value)} onBlur={() => checkPasswordMatch(passwordConfirm)} />

                    <div className="flex gap-1 ml-10">
                        <input className="border border-gray-300 w-70 h-10 pl-2 rounded" placeholder="이메일 주소를 입력해주세요." type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                        <button className="bg-primary-500 rounded text-white px-4 py-2 cursor-pointer" onClick={handleSendCode}>인증번호 받기</button>
                    </div>

                    <div className="flex gap-1 ml-10">
                        <input className="border border-gray-300 w-70 h-10 pl-2 rounded" placeholder="인증번호" type="text" value={code} onChange={e => setCode(e.target.value)} />
                        <button className="bg-primary-500 rounded text-white px-4 py-2 cursor-pointer" onClick={handleVerifyCode}>인증번호 확인</button>
                    </div>

                    <p style={{color:pwColor}}> {pwMessage} </p>

                    <button className="bg-primary-500 text-white rounded py-2 px-8 cursor-pointer mt-10" onClick={handleChangePw}>변경하기</button>

                 </div>

            </div>

        </div>
    );
};

export default FindId;