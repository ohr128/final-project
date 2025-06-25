import SideMenu from "../../components/SideMenu/SideMenu";

function Forecast(){

    return(

        <div className="flex font-notokr">

            <SideMenu from="/forecast" />

            <div className="w-4/5 px-6 flex justify-center">

                <div className="w-full max-w-4xl flex flex-col text-center mt-20">

                <span className="mb-4 text-2xl font-semibold ">그린리모델링 사용량 예측</span>

                <div className="border border-gray-300 p-50 my-10">

                </div>

                </div>
            
            
            </div>


        </div>

    )
    
}

export default Forecast;