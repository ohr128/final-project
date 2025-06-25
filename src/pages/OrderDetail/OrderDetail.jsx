import SideMenu from "../../components/SideMenu/SideMenu";
import { Link } from "react-router-dom";

function OrderDetail() {

  return (

    <div className="flex font-notokr">

      <SideMenu from="/order-detail" />


      {/* 오른쪽 영역 */}
      <div className="w-4/5 flex justify-center">
        <div className="w-full max-w-5xl flex-col mt-20">

          <h1 className="p-10 text-2xl font-semibold text-center">주문내역</h1>

          <div className="flex justify-around items-center py-4 border-y border-y-gray-300">
                <img className="h-30" src="https://sitem.ssgcdn.com/61/73/61/item/1000188617361_i1_750.jpg" alt="" />
                <span>제품명</span>
                <span>가격</span>
                <span>포인트</span>
                
                <div className="flex flex-col gap-1">
                    <Link to="/takeback">
                      <button className="border border-primary-500 rounded px-2 py-1 cursor-pointer">반품하기</button>
                    </Link>
                    <Link to="/review">
                      <button className="bg-primary-500 border border-primary-500 text-white rounded px-2 py-1 cursor-pointer">리뷰작성</button>
                    </Link>
                </div>
          </div>


        </div>


      </div>








    </div>
  );
}

export default OrderDetail;
