export default function LandsRecords({ lands, onRefresh }) {

    async function handleDelete(id) {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/lands/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                alert("Hubo un error al eliminar este item");
                return;
            } else {
                onRefresh();
            }
        } catch (e) {
            console.log(`hubo error: ${e}`);
        }
    }

    if (lands.length === 0) {
        return (
            <div className="w-full max-w-6xl mx-auto py-10">
                <h3 className="text-amber-800 font-semibold"> No hay registros aún!</h3>
            </div>
        )
    }

    return (
        <div className="w-full max-w-6xl mx-auto py-10">
            <h2 className="text-amber-900 text-3xl font-bold mb-6">Mostrar los lotes</h2>
            
            <div className="overflow-x-auto rounded-lg border border-amber-200 shadow-sm">
                <table className="min-w-full divide-y divide-amber-200">
                    <thead className="bg-amber-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-amber-900">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-amber-900">
                                Nombre Lote
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-amber-900">
                                Descripción
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                {/* Acciones */}
                            </th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-amber-100">
                        {lands.map((land) => (
                            <tr key={land.id_land} className="hover:bg-amber-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-bold text-amber-900">
                                    #{land.id_land}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-amber-800">
                                    {land.name_land}
                                </td>
                                <td className="px-6 py-4 text-sm text-amber-700 max-w-xs truncate">
                                    {land.description || "No description provided"}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button 
                                        onClick={function() { handleDelete(land.id_land) }} 
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
    )
}