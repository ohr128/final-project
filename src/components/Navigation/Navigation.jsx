import logo from "../../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { menuData } from "./menu";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function Navigation() {
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const rawToken = sessionStorage.getItem("token");
  const isLoggedIn = rawToken && JSON.parse(rawToken)?.token;
  console.log("userRole", userRole);

  useEffect(() => {
    if (rawToken) {
      try {
        const parsed = JSON.parse(rawToken);
        const accessToken = parsed?.token;
        if (accessToken) {
          const decoded = jwtDecode(accessToken);
          const role = decoded.role || decoded.authorities || null;
          if (role) {
            setUserRole(Array.isArray(role) ? role[0] : role);
            sessionStorage.setItem("role", Array.isArray(role) ? role[0] : role);
          } else {
            setUserRole(null);
            sessionStorage.removeItem("role");
          }
        }
      } catch (error) {
        console.error("JWT decode error:", error);
        setUserRole(null);
        sessionStorage.removeItem("role");
      }
    } else {
      setUserRole(null);
      sessionStorage.removeItem("role");
    }
  }, [rawToken]);

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
          if(data.adminOnly && userRole?.includes("Admin")) return null;
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
