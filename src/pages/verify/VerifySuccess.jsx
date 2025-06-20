import { useEffect } from "react";
import check from "../../assets/check.png"

function VerifySuccess() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.close(); // 1초 뒤 창 닫기
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div>
      <img src={check} />
      </div>
      <div className="flow-root">
      <h2 className="font-bold text-xl my-4"> 본인 인증 성공 </h2>
      <p className="my-4"> 인증완료되었습니다. 창이 곧 닫힙니다. </p>
      </div>
    </div>
  );
}

export default VerifySuccess;