import { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

const API_PYTHON = import.meta.env.VITE_API_PYTHON;

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Forecast() {
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch(`${API_PYTHON}/predict`)
      .then((res) => res.json())
      .then((predicted) => {
        const counts = [
          352, 2749, 7725, 8551, 9278, 11427, 12005, 11955, 7217, 8381,
        ];
        const futureValues = Object.values(predicted);
        const allValues = [...counts, ...futureValues];

        const labels = Array.from({ length: allValues.length }, (_, i) =>
          (2014 + i).toString()
        );

        const backgroundColors = [
          ...Array(counts.length).fill("#30A63E"), 
          ...Array(futureValues.length).fill("#FFA500"), 
        ];

        setChartData({
          labels,
          datasets: [
            {
              label: "연도별 사용량",
              data: allValues,
              backgroundColor: backgroundColors,
              borderColor: backgroundColors,
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((err) => {
        console.error("예측 데이터 불러오기 실패:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="flex font-notokr">
      <SideMenu from="/forecast" />
      <div className="w-4/5 px-6 flex justify-center">
        <div className="w-full max-w-4xl flex flex-col text-center mt-20">
          <span className="mb-4 text-2xl font-semibold">
            그린리모델링 사용량 예측
          </span>
          <div className="flex justify-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#30A63E] rounded-sm"></div>
              <span>기존 사용량</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#FFA500] rounded-sm"></div>
              <span>예측 사용량</span>
            </div>
          </div>
          <div className="border border-gray-300 p-8 my-10">
            {chartData ? (
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          return `사용량: ${context.raw.toLocaleString()}`;
                        },
                      },
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            ) : (
              <p>데이터 불러오는 중...</p>
            )}
          </div>
        </div>
        {isLoading && (
          <div className="absolute top-90 left-20 size-full bg-[#ffffff88] flex justify-center pt-70">
            <div className="size-40 border-6 border-primary-500 border-t-gray-200 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Forecast;
