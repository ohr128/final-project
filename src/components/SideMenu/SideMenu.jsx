import { useEffect, useState } from "react";
import { menuData } from "../Navigation/menu";
import { Link } from "react-router-dom";
import { getCookieValue } from "../../helpers/cookieHelper";
import { jwtDecode } from "jwt-decode";


function SideMenu(props) {
  const [userRole, setUserRole] = useState(null);
  
  const from = props.from;

  const [bigMenu, setBigMenu] = useState({});

  useEffect(() => {
    console.log(from);
    menuData.forEach((big) => {
      big.sub.forEach((subMenu) => {
        console.log(subMenu.subLink);
        if (subMenu.subLink == from) {
          console.log(big);
          setBigMenu(big);
        }
      });
    });
  }, [from]);

  const jwtToken = getCookieValue('jwt_cookie');
    console.log("userRole", userRole);
  
   useEffect(() => {
    if (jwtToken) {
      try {
          const decoded = jwtDecode(jwtToken);
          const rawRoles = decoded.authorities || "";
          
          // 쉼표로 구분된 문자열을 배열로 변환
          const roleArray = typeof rawRoles === "string" ? rawRoles.split(",") : rawRoles;
  
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


  return (
    <div className="w-1/7 font-notokr mb-40">

      <h1 className="p-4 my-6 text-primary-500 font-bold text-2xl">{bigMenu.title}</h1>

      <ul className="mb-4">
        {bigMenu.sub?.filter((menu) => !(menu.businessHidden && userRole?.includes("ROLE_BUSINESS"))).map((menu, idx)=>(
            <li key={idx}>
                <Link className={`px-5 py-3 block font-semibold border-y border-y-gray-300 text-lg ${ menu.subLink == from ? "bg-primary-500 text-white" : "hover:text-primary-500"}`} 
                    to={menu.subLink}>
                    {menu.subTitle}
                </Link>    
            </li>
        ))}

        </ul>
    </div>
  );
}

export default SideMenu;
