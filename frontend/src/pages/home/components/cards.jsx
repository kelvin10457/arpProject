
function Card({path,alt,text}){
    return (
        <div className="mx-auto flex flex-col p-4 w-80 justify-center items-center bg-amber-700 border-2 border-amber-900
        hover:-translate-y-1 transition-all duration-100">
            <img src={path} alt={alt} className="h-20 w-20 p-4 rounded-full bg-amber-900"/>
            <p className="text-2xl font-bold text-white text-center">{text}</p>
        </div>
    )
}

export default function Cards(){
    return (
        <div className="flex flex-col gap-2 my-4
        md:flex-row md:max-w-6xl md:mx-auto">
            <Card path="/map.svg" alt="map" text="Origen Único y Trazable"/>
            <Card path="/medal.svg" alt="badge" text="Calidad Premium 'Fino de Aroma'"/>
            <Card path="/hands.svg" alt="hands" text="Sostenibilidad y Comercio Justo"/>
        </div>
    )
}