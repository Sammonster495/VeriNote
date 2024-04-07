export default function Cards(props){
    return(
        <div className={`bg-[#D9D9D9] md:h-[26rem] sm:h-80 h-48 lg:w-56 md:w-48 sm:w-40 w-full sm:m-0 mb-8 justify-self-center max-sm:grid grid-cols-2 ${props.pos=="reverse" ? "flex flex-col-reverse" : "flex flex-col"}`}>
            <div className="h-48 sm:h-full">
                <img className="h-full w-full " src={props.image} alt=""/>
            </div>
            <div className="grid h-full">
                <p className="self-center text-center font-slab lg:text-3xl md:text-2xl sm:text-xl text-lg">{props.text}</p>
            </div>
        </div>
    )
}