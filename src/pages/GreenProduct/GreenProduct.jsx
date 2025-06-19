import SideMenu from "../../components/SideMenu/SideMenu";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GreenProduct() {
  const [pageNoArray, setPageNoArray] = useState([1, 2, 3, 4, 5]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [finalPage, setFinalPage] = useState(1);
  const [keyWord, setKeyword] = useState("");
  const [sortOption, setSortOption] = useState("none");
  const itemsPerPage = 9;
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const nav = useNavigate();
  useEffect(() => {
    fetch("http://localhost:8080/api/green-object-list")
      .then((res) => res.json())
      .then((data) => {setProducts(data);});
  }, []);

  useEffect(() => {
    let filtered = products.filter((item) =>
      item.name.toLowerCase().includes(keyWord.toLowerCase())
    );

    if (sortOption === "price") {
      filtered.sort((a, b) => a.prices - b.prices);
    } else if (sortOption === "mileage") {
      filtered.sort((a, b) => a.mileage - b.mileage);
    }

    setFilteredProducts(filtered);
    const totalPage = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
    setFinalPage(totalPage);

    const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
    const endPage = Math.min(startPage + 4, totalPage);
    const pageArray = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    setPageNoArray(pageArray);
  }, [products, keyWord, sortOption, currentPage]);

  useEffect(() => {
    if (currentPage > finalPage) {
      setCurrentPage(finalPage);
    }
  }, [finalPage]);

  const firstPage = () => {
    setCurrentPage(1);
  };

  const lastPage = () => {
    const startPage = Math.floor((finalPage - 1) / 5) * 5 + 1;
    const endPage = finalPage;
    const gettingPage = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    setPageNoArray(gettingPage);
    setCurrentPage(finalPage);
  };

  const nextPage = () => {
    const goPage = Math.floor((currentPage - 1) / 5) * 5 + 6;
    if (goPage > finalPage) return;
    const endPage = Math.min(goPage + 4, finalPage);
    const newPageNumArray = [];
    for (let i = goPage; i <= endPage; i++) {
      newPageNumArray.push(i);
    }
    setPageNoArray(newPageNumArray);
    setCurrentPage(goPage);
  };

  const prevPage = () => {
    const goPage = Math.floor((currentPage - 1) / 5) * 5;
    if (goPage <= 0) return;
    const startPage = goPage - 4;
    const newPageNumArray = [];
    for (let i = startPage; i <= goPage; i++) {
      newPageNumArray.push(i);
    }
    setPageNoArray(newPageNumArray);
    setCurrentPage(goPage);
  };

  return (
    <div className="flex font-notokr">
      <SideMenu from="/green-product" />
      <div className="w-4/5 px-6">
        <div className="my-8">
          <h1 className="p-10 text-3xl font-bold text-center">녹색 제품</h1>

          <div className="flex items-center justify-between">
            <div>
              <span
                onClick={() => {
                  setSortOption("price");
                  setCurrentPage(1);
                }}
                className={`mx-2 cursor-pointer ${sortOption === "price" ? "font-bold underline" : ""}`}
              >
                가격순
              </span>
              <span
                onClick={() => {
                  setSortOption("mileage");
                  setCurrentPage(1);
                }}
                className={`cursor-pointer ${sortOption === "mileage" ? "font-bold underline" : ""}`}
              >
                적립순
              </span>
            </div>
            <input
              value={keyWord}
              onChange={(e) => setKeyword(e.target.value)}
              className="border border-gray-300 rounded-4xl py-1 px-4"
              placeholder="검색어를 입력해주세요."
              type="text"
            />
          </div>

          <div className="grid grid-cols-3 mt-3 gap-6">
            {filteredProducts.length === 0 ? (
              <div className="col-span-3 text-center text-gray-500 text-lg py-10">
                검색하신 품목은 없습니다.
              </div>
            ) : (
              filteredProducts.slice(startIdx, endIdx).map((item) => (
                <div key={item.productId} onClick={() => nav("/GreenDetail?productId=" + item.productId)} className="aspect-9/12 group cursor-pointer shadow rounded-xl overflow-hidden">
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
                      {item.name.length > 18 ? item.name.slice(0, 18) + "..." : item.name}
                    </span>
                    <span className="font-bold">₩ {item.prices.toLocaleString()}</span>
                    <span className="text-xs mb-3">포인트 {item.mileage.toLocaleString()}P 적립</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {filteredProducts.length > 0 && (
           <ul className="flex gap-1 justify-center my-10 select-none">
              <li
                onClick={firstPage}
                className="size-9 bg-gray-100 flex justify-center items-center border border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="#777777"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                  />
                </svg>
              </li>
              <li
                onClick={prevPage}
                className="size-9 bg-gray-100 flex justify-center items-center border border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="#777777"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </li>
              {pageNoArray.map((num) => (
                <li
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`size-9 flex justify-center items-center ${
                    currentPage === num
                      ? "bg-primary-500 text-white"
                      : "border cursor-pointer border-gray-300"
                  }`}
                >
                  {num}
                </li>
              ))}
              <li
                onClick={nextPage}
                className="size-9 bg-gray-100 flex justify-center items-center border border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="#777777"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </li>
              <li
                onClick={lastPage}
                className="size-9 bg-gray-100 flex justify-center items-center border border-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="#777777"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default GreenProduct;
