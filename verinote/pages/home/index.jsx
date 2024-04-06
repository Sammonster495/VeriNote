import Navbar from "../../components/navbar";
import Link from "next/link"

export default function Home() {
  return (
    <div >
      <Navbar home={true} about={false} verify={false}/>
      <div className="bg-[#D9D9D9] h-[70%] py-48 grid md:gap-6 sm:gap-4 gap-2">
        <div className="text-center">
          <p className="text-[#232922] lg:text-3xl md:text-2xl sm:text-xl text-lg font-josefin">Enhances AI-Powered</p>
          <p className="text-[#232922] lg:text-3xl md:text-2xl sm:text-xl text-lg font-josefin">Fake Currency Detector</p>
        </div>
        <Link href="/verify" className="bg-[#232922] text-[#D9D9D9] lg:text-xl md:text-lg sm:text-sm text-xs lg:w-32 md:w-28 sm:w-24 w-20 font-josefin rounded-full p-2 justify-self-center text-center">Try Now</Link>
      </div>
      <div className="bg-[#232922] lg:h-20 sm:h-[4.5rem] h-[6.6rem]"></div>
    </div>
  );
}