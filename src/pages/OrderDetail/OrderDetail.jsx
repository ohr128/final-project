import SideMenu from "../../components/SideMenu/SideMenu";


function OrderDetail() {


  return (

    <div className="flex font-notokr">

      <SideMenu from="/order-detail" />


      {/* 오른쪽 영역 */}
      <div className="w-4/5 px-6">

        <div className="my-8">

          <h1 className="p-10 text-3xl font-bold">주문내역</h1>

          <div className="flex justify-around items-center py-4 border-y border-y-gray-300">
                <img className="h-30" src="https://sitem.ssgcdn.com/61/73/61/item/1000188617361_i1_750.jpg" alt="" />
                <span>제품명</span>
                <span>가격</span>
                <span>포인트</span>
                
                <div className="flex flex-col gap-1">
                    <button className="border-1 border-primary-500 rounded px-4 py-1  cursor-pointer">반품하기</button>
                    <button className="bg-primary-500 text-white rounded px-4 py-1  cursor-pointer">리뷰작성</button>
                </div>
          </div>


        </div>


      </div>








    </div>
  );
}

export default OrderDetail;
