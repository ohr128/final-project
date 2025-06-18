import facebook from "../../assets/facebook.png";
import instagram from "../../assets/instagram.png";
import x from "../../assets/x.webp";
import youtube from "../../assets/youtube.png";
import foo from "../../assets/logo-removebg.png";
import { Link } from "react-router-dom";

function Footer(){

    return(

        <footer className="bg-green-50 p-6">

              <div className="pb-6">

                <div>
                  <Link to="/">
                    <img src={foo} className="w-40" />
                  </Link>
                </div>
                <div>
                  
                </div>
                
              </div>


              <div className="flex justify-between">

                <span className="text-gray-400 pl-10 text-sm">COPYRIGHT (c) 2025  NEXT IT TEAM01. ALL RIGHTS RESERVED.</span>

                <div className="flex gap-10 pr-10">
                  <Link to="/"><img className="h-7" src={facebook} alt="" /></Link>
                  <Link to="/"><img className="h-6" src={instagram} alt="" /></Link>
                  <Link to="/"><img className="h-6" src={x} alt="" /></Link>
                  <Link to="/"><img className="h-7" src={youtube} alt="" /></Link>
                </div>

              </div>


        </footer>

    );
}

export default Footer;