import SideMenu from "../../components/SideMenu/SideMenu";
import consumption from "../../assets/consumption.jpg";
import greenconsumption from "../../assets/green-consumption.jpg";

function GreenConsumption() {
    return(
        <div className="flex font-notokr">
      <SideMenu from="/green-consumption" />
      <div className="w-4/5 px-6 flex justify-center">
        <div className="w-full max-w-2xl flex flex-col text-center mt-20">
          <span className="text-2xl font-bold p-10">
            녹색 소비 소개
          </span>
          <span className="p-5 text-start text-lg w-200">
            녹색 소비는 상품과 서비스를 구매하고 사용, 처분하는 전 과정에서 탄소배출 및 자원사용을 의식적으로 저장하는 소비 형태입니다.
          </span>
          <div className="mt-4 w-200">
            <img className="w-200" src={consumption} />
          </div>

          <span className="p-5 text-start text-lg mt-4 w-200">
            지속가능한 소비로서 최소한의 모든 사람의 기본욕구를 충족시키면서 자연자원의 이용을 최소화하고, 상품의 생산과 소비로 인한 환경피괴도 최소화하면서 미래를 생각하는 소비를 말합니다.
          </span>

        <div className="ml-5 text-start pb-3 border-b border-gray-300 w-200">
        <span className="text-2xl"> 녹색소비를 실천하는 방법 </span>
        </div>
          <div className="mt-4 w-200">
            <img className="w-150" src={greenconsumption} />
          </div>

          <div className="ml-5 text-start pb-3 border-b border-gray-300 w-200 mt-4 mb-4">
          <span className="text-2xl mt-4"> 녹색소비를 위한 구매 지침 </span>
          </div>
          <div className="text-start ml-5 mb-4">
          <p className="mb-1 text-lg"> • 구매 전 꼭 필요한 것인지 생각 </p>
          <p className="mb-1 text-lg"> • 친환경 마크가 있는 녹색제품 구매 </p>
          <p className="mb-1 text-lg"> • 수리나 부품 교환이 쉬운 상품 구입 </p>
          <p className="mb-1 text-lg"> • 자윈과 에너지 소비가 적은 상품 선택 </p>
          <p className="mb-1 text-lg"> • 환경, 사람에게 해가 되지 않는 상품 선택 </p>
          <p className="mb-1 text-lg"> • 재활용이 쉬운 상품 선택 </p>
          <p className="mb-1 text-lg"> • 보충과 재충전이 가능한 제품 선택 </p>
          <p className="mb-1 text-lg"> • 자연 생태계 파괴를 최소화한 제품 선택 </p>
          <p className="mb-1 text-lg"> • 화학 표백제, 방부제 등이 없는 제품 선택 </p>
          <p className="text-lg"> • 소각이나 매립까지 배려한 상품 선택 </p>
          </div>
        </div>
      </div>
    </div>
    )
}
export default GreenConsumption;