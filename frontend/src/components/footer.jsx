import { Link } from "react-router-dom"
export default function Footer(){
    return (
        <div className="h-20 w-full bg-amber-700 border-t-2 border-amber-900">
            <div className="max-w-6xl w-full h-full mx-auto py-4">
                <Link to="/" className="text-white my-2 cursor-pointer text-3xl font-bold">Cacao +</Link>
            </div>
        </div>
    )
}