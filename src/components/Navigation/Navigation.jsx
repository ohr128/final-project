import logo from "../../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { menuData } from "./menu";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getCookieValue } from "../../helpers/cookieHelper";




// function getJwtPayload(cookieName) {
//   const token = getCookieValue(cookieName);
//   try {
//     const payloadBase64 = token.split('.')[1];
//     const decodedPayload = JSON.parse(atob(payloadBase64));
//     return decodedPayload;
//   } catch (e) {
//     console.error('Invalid JWT token:', e);
//     return null;
//   }
// }


function Navigation() {
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const jwtToken = getCookieValue('jwt_cookie');
  const isLoggedIn = !!jwtToken;
  console.log("userRole", userRole);

 useEffect(() => {
  if (jwtToken) {
    try {
        const decoded = jwtDecode(jwtToken);
        const rawRoles = decoded.role || decoded.authorities || "";
        
        // 쉼표로 구분된 문자열을 배열로 변환
        const roleArray = typeof rawRoles === "string" ? rawRoles.split(",") : rawRoles;

        // 예: ["ROLE_ADMIN", "ROLE_USER"]
        if (Array.isArray(roleArray) && roleArray.length > 0) {
          setUserRole(roleArray);
          sessionStorage.setItem("role", JSON.stringify(roleArray));  // 디버깅용으로도 좋음
          console.log("userRole if", userRole);
        } else {
          setUserRole([]);
          sessionStorage.removeItem("role");
          console.log("userRole else", userRole);
        }

    } catch (error) {
      console.error("JWT decode error:", error);
      setUserRole([]);
      sessionStorage.removeItem("role");
    }
  } else {
    setUserRole([]);
    sessionStorage.removeItem("role");
  }
}, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="font-notokr relative z-10">
      <div className="flex justify-end items-center mt-4">
        <Link to="/">
          <img className="w-40" src={logo} alt="/" />
        </Link>

        <div className="w-full h-12 flex justify-end items-center text-s font-bold gap-6">
          {isLoggedIn ? (
            <>
              <button onClick={handleLogout}>로그아웃</button>
              <Link to="/cart">장바구니</Link>
            </>
          ) : (
            <>
              <Link to="/login">로그인</Link>
              <Link to="/signUp">회원가입</Link>
              <Link to="/cart">장바구니</Link>
            </>
          )}
        </div>
      </div>

      <ul className="flex justify-around font-bold">
        {menuData.map((data, idx) => {
          if(data.adminOnly && !userRole?.includes("ROLE_ADMIN")) return null;
          const isMainLinkActive = location.pathname === data.link;
          const isSubLinkActive = data.sub?.some(
            (menu) => location.pathname === menu.subLink
          );
          const isActive = isMainLinkActive || isSubLinkActive;

          return (
            <li key={idx} className="relative h-full flex items-center group">
              <Link
                className={`py-4 px-6 font-bold text-xl hover:text-primary-500 ${
                  isActive ? "text-primary-500" : ""
                }`}
                to={data.link}
              >
                {data.title}
              </Link>

              {data.sub && (
                <ul className="absolute bg-white hidden group-hover:block top-full left-1/2 -translate-x-1/2 shadow w-auto min-w-[160px] rounded">
                  {data.sub.map((menu, idx) => (
                    <li key={idx}>
                      <Link
                        to={menu.subLink}
                        className="p-3 block hover:bg-primary-500 hover:text-white whitespace-nowrap"
                        title={menu.subTitle}
                      >
                        {menu.subTitle}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navigation;
