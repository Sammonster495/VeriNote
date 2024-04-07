import Navbar from "../../components/navbar";
import Cards from "../../components/cards";

export default function About() {
  return (
    <div >
      <Navbar home={false} about={true} verify={false}/>
      <div className="bg-[#232922] h-full lg:py-20 md:py-16 sm:py-12 py-8 lg:p-12 md:p-10 sm:p-6 p-4">
        <div className="sm:grid grid-cols-4">
            <Cards image="law_image.png" text="Check if your note is legitimate instantly" pos="reverse"/>
            <Cards image="ai_image.png" text="AI-Powered  detection system" pos=""/>
            <Cards image="currency_image.png" text="Works for the highest denomination of INR" pos="reverse"/>
            <Cards image="ml_image.png" text="Uses machine learning algorithms to accurately provide results" pos=""/>
        </div>
      </div>
    </div>
  );
}