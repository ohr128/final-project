import SideMenu from "../../components/SideMenu/SideMenu";

function EditAddress(){

    return(


        <div className="flex font-notokr">
            
            <SideMenu from="/checkpw" />

            <div className="w-4/5  flex justify-center">

                <div className="w-full max-w-3xl flex flex-col mt-20">
                    <h1 className="p-10 text-2xl font-bold text-center">배송지 관리</h1>

                    <div className="flex flex-col w-full gap-2">

                        <div className="flex justify-between font-semibold border-b border-b-gray-500 px-20 pb-3">
                            <span className="ml-20">주소</span>
                            <span className="mr-4">관리</span>
                        </div>

                        <div className="flex justify-between border-b border-b-gray-200 px-20 py-2">
                            <span>대전광역시 중구 용두동 138-11...</span>
                            <button className="bg-primary-500 border-primary-500 text-white rounded px-4 py-1 cursor-pointer">삭제</button>
                        </div>

                        <div className="flex justify-between border-b border-b-gray-200 px-20 py-2">
                            <span>대전광역시 중구 용두동 138-11...</span>
                            <button className="bg-primary-500 border-primary-500 text-white rounded px-4 py-1 cursor-pointer">삭제</button>
                        </div>


                    </div>
                </div>
            </div>
        
        
        
        
        
        </div>

    )
}


export default EditAddress;