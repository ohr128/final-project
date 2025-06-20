import { Link } from "react-router-dom";
import SideMenu from "../../components/SideMenu/SideMenu";
Link

function GreenDetail() {

    return(

        <div className="flex font-notokr">

            <SideMenu from="/green-product"/>

        {/* 오른쪽 영역 */}
            <div className="w-4/5 px-6">

                <div className="flex justify-evenly  my-20">

                    <img className="w-1/3" src="https://sitem.ssgcdn.com/61/73/61/item/1000188617361_i1_750.jpg" alt="" />
                    
                    <div className="flex flex-col gap-3 ">

                        <span>제품명</span>
                        <span>가격</span>
                        <span>포인트</span>

                        <div className="w-3/5 flex items-center border border-gray-300 rounded">
                            <button className="px-3 py-1 text-">-</button>
                            <span className="px-3">1</span>
                            <button className="px-3 py-1 text-lg">+</button>
                        </div>
                        
                        <div className="flex">
                            <Link to="/cart">
                                <button className="border border-primary-500 text-primary-500 px-4 py-2 cursor-pointer">장바구니</button>
                            </Link>
                            
                            <button className=" bg-primary-500 text-white px-4 py-2 cursor-pointer">바로구매</button>
                        </div>
                        
                    </div>
                    
                </div>


                <div className="border-y border-y-gray-200 flex justify-center items-center p-20">
                        <span>제품 상세내용</span>
                </div>

                <div className="border-y border-y-gray-200">
                    <span className="text-xl">리뷰</span>

                    <div className="border-y border-y-gray-200 p-10 flex items-center justify-around">
                        <img className="w-1/5" src="https://sitem.ssgcdn.com/61/73/61/item/1000188617361_i1_750.jpg" alt="" />
                        <span>잘쓰고있습니다.</span>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default GreenDetail;