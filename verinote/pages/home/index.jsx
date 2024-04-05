import Navbar from "../components/navbar";

export default function Home() {
  return (
    <div >
      <Navbar home={true} about={false} verify={false}/>
    </div>
  );
}