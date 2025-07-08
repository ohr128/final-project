import { useEffect, useState } from "react";
import { menuArray, menuData } from "../Navigation/menu";
import { Link } from "react-router-dom";
import { getCookieValue } from "../../helpers/cookieHelper";
import { jwtDecode } from "jwt-decode";

function SideMenu(props) {
  const [userRole, setUserRole] = useState(null);

  const from = props.from;

  const [bigMenu, setBigMenu] = useState({});
  const jwtToken = getCookieValue("jwt_cookie");
  console.log("userRole", userRole);

  const stored = localStorage.getItem("token");
  const parsed = stored ? JSON.parse(stored) : {};
  const uId = parsed?.id;

  useEffect(() => {
    if (jwtToken) {
      try {
        const decoded = jwtDecode(jwtToken);
        const rawRoles = decoded.authorities || "";

        // 쉼표로 구분된 문자열을 배열로 변환
        const roleArray =
          typeof rawRoles === "string" ? rawRoles.split(",") : rawRoles;

        // 예: ["ROLE_ADMIN", "ROLE_USER"]
        if (Array.isArray(roleArray) && roleArray.length > 0) {
          setUserRole(roleArray);
        } else {
          setUserRole([]);
        }
      } catch (error) {
        console.error("JWT decode error:", error);
        setUserRole([]);
      }
    } else {
      setUserRole([]);
    }
  }, []);

  useEffect(() => {
    console.log(from);

    if (userRole?.includes("ROLE_BUSINESS")) {
      menuArray.forEach((big) => {
        big.sub.forEach((subMenu) => {
          console.log(subMenu.subLink);
          if (subMenu.subLink === from) {
            console.log(big);
            setBigMenu(big);
          }
        });
      });
    } else {
      menuData.forEach((big) => {
        big.sub.forEach((subMenu) => {
          console.log(subMenu.subLink);
          if (subMenu.subLink === from) {
            console.log(big);
            setBigMenu(big);
          }
        });
      });
    }
  }, [from, userRole]);

  return (
    <div className="w-1/7 font-notokr mb-40">
      <h1 className="p-4 my-6 text-primary-500 font-bold text-2xl">
        {bigMenu.title}
      </h1>

      <ul className="mb-4">
        <ul className="mb-4">
  {bigMenu.sub
    ?.filter((menu) => {
      // ROLE_BUSINESS인 경우 businessHidden 메뉴 숨김
      if (menu.businessHidden && userRole?.includes("ROLE_BUSINESS")) return false;
      // 아이디가 이메일 형식(@ 포함)인 경우 hideWhenEmailId 메뉴 숨김
      if (menu.hideWhenEmailId && uId?.includes("@")) return false;
      return true;
    })
    .map((menu, idx) => (
      <li key={idx}>
        <Link
          className={`w-60 px-5 py-3 block font-semibold border-y border-y-gray-300 text-lg ${
            menu.subLink == from
              ? "bg-primary-500 text-white"
              : "hover:text-primary-500"
          }`}
          to={menu.subLink}
        >
          {menu.subTitle}
        </Link>
      </li>
    ))}
</ul>
      </ul>
    </div>
  );
}

export default SideMenu;
