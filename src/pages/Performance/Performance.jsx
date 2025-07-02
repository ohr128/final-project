import SideMenu from "../../components/SideMenu/SideMenu";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Performance(){

    return(
        <div className="flex font-notokr">
            <SideMenu from="/performance" />
            <div className="w-4/5 px-6 flex justify-center">
                <div className="w-full max-w-xl flex flex-col text-center mt-20">
                <span className="mb-4 text-2xl font-semibold ">사업실적</span>
                <div className="flex gap-4 justify-evenly mt-6 mb-20">
                    <div className="border border-primary-500 p-10">300회</div>
                    <div className="border border-primary-500 p-10">200회</div>
                </div>

                <span className="mb-10 text-2xl font-semibold">녹색제품 판매량</span>
                <div className="flex justify-center mb-30">
                    <div className="border border-primary-500 p-10">300회</div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Performance;