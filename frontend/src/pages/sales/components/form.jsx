import { useEffect, useState } from "react";

export default function SaleForm() {
  const [formData, setFormData] = useState({
    nameClient: '',
    idNumber: '',
    phoneNumber: '',
    date: '',
    amountOfBags: '',
    pricePerBag: '',
    nameHarvest: ''
  });

  const [harvests, setHarvests] = useState([]);

  useEffect(() => {
    async function fetchHarvests() {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/harvest`);
        const data = await res.json();
        setHarvests(data);
      } catch (e) {
        console.error('Error fetching harvests', e);
      }
    }
    fetchHarvests();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      name: formData.nameClient || null,
      idNumber: formData.idNumber,
      phoneNumber: formData.phoneNumber || null,
      date: formData.date,
      amountOfBags: Number(formData.amountOfBags),
      pricePerBag: Number(formData.pricePerBag),
      // backend expects name_harvest (string name)
      nameHarvest: formData.nameHarvest
    };

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/sales`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message || 'Venta creada correctamente');
        setFormData({ nameClient: '', idNumber: '', phoneNumber: '', date: '', amountOfBags: '', pricePerBag: '', nameHarvest: '' });
        window.dispatchEvent(new Event('sales-updated'));
      } else {
        alert(data.error || 'Error creando la venta');
      }
    } catch (e) {
      alert(`Error de red: ${e.message}`);
    }
  }

  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl border-t-8 border-amber-800 p-8">
        <header className="mb-8">
          <h2 className="text-3xl font-extrabold text-amber-900 mb-2">
            Nueva Venta
          </h2>
          <p className="text-amber-700 font-medium">
            Complete los datos del cliente y los detalles de la transacción.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* SECCIÓN: INFORMACIÓN DEL CLIENTE */}
          <section>
            <h3 className="text-xs font-black uppercase tracking-widest text-amber-800 mb-4 border-b border-amber-100 pb-2">
              Información del Cliente
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="nameClient" className="block text-sm font-bold text-amber-900 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="nameClient"
                  name="nameClient"
                  value={formData.nameClient}
                  onChange={handleChange}
                  placeholder="Nombre del comprador"
                  className="w-full px-4 py-2 border-2 border-amber-100 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none bg-amber-50 text-amber-900 transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="idNumber" className="block text-sm font-bold text-amber-900 mb-1">
                  Cédula / ID
                </label>
                <input
                  type="text"
                  id="idNumber"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  placeholder="Ej. 0912345678"
                  className="w-full px-4 py-2 border-2 border-amber-100 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none bg-amber-50 text-amber-900 transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-bold text-amber-900 mb-1">
                  Número de Teléfono
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Ej. 0998765432"
                  className="w-full px-4 py-2 border-2 border-amber-100 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none bg-amber-50 text-amber-900 transition-all"
                  required
                />
              </div>
            </div>
          </section>

          {/* SECCIÓN: INFORMACIÓN DE LA VENTA */}
          <section>
            <h3 className="text-xs font-black uppercase tracking-widest text-amber-800 mb-4 border-b border-amber-100 pb-2">
              Detalles de la Venta
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="nameHarvest" className="block text-sm font-bold text-amber-900 mb-1">
                  Cosecha de Origen
                </label>
                <select
                  id="nameHarvest"
                  name="nameHarvest"
                  value={formData.nameHarvest}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-amber-100 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none bg-amber-50 text-amber-900 transition-all cursor-pointer"
                  required
                >
                  <option value="" disabled>Seleccione una cosecha registrada...</option>
                  {harvests.map((harvest) => (
                    <option key={harvest.id_harvest} value={harvest.name_harvest}>
                      {harvest.name_harvest} (#{harvest.id_harvest})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-bold text-amber-900 mb-1">
                  Fecha de Venta
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-amber-100 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none bg-amber-50 text-amber-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="amountOfBags" className="block text-sm font-bold text-amber-900 mb-1">
                    Sacos
                  </label>
                  <input
                    type="number"
                    id="amountOfBags"
                    name="amountOfBags"
                    value={formData.amountOfBags}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full px-4 py-2 border-2 border-amber-100 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none bg-amber-50 text-amber-900"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="pricePerBag" className="block text-sm font-bold text-amber-900 mb-1">
                    Precio c/u
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    id="pricePerBag"
                    name="pricePerBag"
                    value={formData.pricePerBag}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full px-4 py-2 border-2 border-amber-100 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none bg-amber-50 text-amber-900"
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          <button
            type="submit"
            className="cursor-pointer w-full bg-amber-800 hover:bg-amber-900 text-white font-black py-4 px-4 rounded-lg transition duration-300 shadow-lg uppercase tracking-widest mt-4 transform active:scale-[0.98]"
          >
            Finalizar Registro de Venta
          </button>
        </form>
      </div>
    </div>
  );
}