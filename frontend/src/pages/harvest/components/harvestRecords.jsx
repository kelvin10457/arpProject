
export default function HarvestRecords({ harvests, onRefresh }) {
    
    async function handleDelete(id) {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/harvest/${id}`, {
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

    if (!harvests || harvests.length === 0) {
        return (
            <div className="w-full max-w-6xl mx-auto py-10">
                <h3 className="text-amber-800 font-semibold"> No hay registros aún!</h3>
            </div>
        )
    }


    return (
        <div className="w-full max-w-6xl mx-auto py-10">
            <h2 className="text-amber-900 text-3xl font-bold mb-6">Mostrar las cosechas</h2>
            
            <div className="overflow-x-auto rounded-lg border border-amber-200 shadow-sm">
                <table className="min-w-full divide-y divide-amber-200">
                    <thead className="bg-amber-50">
                        <tr>
                            
                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-amber-900">
                                ID COSECHA
                            </th>

                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-amber-900">
                                NOMBRE COSECHA
                            </th>

                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-amber-900">
                                FECHA
                            </th>

                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-amber-900">
                                CANTIDAD DE SACOS
                            </th>

                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-amber-900">
                                COSTO POR SACO
                            </th>

                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-amber-900">
                                ID LOTE DE COSECHA
                            </th>

                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                {/* Acciones */}
                            </th>

                        </tr>
                    </thead>


                    {
                        /**
                         * 
                -- 4. Tabla HARVEST (Cosecha)
                CREATE TABLE HARVEST (
                    id_harvest INT AUTO_INCREMENT PRIMARY KEY,
                    name_harvest VARCHAR(100) NOT NULL,
                    date DATE NOT NULL,
                    amountOfBags INT NOT NULL,
                    pricePerBag DECIMAL(10, 2) NOT NULL,
                    id_lote INT NOT NULL,
                    CONSTRAINT fk_harvest_land 
                        FOREIGN KEY (id_lote) REFERENCES LAND(id_land) 
                        ON DELETE CASCADE ON UPDATE CASCADE
                ) ENGINE=InnoDB;


                         */
                    }
                    <tbody className="bg-white divide-y divide-amber-100">
                        {harvests.map((harvest) => (
                            <tr key={harvest.id_harvest} className="hover:bg-amber-50 transition-colors">

                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-bold text-amber-900">
                                    #{harvest.id_harvest}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-bold text-amber-900">
                                    {harvest.name_harvest}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-bold text-amber-900">
                                    {harvest.date}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-bold text-amber-900">
                                    {harvest.amountOfBags}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-bold text-amber-900">
                                    {harvest.pricePerBag}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-bold text-amber-900">
                                    {harvest.id_lote}
                                </td>

                                <td className="px-6 py-4 text-right">
                                    <button 
                                        onClick={function() { handleDelete(harvest.id_harvest) }} 
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