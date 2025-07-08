import SideMenu from "../../components/SideMenu/SideMenu";
import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "react-toastify/dist/ReactToastify.css";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

ChartJS.register(ArcElement, Tooltip, Legend);

// const createCenterTextPlugin = (text) => ({
//   id: "centerTextPlugin",
//   afterDraw(chart) {
//     const { width, height, ctx } = chart;
//     ctx.save();
//     ctx.font = "bold 24px sans-serif";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     ctx.fillStyle = "#000";
//     ctx.fillText(text, width / 2, height / 2);
//     ctx.restore();
//   },
// });

function Performance() {
  const [greenOrderCount, setGreenOrderCount] = useState(0);
  const [remodelingCount, setRemodelingCount] = useState(0);
  const [greenOrderInUpCount, setGreenOrderInUpCount] = useState(0);

  useEffect(() => {

    const rawToken = localStorage.getItem("token");
    const parsed = rawToken ? JSON.parse(rawToken) : null;
    const token = parsed?.token;

    Promise.all([
      fetch(`${API_BASE_URL}/order/countOrder`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json()),
      fetch(`${API_BASE_URL}/order/countRemodeling`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json()),
      fetch(`${API_BASE_URL}/order/countOrderInUp`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json()),
    ])
      .then(([greenCount, remodelingCount, greenOrderInUpCount]) => {
        setGreenOrderCount(greenCount);
        setRemodelingCount(remodelingCount);
        setGreenOrderInUpCount(greenOrderInUpCount);
      })
      .catch((err) => {
        console.error("데이터 불러오기 실패:", err);
      })
      .finally(() => {
      });
  }, []);

  return (
    <div className="flex font-notokr">
      <SideMenu from="/performance" />
      <div className="w-4/5 px-6 flex justify-center">
        <div className="w-full max-w-xl flex flex-col text-center mt-20">
          <span className="mb-4 text-2xl font-semibold ml-10">사업실적
            <span className="mb-4 text-2xl font-semibold ml-40">리모델링 신청 횟수</span>
          </span>
          <div className="flex gap-4 justify-evenly mt-6 mb-20">
            <div className="bg-primary-500 w-50 rounded-full h-50 text-center pt-20 text-2xl text-white"> 주문수 {greenOrderCount} 건</div>
            <div className="bg-primary-500 w-50 rounded-full h-50 text-center pt-20 text-2xl text-white"> 신청수 {remodelingCount} 건</div>
            {/* {isLoading ? (
              <div>로딩 중...</div>
            ) : (
              <>
                <div className="w-64 h-64 relative">
                  <Pie
                    data={{
                      labels: ["녹색 제품"],
                      datasets: [
                        {
                          data: [greenOrderCount],
                          backgroundColor: ["#30A63E"],
                          borderColor: ["#30A63E"],
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                    }}
                    plugins={[createCenterTextPlugin(`주문수 ${greenOrderCount}건`)]}
                  />
                </div>

                <div className="w-64 h-64 relative">
                  <Pie
                    data={{
                      labels: ["리모델링"],
                      datasets: [
                        {
                          data: [remodelingCount],
                          backgroundColor: ["#30A63E"],
                          borderColor: ["#30A63E"],
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                    }}
                    plugins={[createCenterTextPlugin(`리모델링 ${remodelingCount}건`)]}
                  />
                </div>
              </>
            )} */}
          </div>

          <span className="mb-10 text-2xl font-semibold">녹색제품 판매량</span>
          <div className="justify-center mb-10">
            <Pie
              data={{
                labels: ["상반기 매출", "하반기 매출"],
                datasets: [
                  {
                    data: [
                      greenOrderInUpCount,
                      greenOrderCount - greenOrderInUpCount,
                    ],
                    backgroundColor: ["#30A63E", "#36A2EB"],
                    borderColor: ["#30A63E", "#36A2EB"],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                    position: "top",
                  },
                },
              }}
            />
            <div className="mt-4">상반기 매출 : {greenOrderInUpCount}건</div>
            <div className="mt-4">
              하반기 매출 : {greenOrderCount - greenOrderInUpCount}건
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Performance;
