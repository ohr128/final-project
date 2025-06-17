import { Link } from "react-router-dom";
import banner from "../../assets/banner.png";
import logo from "../../assets/logo.png";

function Home() {
  return (

    <div className="container">
        

        <div className="flex justify-end items-center mt-4">
            <Link to="/">
                <img className="w-40" src={logo} alt="/" />
            </Link>

            <div className="w-full h-12 flex justify-end items-center text-sm font-bold gap-6">
                <Link to="/login">로그인</Link>
                <Link to="/signUp">회원가입</Link>
                <Link to="/cart">장바구니</Link>
            </div>
        </div>




        <div className="flex justify-around my-4 font-bold">
          <span>마이페이지</span>
          <span>스토어</span>
          <span>그린리모델링</span>
        </div>

        <div className="">
            <img src={banner} alt="" />
        </div>



    <div className="my-8">
        <span className="font-extrabold">녹색 제품 목록</span>


        {/* 녹색 제품 */}
        <div className="grid grid-cols-5 mt-3 gap-6">

          <div className="aspect-9/12 group cursor-pointer shadow rounded-xl overflow-hidden">
            <div className="h-3/5 flex justify-center items-center overflow-hidden">
              <img src="https://sitem.ssgcdn.com/61/73/61/item/1000188617361_i1_750.jpg" alt="" />
            </div>
            
            <div className="h-2/5 pt-2 relative flex flex-col justify-evenly ml-3">
              <span>제품명</span>
              <span className="font-bold">가격</span>
              <span className="text-xs mb-3">포인트 75P 적립</span>
            </div>
          </div>

          <div className="aspect-9/12 group cursor-pointer shadow rounded-xl overflow-hidden">
            <div className="h-3/5 flex justify-center items-center overflow-hidden">
              <img src="https://sitem.ssgcdn.com/61/73/61/item/1000188617361_i1_750.jpg" alt="" />
            </div>
            
            <div className="h-2/5 pt-2 relative flex flex-col justify-evenly ml-3">
              <span>제품명</span>
              <span className="font-bold">가격</span>
              <span className="text-xs mb-3">포인트 75P 적립</span>
            </div>
          </div>

          <div className="aspect-9/12 group cursor-pointer shadow rounded-xl overflow-hidden">
            <div className="h-3/5 flex justify-center items-center overflow-hidden">
              <img src="https://sitem.ssgcdn.com/61/73/61/item/1000188617361_i1_750.jpg" alt="" />
            </div>
            
            <div className="h-2/5 pt-2 relative flex flex-col justify-evenly ml-3">
              <span>제품명</span>
              <span className="font-bold">가격</span>
              <span className="text-xs mb-3">포인트 75P 적립</span>
            </div>
          </div>

          <div className="aspect-9/12 group cursor-pointer shadow rounded-xl overflow-hidden">
            <div className="h-3/5 flex justify-center items-center overflow-hidden">
              <img src="https://sitem.ssgcdn.com/61/73/61/item/1000188617361_i1_750.jpg" alt="" />
            </div>
            
            <div className="h-2/5 pt-2 relative flex flex-col justify-evenly ml-3">
              <span>제품명</span>
              <span className="font-bold">가격</span>
              <span className="text-xs mb-3">포인트 75P 적립</span>
            </div>
          </div>

          <div className="aspect-9/12 group cursor-pointer shadow rounded-xl overflow-hidden">
            <div className="h-3/5 flex justify-center items-center overflow-hidden">
              <img src="https://sitem.ssgcdn.com/61/73/61/item/1000188617361_i1_750.jpg" alt="" />
            </div>
            
            <div className="h-2/5 pt-2 relative flex flex-col justify-evenly ml-3">
              <span>제품명</span>
              <span className="font-bold">가격</span>
              <span className="text-xs mb-3">포인트 75P 적립</span>
            </div>
          </div>


        </div>

        </div>


        {/* 에너지 효율 1등급 제품 */}

        <div className="my-8">
        <span className="font-extrabold">에너지 효율 1등급 제품</span>


        {/* 녹색 제품 */}
        <div className="grid grid-cols-5 mt-3 gap-6">

          <div className="aspect-9/12 group cursor-pointer shadow rounded-xl overflow-hidden">
            <div className="h-3/5 flex justify-center items-center overflow-hidden">
              <img src="https://lgsj.co.kr/web/product/small/202504/a6b3d27c840a8a63bf35a93822f520f0.jpg" alt="" />
            </div>
            
            <div className="h-2/5 pt-2 relative flex flex-col justify-evenly ml-3">
              <span>제품명</span>
              <span className="font-bold">가격</span>
              <span className="text-xs mb-3">포인트 75P 적립</span>
            </div>
          </div>

          <div className="aspect-9/12 group cursor-pointer shadow rounded-xl overflow-hidden">
            <div className="h-3/5 flex justify-center items-center overflow-hidden">
              <img src="https://lgsj.co.kr/web/product/small/202504/a6b3d27c840a8a63bf35a93822f520f0.jpg" alt="" />
            </div>
            
            <div className="h-2/5 pt-2 relative flex flex-col justify-evenly ml-3">
              <span>제품명</span>
              <span className="font-bold">가격</span>
              <span className="text-xs mb-3">포인트 75P 적립</span>
            </div>
          </div>

          <div className="aspect-9/12 group cursor-pointer shadow rounded-xl overflow-hidden">
            <div className="h-3/5 flex justify-center items-center overflow-hidden">
              <img src="https://lgsj.co.kr/web/product/small/202504/a6b3d27c840a8a63bf35a93822f520f0.jpg" alt="" />
            </div>
            
            <div className="h-2/5 pt-2 relative flex flex-col justify-evenly ml-3">
              <span>제품명</span>
              <span className="font-bold">가격</span>
              <span className="text-xs mb-3">포인트 75P 적립</span>
            </div>
          </div>

          <div className="aspect-9/12 group cursor-pointer shadow rounded-xl overflow-hidden">
            <div className="h-3/5 flex justify-center items-center overflow-hidden">
              <img src="https://lgsj.co.kr/web/product/small/202504/a6b3d27c840a8a63bf35a93822f520f0.jpg" alt="" />
            </div>
            
            <div className="h-2/5 pt-2 relative flex flex-col justify-evenly ml-3">
              <span>제품명</span>
              <span className="font-bold">가격</span>
              <span className="text-xs mb-3">포인트 75P 적립</span>
            </div>
          </div>

          <div className="aspect-9/12 group cursor-pointer shadow rounded-xl overflow-hidden">
            <div className="h-3/5 flex justify-center items-center overflow-hidden">
              <img src="https://lgsj.co.kr/web/product/small/202504/a6b3d27c840a8a63bf35a93822f520f0.jpg" alt="" />
            </div>
            
            <div className="h-2/5 pt-2 relative flex flex-col justify-evenly ml-3">
              <span>제품명</span>
              <span className="font-bold">가격</span>
              <span className="text-xs mb-3">포인트 75P 적립</span>
            </div>
          </div>


        </div>

        </div>



        <div className="my-10">
          
          <div className="flex mb-2">
            <span className="font-extrabold mr-6">오프라인 적립매장</span>
            <input className="" placeholder="검색어를 입력해주세요" type="text" />
          </div>

          <div className="border border-gray-500 p-40">

          </div>

        </div>


        {/* footer */}
        <footer className="bg-slate-600 p-10">

            <div>
                <span className="text-primary-500">풀내음</span>
            </div>

            <div className="mt-2 text-gray-300 text-sm">
                COPYRIGHT 2023 (c) DAEJEON METROPOLITAN CITY. ALL RIGHTS RESERVED.
            </div>


        </footer>

    



    </div>

  );
}

export default Home;
