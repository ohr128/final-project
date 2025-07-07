import SideMenu from "../../components/SideMenu/SideMenu";
import remodeling from "../../assets/remodeling.jpg";
import chart from "../../assets/green_rm_gp1.png";
import policy from "../../assets/m_policy.png";

function IntroductionRemodeling() {
  return (
    <div className="flex font-notokr">
      <SideMenu from="/introduction-remodeling" />
      <div className="w-4/5 px-6 flex justify-center">
        <div className="w-full max-w-2xl flex flex-col text-center mt-20">
          <span className="text-2xl font-bold p-10">
            그린리모델링 소개
          </span>
          <span className="p-5 text-start text-lg w-250">
            그린리모델링이란 에너지 절감, 에너지 성능향상이 필요한 노후화된 건축물을 개선하여 에너지 효율을 높이고 쾌적한 주거공간을<br /> 제공하기 위한 리모델링 입니다.
          </span>
          <div className="mt-4 w-200">
            <img src={chart} />
          </div>

          <span className="p-5 text-start text-lg mt-4 w-250">
            노후된 기존 건축의 단열, 설비 등의 성능을 개선하여 에너지 효율을 향상시킴으로 써 냉난방 비용 절감과 함께 온실가스 배출을 줄이면서 쾌적하고 건강한 주거환경을 조성하는 리모델링입니다.
          </span>

          <div className="mt-4 w-200">
            <img src={remodeling} />
          </div>

          <span className="text-start text-lg font-bold mt-4"> 주요정책 </span>
          <div className="mt-4 mb-10 w-200">
            <img className="" src={policy} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default IntroductionRemodeling;
