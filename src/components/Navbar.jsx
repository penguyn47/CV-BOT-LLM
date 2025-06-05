
function Navbar() {
return <>
    <div className="flex justify-between py-4 px-8 border-b-1">
        {/* PAGE ICON SECTION */}
        <div className="flex justify-between gap-2 items-center">
            <img src="/icon.png" className="h-[30px]" />
            <div className="font-bold text-xl">CV Pro</div>
        </div>

        {/* NAV ITEMS SECTION */}
        <div>
            <ul className="flex justify-between gap-6 text-xl">
                <li>
                    <div>
                        Trang chủ
                    </div>
                </li>
                <li>
                    <div>
                        Mẫu CV
                    </div>
                </li>
                <li>
                    <div>
                        Hồ sơ của tôi
                    </div>
                </li>
                <li>
                    <div>
                        Hướng dẫn
                    </div>
                </li>
            </ul>
        </div>

        {/* USER SECTION */}
        <div>
            <img src="/icon.png" className="h-[30px]"/>
        </div>
    </div>
  </>
}

export default Navbar;
