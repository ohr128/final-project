import axios from "axios";
import SideMenu from "../../components/SideMenu/SideMenu";
import { useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const parseAddress = (fullAddress) => {
  const parts = fullAddress.split(" ");
  const bunjiRaw = parts[3] || "";
  const [bunRaw, jiRaw] = bunjiRaw.split("-");

  return {
    city: parts[0] || "",
    sigungu: parts[1] || "",
    dong: parts[2] || "",
    bun: bunRaw.padStart(4, "0"), // "1093" → "1093", "3" → "0003"
    ji: jiRaw ? jiRaw.padStart(4, "0") : "", // 없으면 빈 문자열
  };
};

function RemodelingRequest() {
  const [address, setAddress] = useState("");
  const [postAddress, setPostAddress] = useState("");
  const [dong, setDong] = useState("");
  const [ho, setHo] = useState("");
  const [pyeong, setPyeong] = useState("");

  // 법정동코드, 시군구코드 상태 추가
  const [sigunguCd, setSigunguCd] = useState("");
  const [bjdongCd, setBjdongCd] = useState("");

  const [roomCount, setRoomCount] = useState("");
  const [bathroomCount, setBathRoomCount] = useState("");
  console.log("욕실 개수",bathroomCount);
  console.log("방 개수",roomCount);
  
  const stored = localStorage.getItem("token");
    const parsed = stored ? JSON.parse(stored) : {};
    const userId = parsed?.id;

    console.log("uId:",userId);
    console.log("roomSize:",pyeong);
    console.log("room:",roomCount);
    console.log("bathroom:",bathroomCount);
    console.log("address:",address);
    console.log("dong:",dong);
    console.log("ho:",ho);

  const restApiKey = "0878dcb1d5ef6e93982565134d506845"; // 여기에 카카오 REST API 키 입력

  const handleClick = () => {
    new window.daum.Postcode({
      oncomplete: (data) => {
        const fullAddress = data.jibunAddress;
        const zoneCode = data.zonecode;

        setPostAddress(zoneCode);
        setAddress(fullAddress);

        // 주소가 선택되면 카카오 API로 코드 조회
        searchAddressByKakao(fullAddress);
      },
    }).open();
  };

  // 카카오 로컬 API로 주소검색 -> 코드 조회 함수
  const searchAddressByKakao = async (query) => {
    try {
      const response = await fetch(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
          query
        )}`,
        {
          headers: { Authorization: `KakaoAK ${restApiKey}` },
        }
      );
      const data = await response.json();

      if (data.documents.length === 0) {
        alert("검색 결과가 없습니다.");
        return;
      }
      const result = data.documents[0];
      const bCode = result.address.b_code;
      const sigungu = bCode.slice(0, 5);
      const bj = bCode.slice(5);
      setSigunguCd(sigungu);
      setBjdongCd(bj);
      console.log("result.address", result.address);
      console.log("bCode", bCode);
      // 법정동 코드, 시군구 코드 상태 업데이트
      // 필요하면 다른 정보도 상태로 저장 가능
      console.log("시군구 코드:", sigungu);
      console.log("법정동 코드:", bj);

      console.log(
        "result.address.region_2depth_code",
        result.address.region_2depth_code
      );
      console.log(
        "result.address.region_3depth_code",
        result.address.region_3depth_code
      );
    } catch (error) {
      console.error("주소 검색 실패:", error);
      alert("주소 검색에 실패했습니다.");
    }
  };

  const handlesquare = async () => {
    if (!address) {
      alert("주소를 먼저 입력하세요");
      return;
    }
    const parsed = parseAddress(address);

    console.log("파싱된 주소:", parsed);
    console.log("시군구 코드:", sigunguCd);
    console.log("법정동 코드:", bjdongCd);

    // 여기서 시군구코드 sigunguCd, 법정동코드 bjdongCd를
    // API 호출 등 원하는 작업에 활용하면 됩니다.
    const serviceKey =
      "t1q4uVl99uUv%2FIc7a3gDPKQo7l96iCv8seIC%2FwiO%2F6JqJtPvp8gJKNouyrMkqYPGoVxZGjsBOU5LP78ZLe9rAQ%3D%3D";
    const url =
      `https://apis.data.go.kr/1613000/BldRgstHubService/getBrExposPubuseAreaInfo` +
      `?serviceKey=${serviceKey}` +
      `&sigunguCd=${sigunguCd}` +
      `&bjdongCd=${bjdongCd}` +
      `&_type=json`;
    console.log(url);
    try {

      const res = await fetch(url);
      const json = await res.json();
      console.log(json);

      if (json.response.header.resultCode === "00") {
        const item = json.response.body.items.item[0];
        if (!item) {
          alert("조회 결과가 없습니다.");
          return;
        }

        // 전용면적(㎡)
        const privuseArea = item.area || 0;
        const pyeong = Math.ceil(privuseArea / 3.3058);
        console.log(pyeong);
        setPyeong(pyeong);
        alert(`전용면적: ${privuseArea}㎡\n평수: ${pyeong}평`);
        return item;
      } else {
        alert(`API 오류: ${json.response.header.resultMsg}`);
      }
    } catch (error) {
      console.error("API 호출 실패:", error);
      alert("평수 조회 중 오류가 발생했습니다.");
    }
  };

  const handleGeneration = async () => {
    await axios.post(`${API_BASE_URL}/api/save-remodeling`, {
        uId: userId,
        roomSize: pyeong,
        room:roomCount,
        bathroom: bathroomCount,
        address: address,
        dong:dong,
        ho: ho,
    })
  }
  console.log("보내는 데이터:",
    {
      uId: userId,
      roomSize: pyeong,
      room:roomCount,
      bathroom: bathroomCount,
      address: address,
      dong:dong,
      ho: ho
    }
  )

  return (
    <div className="flex font-notokr">
      <SideMenu from="/remodeling-request" />
      <div className="w-4/5  flex justify-center">
        <div className="w-full max-w-3xl flex flex-col mt-20">
          <h1 className="p-10 text-2xl font-bold text-center">
            그린리모델링 신청
          </h1>
          <div className="p-6 space-y-4 w-full max-w-xl mx-auto">
            <span className="block text-lg font-semibold">지번주소</span>
            <div className="flex-1 space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={postAddress}
                  onChange={e => setPostAddress(e.target.value)}
                  placeholder="우편번호"
                  className="flex-1 border border-gray-300 rounded p-2"
                />
                <button
                  className="border border-primary-500 rounded text-primary-500 px-4 py-2 cursor-pointer"
                  onClick={handleClick}
                >
                  우편번호찾기
                </button>
              </div>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="지번주소"
                className="w-full rounded border border-gray-300 p-2"
              />
            </div>

            <div className="flex items-center gap-4 mt-16">
              <span className="block text-lg font-semibold">상세주소</span>
              <span className="text-gray-500 text-xs">
                ※ 단독주택일 경우, 선택사항
              </span>
            </div>
            <div className="flex gap-3 items-center">
              <input
                type="text"
                className="w-16 h-10 border border-gray-300 rounded p-2 text-center placeholder:text-sm"
                placeholder="선택"
                value={dong}
                onChange={(e) => setDong(e.target.value)}
              />
              <span>동</span>
              <input
                type="text"
                className="w-16 h-10 border border-gray-300 rounded p-2 text-center placeholder:text-sm"
                placeholder="필수"
                value={ho}
                onChange={(e) => setHo(e.target.value)}
              />
              <span>호</span>
            </div>
            <div className="flex gap-20">
              <div>
                <span className="block text-lg font-semibold mt-16 mb-2">
                  평수찾기
                </span>
                <div className="flex-1 space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex w-24 border border-gray-300 rounded p-2 text-center"
                      value={pyeong}
                      onChange={e => setPyeong(e.target.value)}
                    />
                    <button
                      className="border border-primary-500 rounded text-primary-500 px-4 py-2 cursor-pointer"
                      onClick={handlesquare}
                    >
                      평수찾기
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <span className="block text-lg font-semibold mt-16 mb-2">
                  방 개수
                </span>
                <select
                  className="border border-gray-300 p-1 rounded m-1"
                  value={roomCount}
                  onChange={e => setRoomCount(e.target.value)}
                >
                  <option value="">선택</option>
                  <option value="1">1개</option>
                  <option value="2">2개</option>
                  <option value="3">3개</option>
                  <option value="4">4개</option>
                </select>
              </div>
              <div>
                <span className="block text-lg font-semibold mt-16 mb-2">
                  욕실 개수
                </span>
                <select
                  className="border border-gray-300 p-1 rounded m-1"
                  value={bathroomCount}
                  onChange={e => setBathRoomCount(e.target.value)}
                >
                  <option value="">선택</option>
                  <option value="1">1개</option>
                  <option value="2">2개</option>
                  <option value="3">3개</option>
                  <option value="4">4개</option>
                </select>
              </div>
            </div>
            <div className="flex justify-center my-20">
              <button className="w-1/4 bg-primary-500 text-white rounded px-4 py-2 cursor-pointer my-10" onClick={handleGeneration}>
                견적서 생성
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RemodelingRequest;
