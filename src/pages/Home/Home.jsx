/* global kakao */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Home() {
  const [products, setProducts] = useState([]);
  const [energy, setEnergy] = useState([]);
  const [map, setMap] = useState(null);
  const [clusterer, setClusterer] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [infoWindows, setInfoWindws] = useState([]);
  const [activeButton, setActiveButton] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/green-object-list`)
      .then((res) => res.json())
      .then((data) => setProducts(data));

    fetch(`${API_BASE_URL}/api/FirstEnergy`)
      .then((res) => res.json())
      .then((data) => setEnergy(data));


    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLat = position.coords.latitude;
        const currentLon = position.coords.longitude;

        setLat(currentLat);
        setLon(currentLon);

        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new kakao.maps.LatLng(currentLat, currentLon),
          level: 3,
        };

        const createdMap = new kakao.maps.Map(mapContainer, mapOption);
        setMap(createdMap);

        const zoomControl = new kakao.maps.ZoomControl();
        createdMap.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        const typeControl = new kakao.maps.MapTypeControl();
        createdMap.addControl(typeControl, kakao.maps.ControlPosition.TOPRIGHT);

        const createdClusterer = new kakao.maps.MarkerClusterer({
          map: createdMap,
          averageCenter: true,
          minLevel: 6,
        });

        setClusterer(createdClusterer);
      },
      (error) => {
        const defaultLat = 36.351;
        const defaultLon = 127.385;

        setLat(defaultLat);
        setLon(defaultLon);

        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new kakao.maps.LatLng(defaultLat, defaultLon),
          level: 3,
        };

        const createdMap = new kakao.maps.Map(mapContainer, mapOption);
        setMap(createdMap);

        const zoomControl = new kakao.maps.ZoomControl();
        createdMap.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        const typeControl = new kakao.maps.MapTypeControl();
        createdMap.addControl(typeControl, kakao.maps.ControlPosition.TOPRIGHT);

        const createdClusterer = new kakao.maps.MarkerClusterer({
          map: createdMap,
          averageCenter: true,
          minLevel: 6,
        });

        console.log(error);
        setClusterer(createdClusterer);
      }
    );
  }, []);

  const handleSearch = (keyword) => {
    if (!map || !lat || !lon || !window.kakao?.maps?.services) return;

    setActiveButton(keyword);

    const ps = new kakao.maps.services.Places();
    const options = {
      location: new kakao.maps.LatLng(lat, lon),
      radius: 3000,
    };

    ps.keywordSearch(
      keyword,
      (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds();
          const markers = [];

          infoWindows.forEach((infowin) => infowin.close());
          setInfoWindws([]);

          for (let place of data) {
            const position = new kakao.maps.LatLng(place.y, place.x);

            const marker = new kakao.maps.Marker({
              map,
              position,
              title: place.place_name,
            });

            const infowindow = new kakao.maps.InfoWindow({
              content: `
                <div style="display: flex; justify-content: center; align-items: center;
                  text-align: center; font-family: 'Arial', 'Malgun Gothic', sans-serif;
                  font-size: 14px; font-weight: bold; width: 200px; height: 40px;
                  padding: 5px; overflow: hidden; white-space: nowrap;">
                  <a href="${place.place_url}" target="_blank"
                    style="color: black; text-decoration: none; width: 100%; height: 100%;
                    display: flex; justify-content: center; align-items: center;">
                    ${place.place_name}
                  </a>
                </div>
              `,
            });

            setInfoWindws((prev) => [...prev, infowindow]);

            let isInfoWindowOpen = false;

            kakao.maps.event.addListener(marker, "click", () => {
              if (isInfoWindowOpen) {
                infowindow.close();
                isInfoWindowOpen = false;
              } else {
                infowindow.open(map, marker);
                isInfoWindowOpen = true;
              }
            });

            markers.push(marker);
            bounds.extend(position);
          }

          clusterer.addMarkers(markers);
          map.setBounds(bounds);
        }
      },
      options
    );
  };

  const renderProductCard = (item, idx) => (
    <div
      key={idx}
      onClick={() => nav("/green-detail?productId=" + item.productId)}
      className="aspect-9/12 group cursor-pointer overflow-hidden transform scale-86"
    >
      {/* 카드 상단 */}
      <div className="h-[75%] overflow-hidden rounded-lg">
        <img
          src={
            item.image
              ? `${API_BASE_URL}/${encodeURIComponent(item.image)}`
              : `${API_BASE_URL}/no_image.jpg`
          }
          alt="product"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* 카드 하단 */}
      <div className="h-[25%] py-4 flex flex-col gap-1 justify-evenly text-sm">
        <span className="font-medium">
          {item.name.length > 18 ? item.name.slice(0, 18) + "..." : item.name}
        </span>
        <span className="font-semibold text-base">
          ₩ {item.prices.toLocaleString()}
        </span>
        <p className="text-sm">
          포인트{" "}
          <span className="text-primary-500">
            {item.mileage.toLocaleString()}P
          </span>{" "}
          적립
        </p>
      </div>
    </div>
  );

  return (
    <div className="container font-notokr">
      <div className="my-8">
        <span className="font-semibold text-lg">녹색 제품 목록</span>
        <div className="grid grid-cols-5 gap-6">
          {products.slice(0, 5).map(renderProductCard)}
        </div>
      </div>

      <div className="my-8">
        <span className="font-semibold text-lg">에너지 효율 1등급 제품(에어컨)</span>
        <div className="grid grid-cols-5 gap-6">
          {energy.slice(0, 5).map(renderProductCard)}
        </div>
      </div>

      <div className="my-4 flex gap-2 justify-center">
        <span className="font-semibold mr-6 mt-6 text-lg">오프라인 적립매장</span>
      </div>

      <div className="flex w-full mt-8 mb-16 gap-6 justify-center">
        <div className="w-1/2 min-w-[480px] aspect-video">
          <div id="map" style={{ width: "100%", height: "100%" }}></div>
        </div>
        <div className="flex flex-col gap-4">
          {["이마트", "홈플러스", "gs"].map((keyword, idx) => (
            <div
              key={idx}
              className={`rounded-2xl ${
                activeButton === keyword ? "border-4 border-green-500" : ""
              }`}
              style={{ width: "160px", height: "100px", overflow: "hidden" }}
            >
              <button
                onClick={() => handleSearch(keyword)}
                className="w-full h-full hover:cursor-pointer"
              >
                <img
                  src={
                    keyword === "이마트"
                      ? "https://cdn.psnews.co.kr/news/photo/202403/2050553_100280_4015.jpg"
                      : keyword === "홈플러스"
                      ? "https://blog.kakaocdn.net/dn/rfvNk/btrbgodbV2k/Ycz0kkfmFREQhlKkxIduJK/img.jpg"
                      : "https://18db109adea2ac8c.kinxzone.com/upfile/image/additionFacilities/6e320139-605d-4f82-804e-b1fba89e4f31.jpg"
                  }
                  alt={keyword}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
