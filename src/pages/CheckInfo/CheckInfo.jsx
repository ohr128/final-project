import SideMenu from "../../components/SideMenu/SideMenu";

function CheckInfo() {
    return (
        <div className="flex font-notokr">
            <SideMenu from="/check-info" />

            <div className="w-4/5 px-6 flex justify-center">
                <div className="w-full max-w-md flex flex-col text-center mt-20">
                    <h1 className="p-10 text-2xl font-bold">회원정보 확인</h1>

                    <div className="flex flex-col w-full gap-4">
                        <span>회원정보 보안을 위해 비밀번호를 입력해주세요.</span>

                        <input placeholder="비밀번호 입력" type="password" className="border border-gray-300 rounded px-3 py-2"/>

                        <div className="flex justify-center my-6">
                            <button className=" w-1/4 bg-primary-500 border-primary-500 text-white rounded px-4 py-2 cursor-pointer">확인</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckInfo;
