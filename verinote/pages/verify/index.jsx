import Navbar from "../../components/navbar";
import { useState } from "react";
import axios from "axios";

export default function Verify(){
    const [selectedFile, setSelectedFile] = useState();
    const [prediction, setPrediction] = useState("")

    const handleImageChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const submitForm = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            return alert("Please select an image");
        }
        const formData = new FormData();
        formData.append("image", selectedFile); // Use "image" instead of "file" as the key
        try {
            const response = await axios.post(`${process.env.BACKEND_URL}/analyze`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            setPrediction(response.data.result); // Use "result" instead of "prediction"
            console.log(response.data.result);
        } catch (err) {
            console.log(err);
        }
    }
    

    return(
        <div>
            <Navbar home={false} about={false} verify={true} />
            <div className="relative bg-[#232922] py-12 lg:px-24 md:px-20 sm:px-16 px-6">
                <p className="text-white lg:text-3xl md:text-2xl sm:text-xl text-lg font-italiana lg:w-[38rem] md:w-[30rem] sm:w-[20rem] w-full text-center ">Enter image of the note:</p>
                <div className="sm:flex lg:gap-16 md:gap-12 sm:gap-8 gap-4">
                    <div className="flex flex-col">
                        <div className="relative border border-dashed lg:h-[19rem] md:h-[15rem] sm:h-[11rem] h-[9rem] lg:w-[38rem] md:w-[30rem] sm:w-[20rem] w-full lg:my-10 md:my-8 flex flex-col">
                            {!selectedFile && <input type="file" accept="image/*" onChange={handleImageChange} className="self-center justify-self-center text-white font-josefin w-56 lg:mt-32 md:mt-24 sm:mt-16 mt-12"/>}
                            {selectedFile &&
                                <img src={URL.createObjectURL(selectedFile)} alt="selected image" className="object-fill w-full h-full absolute"/>
                            }
                        </div>
                        <button onClick={submitForm} className="self-center bg-white h-8 rounded-xl w-20 text-xl text-[#232922] font-josefin my-3">Verify</button>
                    </div>
                    <div>
                        <p className="text-white lg:text-2xl md:text-xl sm:text-lg text-sm font-italiana lg:my-20 md:my-16 sm:my-8 w-64">Currency notes should be INR</p>
                        <p className="text-white lg:text-2xl md:text-xl sm:text-lg text-sm font-italiana lg:my-20 md:my-16 sm:my-8 w-72">Hight quality images gives better results</p>
                    </div>
                </div>
                <p className="text-white lg:text-3xl md:text-2xl sm:text-xl text-lg font-italiana lg:my-12 md:my-9 sm:my-6 my-3">Your note is</p>
                <div className="relative w-full lg:h-[25rem] md:h-[21rem] sm:h-[15rem] h-[9rem] lg:py-12 md:py-8 sm:py-4 py-0">
                    <div className="absolute border border-dashed lg:h-[19rem] md:h-[15rem] sm:h-[11rem] h-[9rem] lg:w-[38rem] md:w-[30rem] sm:w-[20rem] w-full right-0">
                    <div className="relative w-full h-full">
                        {prediction && selectedFile && <img src={URL.createObjectURL(selectedFile)} alt="selected image" className="object-fill w-full h-full absolute" />}
                        {prediction && <p className={`${prediction==="FAKE" ? "text-red-600" : "text-green-900"} text-5xl font-bold self-center justify-self-center absolute inset-0 flex items-center justify-center`}>{prediction}</p>}
                    </div>

                    </div>
                </div>
            </div>
        </div>
    )
}