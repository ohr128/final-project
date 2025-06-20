import SideMenu from "../../components/SideMenu/SideMenu";

function DelInfo(){


    return(

        <div className="flex font-notokr">

            <SideMenu from="/check-info" />

            <div className="w-4/5  flex justify-center">

                <div className="w-full max-w-3xl flex flex-col mt-20 gap-5">
                    <h1 className="p-10 text-2xl font-bold text-center">회원탈퇴</h1>

                    <div className="flex flex-col w-full gap-2">

                        <div className="bg-gray-100 flex flex-col px-6 py-10 gap-1">
                            <span className="font-bold mb-4">※ 회원 탈퇴 전 유의사항 ※</span>
                            <span>탈퇴 시 모든 이용내역은 삭제되며, 복구가 불가능합니다.</span>
                            <span>보유 중인 쿠폰, 적립금 등 모든 혜택은 소멸됩니다.</span>
                            <span>배송 중이거나 반품이 진행 중인 내역이 있을 경우, 탈퇴가 제한됩니다.</span>
                            <span>탈퇴 후 동일한 아이디로 재가입하실 수 없습니다.</span>
                            <span>상기 내용을 모두 확인하였으며 이에 동의하시는 경우, 아래 빈칸에 <span className="text-primary-500 font-bold">**‘동의합니다’**</span>를 정확히 입력해 주세요.</span>
                        </div>

                        <div className="flex justify-center my-4">
                            <input className="border border-gray-300 p-2 w-2/5 text-center" placeholder="'동의합니다'" type="text" />
                        </div>

                         <div className="bg-gray-100 flex flex-col p-8 gap-1 my-16">
                            <span className="font-bold mb-4">본인확인을 위해 비밀번호를 입력해주세요.</span>

                            <div className="flex justify-around">
                                <span>이름 홍길동</span>
                                <span>이메일 hong@naver.com</span>
                                <span>비밀번호 <input className="bg-white border border-gray-300 rounded" type="password" /></span>
                            </div>

                        </div>

                        <div className="flex justify-center my-16">
                            <button className=" w-1/4 bg-primary-500 text-white rounded px-4 py-2 cursor-pointer">탈퇴하기</button>
                        </div>


                    </div>

                    


                </div>

            
            
            </div>







        </div>
    )
}

export default DelInfo;