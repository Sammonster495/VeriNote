import Navbar from "../components/navbar";

export default function Home() {
  return (
    <div >
      <Navbar home={false} about={true} verify={false}/>
    </div>
  );
}