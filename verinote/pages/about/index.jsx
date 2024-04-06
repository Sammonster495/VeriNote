import Navbar from "../components/navbar";
import Cards from "../components/cards";

export default function About() {
  return (
    <div >
      <Navbar home={false} about={true} verify={false}/>
      <div className="bg-[#232922] h-full lg:py-20 md:py-16 sm:py-12 py-8 lg:p-12 md:p-10 sm:p-6 p-4">
        <div className="sm:grid grid-cols-4">
            <Cards />
            <Cards />
            <Cards />
            <Cards />
        </div>
      </div>
    </div>
  );
}