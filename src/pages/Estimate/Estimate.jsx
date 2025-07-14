import { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Estimate() {
  const stored = localStorage.getItem("token");
  const parsed = stored ? JSON.parse(stored) : {};
  const uId = parsed?.id;
  const token = parsed?.token;

  const [remodelingList, setRemodelingList] = useState();
  // console.log("uId:", uId);
  // console.log("token:", token);
  console.log(remodelingList);

  useEffect(() => {
    fetch(`${API_BASE_URL}/findUid?uId=` + uId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRemodelingList(data);
        console.log(remodelingList);
      });
  }, []);

  const handleDownloadPdf = () => {
    const element = document.getElementById("pdfContent");
    if(!element) return;
    html2canvas(element).then((canvas) => {
      const img = canvas.toDataURL("img/png");

      const pdf = new jsPDF("p", "mm", "a4");
      let imageWidth = 190;

      let canvasWidth = canvas.width;
      let canvasHeight = canvas.height;

      let imageHeight = (canvasHeight * imageWidth) / canvasWidth;
      let x = 10;
      let y = 10;

      pdf.addImage(img, "PNG", x, y, imageWidth, imageHeight);
      pdf.save("견적서.pdf");
    });
  };

  return (
    <div className="flex font-notokr">
      <SideMenu from="/remodeling-request" />

      <div className="w-4/5  flex justify-center">
        <div className="w-full max-w-3xl flex flex-col mt-20">
          <h1 className="p-10 text-2xl font-bold text-center">
            그린리모델링 견적서
          </h1>
          <div className="flex justify-end m-4">
                <button className="border-2 rounded flex justify-center items-center gap-2 p-1 cursor-pointer" onClick={handleDownloadPdf} style={{color: "#30a63e"}}>
                  <span className="font-bold" style={{color: "#30a63e"}}>
                    PDF 다운로드
                  </span>
                </button>
              </div>
          {remodelingList ? (
            <div id="pdfContent">
              <div className="flex flex-col gap-6 p-6" style={{borderWidth: "1px solid #d1d5dc"}}>
                <span>{`견적대상: ${remodelingList.address} ${remodelingList.dong}동 ${remodelingList.ho}호`}</span>
                <span>{`공사규모: ${remodelingList.roomSize}평(${Math.ceil(
                  remodelingList.roomSize * 3.3508
                )}m²)  방 ${remodelingList.room}, 욕실 ${
                  remodelingList.bathroom
                }`}</span>
                <span className="font-bold">{`견적합계: ${remodelingList.totalsum.toLocaleString()}원`}</span>
              </div>

              <div className="flex justify-center mt-10 mb-30">
                <table className="border-collapse block">
                  <thead>
                    <tr>
                      <td className="py-2 px-10 text-center font-bold" style={{border:"1px solid #e5e7eb", backgroundColor:"#dcfce7", verticalAlign: 'middle'}}>
                        공사명
                      </td>
                      <td className="py-2 px-10 bg-green-100 text-center font-bold" style={{border:"1px solid #e5e7eb", backgroundColor:"#dcfce7", verticalAlign: 'middle'}}>
                        금액
                      </td>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td className="py-2 px-10" style={{border:"1px solid #e5e7eb", verticalAlign: 'middle'}}>
                        창호공사
                      </td>
                      <td className="py-2 px-10" style={{border:"1px solid #e5e7eb", verticalAlign: 'middle'}}>
                        {remodelingList.windows.toLocaleString()} 원
                      </td>
                    </tr>

                    <tr>
                      <td className="py-2 px-10" style={{border:"1px solid #e5e7eb", verticalAlign: 'middle'}}>
                        조명공사
                      </td>
                      <td className="py-2 px-10" style={{border:"1px solid #e5e7eb", verticalAlign: 'middle'}}>
                        {remodelingList.light.toLocaleString()} 원
                      </td>
                    </tr>

                    <tr>
                      <td className="py-2 px-10" style={{border:"1px solid #e5e7eb", verticalAlign: 'middle'}}>
                        바닥공사
                      </td>
                      <td className="py-2 px-10" style={{border:"1px solid #e5e7eb", verticalAlign: 'middle'}}>
                        {remodelingList.break.toLocaleString()} 원
                      </td>
                    </tr>

                    <tr>
                      <td className="py-2 px-10" style={{border:"1px solid #e5e7eb", verticalAlign: 'middle'}}>
                        철거공사
                      </td>
                      <td className="py-2 px-10" style={{border:"1px solid #e5e7eb", verticalAlign: 'middle'}}>
                        {remodelingList.break.toLocaleString()} 원
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Estimate;
