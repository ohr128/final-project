import { useEffect } from "react";

function VerifySuccess() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.close(); // 1초 뒤 창 닫기
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h2>인증 성공</h2>
      <p>창이 곧 닫힙니다...</p>
    </div>
  );
}

export default VerifySuccess;