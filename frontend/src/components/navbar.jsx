import { Link } from "react-router-dom"

export default function NavBar(){
    return (
            <div className="py-2">
                <Link to="/" className="flex justify-center items-center text-amber-950 text-center my-2 cursor-pointer text-3xl font-bold">CACAO +</Link>

                <nav className="flex flex-col justify-between items-center
                md:flex-row md:max-w-6xl md:mx-auto">
                    <Link to="/lands" className="w-full h-8 flex justify-center items-center text-amber-950 font-bold hover:bg-amber-700 hover:text-white cursor-pointer transition-all duration-100">
                        Lotes
                    </Link>

                    <Link to="/harvest" className="w-full h-8 flex justify-center items-center text-amber-950 font-bold hover:bg-amber-700 hover:text-white cursor-pointer transition-all duration-100">
                        Cosecha
                    </Link>
                    
                    <Link to="/clasification" className="w-full h-8 flex justify-center items-center text-amber-950 font-bold hover:bg-amber-700 hover:text-white cursor-pointer transition-all duration-100">
                        Clasificación Cacao
                    </Link>

                    <Link to="/sales" className="w-full h-8 flex justify-center items-center text-amber-950 font-bold hover:bg-amber-700 hover:text-white cursor-pointer transition-all duration-100">
                        Registar Compra
                    </Link>
                </nav>  
            </div>
            
    )
}