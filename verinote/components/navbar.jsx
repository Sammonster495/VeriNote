import Link from "next/link"
import { useState } from "react"

export default function Navbar({home, about, verify}){
    const [open, setOpen] = useState(false)
    const toggle = () => setOpen(!open);

    return(
        <div className={`relative ${verify?"bg-[#D9D9D9]":"bg-[#232922]"} lg:h-[9rem] md:h-28 sm:h-20 h-12`}>
            <div className="absolute lg:top-12 md:top-10 sm:top-7 top-4 flex sm:grid grid-cols-2 justify-between lg:inset-x-16 md:inset-x-12 sm:inset-x-8 inset-x-4">
                <p className={`lg:text-5xl sm:text-3xl font-josefin self-center ${verify?"text-[#232922]":"text-white"}`}>VERINOTE</p>
                <ul className="text-white hidden sm:grid grid-cols-3 lg:text-2xl sm:text-xl font-josefin w-full mx-10">
                    <Link href="/home" className={`self-center ${verify?"text-[#232922]":"text-white"}`}><li>Home</li></Link>
                    <Link href="/about" className={`self-center ${verify?"text-[#232922]":"text-white"}`}><li>About</li></Link>
                    <Link href="/verify" className={`self-center ${verify?"text-[#232922]":"text-white"}`}><li>Verify</li></Link>
                </ul>
                <div className="sm:hidden cursor-pointer">
                    <div className={`${open ? "hidden" : ""}`} onClick={toggle}>
                        <svg viewBox="0 0 100 80" width="40" height="20" fill={`${verify?"bg-[#232922]":"white"}`}>
                            <rect width="100" height="10"></rect>
                            <rect y="30" width="100" height="10"></rect>
                            <rect y="60" width="100" height="10"></rect>
                        </svg>
                    </div>
                    <nav className={`flex flex-col absolute top-8 right-6 w-16 bg-gray-700 shadow-xl transition-all duration-300 ease-in-out ${open ? "block" : "hidden"}`}>
                        <Link href="/home" className={`self-center w-full text-center text-white ${home ? "bg-slate-800":""}`} onClick={toggle}><span>Home</span></Link>
                        <Link href="/about" className={`self-center w-full text-center text-white ${about ? "bg-slate-800":""}`} onClick={toggle}><span>About</span></Link>
                        <Link href="/verify" className={`self-center w-full text-center text-white ${verify ? "bg-gray-800":""}`} onClick={toggle}><span>Verify</span></Link>
                    </nav>
                </div>
            </div>
        </div>
    )
}