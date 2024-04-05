import Link from "next/link"

export default function Navbar({home, about, verify}){
    return(
        <div className={`relative ${verify?"bg-[#D9D9D9]":"bg-[#232922]"} h-[9rem] w-full`}>
            <div className="absolute top-12 grid grid-cols-2 justify-between inset-x-16">
                <p className={`text-5xl font-josefin self-center ${verify?"text-[#232922]":"text-white"}`}>VERINOTE</p>
                <ul className="text-white  grid grid-cols-3 text-xl font-josefin w-full mx-10">
                    <Link href="/home" className="self-center"><li>Home</li></Link>
                    <Link href="/about" className="self-center"><li>About</li></Link>
                    <Link href="/verify" className="self-center"><li>Verify</li></Link>
                </ul>
            </div>
        </div>
    )
}