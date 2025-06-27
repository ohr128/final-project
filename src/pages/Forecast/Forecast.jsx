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

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Forecast() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/predict")
      .then((res) => res.json())
      .then((predicted) => {
        const counts = [352, 2749, 7725, 8551, 9278, 11427, 12005, 11955, 7217, 8381];
        const labels = [];

        for (let i = 0; i < counts.length; i++) {
          labels.push((2014 + i).toString());
        }

        Object.keys(predicted).forEach((year) => {
          labels.push(year);
        });

        const values = [...counts, ...Object.values(predicted)];

        setChartData({
          labels,
          datasets: [
            {
              label: "연도별 사용량",
              data: values,
              backgroundColor: "#30A63E",
              borderColor: "#30A63E",
              borderWidth: 1,
            },
          ],
        });
      });
  }, []);

  return (
    <div className="flex font-notokr">
      <SideMenu from="/forecast" />
      <div className="w-4/5 px-6 flex justify-center">
        <div className="w-full max-w-4xl flex flex-col text-center mt-20">
          <span className="mb-4 text-2xl font-semibold">그린리모델링 사용량 예측</span>

          <div className="border border-gray-300 p-8 my-10">
            {chartData ? (
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: true,
                      position: "top",
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
      </div>
    </div>
  );
}

export default Forecast;
