import { Link } from "react-router-dom"

export default function Hero(){
    return(
        
        <section class="relative py-15 bg-[url('/hero_image_1.jpg')] bg-cover bg-center bg-no-repeat
        md:py-40">
            <div className="h-full flex flex-col items-center justify-center gap-10
            md:max-w-6xl md:mx-auto">
                
                <h1 className="text-5xl text-white text-center">EL ALMA DEL CHOCOLATE EMPIEZA AQUÍ</h1>
                <p className="text-2xl text-white text-center">Productores de Cacao Fino de Aroma. Conectando la riqueza de nuestra tierra con los paladares más exigentes del mundo.</p>

                <div className="flex justify-around items-center gap-4">

                    <Link to="/harvest" className="py-4 px-2 bg-amber-700 rounded-2xl text-center text-white font-bold cursor-pointer transition-all duration-100
                    hover:border-2 hover:border-amber-700 hover:text-white hover:bg-transparent">
                        REGISTRA UNA COSECHA
                    </Link>

                    <Link to="/sales" className="py-4 px-2 bg-transparent border-2 border-amber-700 rounded-2xl text-center text-white font-bold cursor-pointer transition-all duration-100
                    hover:bg-amber-700">
                        REGISTRA UNA COMPRA
                    </Link>

                </div>

            </div>

        </section>
        
    )
}