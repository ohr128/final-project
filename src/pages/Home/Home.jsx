/* global kakao */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [energy, setEnergy] = useState([]);
  const [map, setMap] = useState(null);
  const [clusterer, setClusterer] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [infoWindows, setInfoWindws] = useState([]);
  const [activeButton, setActiveButton] = useState(null); // New state for active button
  const nav = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/green-object-list")
      .then((res) => res.json())
      .then((data) => setProducts(data));

    fetch("http://localhost:8080/api/FirstEnergy")
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

    // Set the active button when a search is performed
    setActiveButton(keyword);

    const ps = new kakao.maps.services.Places();

    const options = {
      location: new kakao.maps.LatLng(lat, lon),
      radius: 800,
    };

    ps.keywordSearch(
      keyword,
      (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds();
          const markers = [];

          if (clusterer) clusterer.clear();
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

  return (
    <div className="container font-notokr">
      <div className="my-8">
        <span className="font-semibold">녹색 제품 목록</span>

        <div className="grid grid-cols-5 mt-3 gap-6">
          {products.slice(0, 5).map((item, idx) => (
            <div
              key={idx}
              onClick={() => nav("/green-detail?productId=" + item.productId)}
              className="aspect-9/12 group cursor-pointer shadow rounded-xl overflow-hidden"
            >
              <div className="h-3/5 flex justify-center items-center overflow-hidden">
                <img
                  src={
                    item.image
                      ? `http://localhost:8080/${encodeURIComponent(item.image)}`
                      : `http://localhost:8080/no_image.jpg`
                  }
                />
              </div>

              <div className="h-2/5 pt-2 relative flex flex-col justify-evenly ml-3 text-sm">
                <span>
                  {item.name.length > 18
                    ? item.name.slice(0, 18) + "..."
                    : item.name}
                </span>
                <span className="font-bold">
                  ₩ {item.prices.toLocaleString()}
                </span>
                <p className="text-xs mb-3">
                  포인트
                  <span className="text-primary-500">
                    {item.mileage.toLocaleString()}P
                  </span>{" "}
                  적립
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="my-8">
        <span className="font-semibold">에너지 효율 1등급 제품(에어컨)</span>

        <div className="grid grid-cols-5 mt-3 gap-6">
          {energy.slice(0, 5).map((item, idx) => (
            <div
              key={idx}
              className="aspect-9/12 group cursor-pointer shadow rounded-xl overflow-hidden"
            >
              <div className="h-3/5 flex justify-center items-center overflow-hidden">
                <img
                  src={
                    item.image
                      ? `http://localhost:8080/${item.image}`
                      : `http://localhost:8080/no_image.jpg`
                  }
                />
              </div>

              <div className="h-2/5 pt-2 relative flex flex-col justify-evenly ml-3 text-sm">
                <span>
                  {item.name.length > 18
                    ? item.name.slice(0, 18) + "..."
                    : item.name}
                </span>
                <span className="font-bold">
                  ₩ {item.prices.toLocaleString()}
                </span>
                <p className="text-xs mb-3">
                  포인트{" "}
                  <span className="text-primary-500">
                    {item.mileage.toLocaleString()}P
                  </span>{" "}
                  적립
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="my-4 flex gap-2 justify-center">
        <span className="font-semibold mr-6 mt-2.5">오프라인 적립매장</span>
      </div>

      <div className="flex w-full my-8 gap-6 justify-center">
        <div className="w-1/2 min-w-[480px] aspect-video">
          <div id="map" style={{ width: "100%", height: "100%" }}></div>
        </div>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleSearch("이마트")}
            className={`text-whiterounded h-30 hover:cursor-pointer ${
              activeButton === "이마트" ? "border-4 border-green-500 rounded-2xl" : ""
            }`}
          >
            <img
              src="https://cdn.psnews.co.kr/news/photo/202403/2050553_100280_4015.jpg"
              alt=""
              style={{ width: "100%", height: "100%", borderRadius: "10px" }}
            />
          </button>

          <button
            onClick={() => handleSearch("홈플러스")}
            className={`text-whiterounded h-30 hover:cursor-pointer ${
              activeButton === "홈플러스" ? "border-4 border-green-500 rounded-2xl" : ""
            }`}
          >
            <img
              src="https://blog.kakaocdn.net/dn/rfvNk/btrbgodbV2k/Ycz0kkfmFREQhlKkxIduJK/img.jpg"
              alt=""
              style={{ width: "100%", height: "100%", borderRadius: "10px" }}
            />
          </button>

          <button
            onClick={() => handleSearch("gs")}
            className={`text-whiterounded h-30 hover:cursor-pointer ${
              activeButton === "gs" ? "border-4 border-green-500 rounded-2xl" : ""
            }`}
          >
            <img
              src="https://18db109adea2ac8c.kinxzone.com/upfile/image/additionFacilities/6e320139-605d-4f82-804e-b1fba89e4f31.jpg"
              alt=""
              style={{ width: "100%", height: "100%", borderRadius: "10px" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;