import Navbar from "../components/navbar";

export default function Verify(){
    return(
        <div>
            <Navbar home={false} about={false} verify={true} />
            <div className="relative bg-[#232922] py-12 lg:px-24 md:px-20 sm:px-16 px-6">
                <p className="text-white lg:text-3xl md:text-2xl sm:text-xl text-lg font-italiana lg:w-[38rem] md:w-[30rem] sm:w-[20rem] w-full text-center ">Enter image of the note:</p>
                <div className="sm:flex lg:gap-16 md:gap-12 sm:gap-8 gap-4">
                    <div className="border border-dashed lg:h-[19rem] md:h-[15rem] sm:h-[11rem] h-[9rem] lg:w-[38rem] md:w-[30rem] sm:w-[20rem] w-full lg:my-10 md:my-8"></div>
                    <div>
                        <p className="text-white lg:text-2xl md:text-xl sm:text-lg text-sm font-italiana lg:my-20 md:my-16 sm:my-8 w-64">Currency notes should be INR</p>
                        <p className="text-white lg:text-2xl md:text-xl sm:text-lg text-sm font-italiana lg:my-20 md:my-16 sm:my-8 w-72">Hight quality images gives better results</p>
                    </div>
                </div>
                <p className="text-white lg:text-3xl md:text-2xl sm:text-xl text-lg font-italiana lg:my-12 md:my-9 sm:my-6 my-3">Your note is</p>
                <div className="relative w-full lg:h-[25rem] md:h-[21rem] sm:h-[15rem] h-[9rem] lg:py-12 md:py-8 sm:py-4 py-0">
                    <div className="absolute border border-dashed lg:h-[19rem] md:h-[15rem] sm:h-[11rem] h-[9rem] lg:w-[38rem] md:w-[30rem] sm:w-[20rem] w-full right-0"></div>
                </div>
            </div>
        </div>
    )
}