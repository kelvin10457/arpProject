import { useEffect, useState } from 'react';

export default function ClientsAndSalesRecords() {
  const [clients, setClients] = useState([]);
  const [sales, setSales] = useState([]);

  async function fetchClients() {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/clients`);
      const data = await res.json();
      setClients(data);
    } catch (e) {
      console.error('Error fetching clients', e);
    }
  }

  async function fetchSales() {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/salesAndClients`);
      const data = await res.json();
      setSales(data);
    } catch (e) {
      console.error('Error fetching sales', e);
    }
  }

  useEffect(() => {
    fetchClients();
    fetchSales();

    function onUpdated() {
      fetchClients();
      fetchSales();
    }

    window.addEventListener('sales-updated', onUpdated);
    window.addEventListener('clients-updated', onUpdated);

    return () => {
      window.removeEventListener('sales-updated', onUpdated);
      window.removeEventListener('clients-updated', onUpdated);
    };
  }, []);

  async function handleDeleteClient(id) {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/clients/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        alert('Error al eliminar el cliente');
        return;
      }
      fetchClients();
      fetchSales();
    } catch (e) {
      console.error(e);
    }
  }

  async function handleDeleteSale(id) {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/sales/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        alert('Error al eliminar la venta');
        return;
      }
      fetchSales();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-10 space-y-10">
      {/* Clients Table */}
      <div>
        <h2 className="text-amber-900 text-3xl font-bold mb-6">Clientes</h2>
        {clients.length === 0 ? (
          <p className="text-amber-800">No hay clientes registrados.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-amber-200 shadow-sm">
            <table className="min-w-full divide-y divide-amber-200">
              <thead className="bg-amber-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase text-amber-900">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase text-amber-900">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase text-amber-900">Cédula</th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase text-amber-900">Teléfono</th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-amber-100">
                {clients.map((c) => (
                  <tr key={c.id_client} className="hover:bg-amber-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono font-bold text-amber-900">#{c.id_client}</td>
                    <td className="px-6 py-4 text-sm font-mono font-bold text-amber-900">{c.name}</td>
                    <td className="px-6 py-4 text-sm font-mono font-bold text-amber-900">{c.idNumber}</td>
                    <td className="px-6 py-4 text-sm font-mono font-bold text-amber-900">{c.phoneNumber}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDeleteClient(c.id_client)} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-xl text-white font-bold text-xs">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Sales Table */}
      <div>
        <h2 className="text-amber-900 text-3xl font-bold mb-6">Ventas</h2>
        {sales.length === 0 ? (
          <p className="text-amber-800">No hay ventas registradas.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-amber-200 shadow-sm">
            <table className="min-w-full divide-y divide-amber-200">
              <thead className="bg-amber-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase text-amber-900">ID Venta</th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase text-amber-900">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase text-amber-900">Sacos</th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase text-amber-900">Precio c/u</th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase text-amber-900">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase text-amber-900">Cédula</th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase text-amber-900">Teléfono</th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-amber-100">
                {sales.map((s) => (
                  <tr key={s.id_sale} className="hover:bg-amber-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono font-bold text-amber-900">#{s.id_sale}</td>
                    <td className="px-6 py-4 text-sm font-mono font-bold text-amber-900">{s.sale_date}</td>
                    <td className="px-6 py-4 text-sm font-mono font-bold text-amber-900">{s.amountOfBags}</td>
                    <td className="px-6 py-4 text-sm font-mono font-bold text-amber-900">{s.pricePerBag}</td>
                    <td className="px-6 py-4 text-sm font-mono font-bold text-amber-900">{s.client_name}</td>
                    <td className="px-6 py-4 text-sm font-mono font-bold text-amber-900">{s.client_idNumber}</td>
                    <td className="px-6 py-4 text-sm font-mono font-bold text-amber-900">{s.phoneNumber}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDeleteSale(s.id_sale)} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-xl text-white font-bold text-xs">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
