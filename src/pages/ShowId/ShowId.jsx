import logo from "../../assets/logo.png";
import { Link, useLocation } from "react-router-dom";

function ShowId() {
  const location = useLocation();
  const userId = location.state?.userId;

  return (
    <div className="container font-notokr">
      <div className="mt-30">
        <div className="flex justify-center mb-20">
          <Link to="/">
            <img className="w-50" src={logo} alt="홈으로" />
          </Link>
        </div>

        <div className="flex justify-center items-center flex-col gap-10">
          {userId ? (
            <span>
              회원님의 아이디는 <strong>{userId}</strong> 입니다.
            </span>
          ) : (
            <span>아이디를 찾을 수 없습니다. 인증을 다시 시도해 주세요.</span>
          )}

          <div className="flex gap-2">
            <Link to="/login">
              <button className="bg-primary-500 text-white rounded py-2 px-8 cursor-pointer mt-10">
                로그인하기
              </button>
            </Link>
            <Link to="/findPw">
              <button className="bg-primary-500 text-white rounded py-2 px-8 cursor-pointer mt-10">
                비밀번호 찾기
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowId;
