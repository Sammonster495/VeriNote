import Navbar from "../components/navbar";

export default function Verify(){
    return(
        <div>
            <Navbar home={false} about={false} verify={true} />
        </div>
    )
}