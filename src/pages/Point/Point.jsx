import SideMenu from "../../components/SideMenu/SideMenu";
import point from "../../assets/point.jpg";

function Point(){

    return(

        <div className="flex font-notokr">

            <SideMenu from="/point" />

            <div className="w-4/5 px-6">

                 <div className="my-8 flex flex-col justify-center">

                    <div className="flex justify-center">
                        <div className="border border-primary-500 mt-20 flex justify-center">
                            <span className="p-4 text-2xl font-bold">아이디님의 현재 마일리지는 20,000P 입니다.</span>
                        </div>
                        
                    </div>

                    <img className="p-20" src={point} alt="" />

                    <span className="p-10 text-2xl font-bold text-center">당신의 노력으로 새싹을 피웠습니다.</span>


                </div>
            
            
            
            </div>


        </div>
    )
}

export default Point;