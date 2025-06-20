import { useEffect, useState } from "react";
import { menuData } from "../Navigation/menu";
import { Link } from "react-router-dom";


function SideMenu(props) {

  const from = props.from;

  const [bigMenu, setBigMenu] = useState({});

  useEffect(() => {
    menuData.forEach((big) => {
      big.sub.forEach((subMenu) => {
        if (subMenu.subLink == from) {
          setBigMenu(big);
        }
      });
    });
  }, [from]);


  return (
    <div className="w-1/7 font-notokr mb-40">

      <h1 className="p-4 my-6 text-primary-500 font-bold text-2xl">{bigMenu.title}</h1>

      <ul className="mb-4">
        {bigMenu.sub?.map((menu, idx)=>(
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
