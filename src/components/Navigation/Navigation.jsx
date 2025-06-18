import logo from "../../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { menuData } from "./menu";

function Navigation() {
  const location = useLocation();

  return (
    <nav className="font-notokr">
      <div className="flex justify-end items-center mt-4">
        <Link to="/">
          <img className="w-40" src={logo} alt="/" />
        </Link>

        <div className="w-full h-12 flex justify-end items-center text-s font-bold gap-6">
          <Link to="/login">로그인</Link>
          <Link to="/signUp">회원가입</Link>
          <Link to="/cart">장바구니</Link>
        </div>
      </div>

      <ul className="flex justify-around font-bold">
        {menuData.map((data, idx) => {
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