import { useEffect } from "react";

export default function ClasificationRecords({ clasifications, onRefresh }) {

    useEffect(() => {
        onRefresh();
    },[]);
    async function handleDelete(id) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/clasification/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                alert("Hubo un error al eliminar este item");
                return;
            }
            onRefresh();
        } catch (e) {
            console.log(`hubo error: ${e}`);
        }
    }

    const fmt = (v) => (v == null ? '' : Number(v).toFixed(2));

    if (!clasifications || clasifications.length === 0) {
        return (
            <div className="w-full max-w-6xl mx-auto py-10">
                <h3 className="text-amber-800 font-semibold"> No hay registros aún!</h3>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto py-10">
            <h2 className="text-amber-900 text-3xl font-bold mb-6">Mostrar las clasificaciones</h2>

            <div className="overflow-x-auto rounded-lg border border-amber-200 shadow-sm">
                <table className="min-w-full divide-y divide-amber-200">
                    <thead className="bg-amber-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-amber-900">ID CLASIFICACIÓN</th>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-amber-900">NOMBRE</th>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-amber-900">MÍN</th>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-amber-900">MÁX</th>
                            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-amber-900">ID COSECHA</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">{/* Acciones */}</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-amber-100">
                        {clasifications.map((c) => (
                            <tr key={c.id_clasification} className="hover:bg-amber-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-bold text-amber-900">#{c.id_clasification}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-bold text-amber-900">{c.name_clasification}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-bold text-amber-900">{fmt(c.min)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-bold text-amber-900">{fmt(c.max)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-bold text-amber-900">{c.id_harvest}</td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => handleDelete(c.id_clasification)}
                                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-xl text-white font-bold transition-colors cursor-pointer text-xs"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}