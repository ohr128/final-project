import SideMenu from "../../components/SideMenu/SideMenu";
import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Performance() {
  const [greenOrderCount, setGreenOrderCount] = useState(0);
  const [remodelingCount, setRemodelingCount] = useState(0);
  const [greenOrderInUpCount, setGreenOrderInUpCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const rawToken = localStorage.getItem("token");
    const parsed = rawToken ? JSON.parse(rawToken) : null;
    const token = parsed?.token;

    if (!token) {
      alert("로그인이 필요합니다.");
      setIsLoading(false);
      return;
    }

    Promise.all([
      fetch("http://localhost:8080/order/countOrder", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json()),
      fetch("http://localhost:8080/order/countRemodeling", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json()),
      fetch("http://localhost:8080/order/countOrderInUp", {
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
        setIsLoading(false);
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
            {isLoading ? (
              <div>로딩 중...</div>
            ) : (
              <>
                <div className="w-64 h-64">
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
                          display: true,
                          position: "top",
                        },
                      },
                    }}
                  />
                  <div className="mt-2">
                    녹색 제품 주문 수: {greenOrderCount}건
                  </div>
                </div>

                <div className="w-64 h-64">
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
                          display: true,
                          position: "top",
                        },
                      },
                    }}
                  />
                  <div className="mt-2">리모델링 건수: {remodelingCount}건</div>
                </div>
              </>
            )}
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
