import { useState, useEffect } from 'react';

export default function Form({ onRefresh }) {
  const [formData, setFormData] = useState({
    nameClasification: '',
    min: 0,
    max: 0,
    nameHarvest: ''
  });

  const [harvests,setHarvests] = useState([]);
    async function fetchHarvest(){
      try {
          const response = await fetch("http://localhost:3000/api/harvest");
          const data = await response.json();
          setHarvests(data)
      }
      catch(error){
          alert(`there was an error: ${error}`);
      }
    }

    useEffect(()=> {
      fetchHarvest();
    },[]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Validación de lógica
    if (Number(formData.min) > Number(formData.max) || Number(formData.min) < 0 || Number(formData.max) < 0) {
      alert("El valor mínimo no puede ser mayor al máximo y ninguno puede ser negativo");
      return;
    }

    // Preparar payload con tipos numéricos correctos
    const payload = {
      nameClasification: formData.nameClasification,
      min: Number(formData.min),
      max: Number(formData.max),
      nameHarvest: formData.nameHarvest
    };

    try {
      const res = await fetch('http://localhost:3000/api/clasification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        onRefresh();
        // reset form
        setFormData({ nameClasification: '', min: 0, max: 0, nameHarvest: '' });
      } else {
        alert(data.error || 'Error creando la clasificación');
      }
    } catch (error) {
      alert(`Error de red: ${error.message}`);
    }
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl border-t-8 border-amber-800 p-8">
        <header className="mb-8">
          <h2 className="text-3xl font-extrabold text-amber-900 mb-2">
            Registro Clasificación
          </h2>
          <p className="text-amber-700 font-medium">
            Define los límites y el nombre de la categoría de clasificación.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Variable: nameClasification */}
          <div>
            <label htmlFor="nameClasification" className="block text-sm font-bold text-amber-900 mb-1">
              Nombre de la Clasificación
            </label>
            <input
              type="text"
              id="nameClasification"
              name="nameClasification"
              value={formData.nameClasification}
              onChange={handleChange}
              placeholder="Ej. Calidad Premium"
              className="w-full px-4 py-2 border-2 border-amber-100 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none bg-amber-50 text-amber-900 transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="nameHarvest" className="block text-sm font-bold text-amber-900 mb-1">
              Nombre de la Cosecha a la que se agrega Clasifica
            </label>
            <select
              id="nameHarvest"
              name="nameHarvest"
              value={formData.nameHarvest}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-amber-100 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none bg-amber-50 text-amber-900 transition-all cursor-pointer"
              required
            >
              <option value="" disabled>Seleccione un lote...</option>
              {harvests.map((harvest, index) => (
                <option key={harvest.id_harvest} value={harvest.name_harvest}>{harvest.name_harvest}</option>
              ))}
            </select>
          </div>

          {/* Two Columns: min and max */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="min" className="block text-sm font-bold text-amber-900 mb-1">
                Valor Mínimo
              </label>
              <input
                type="number"
                id="min"
                name="min"
                value={formData.min}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-amber-100 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none bg-amber-50 text-amber-900"
                required
              />
            </div>

            <div>
              <label htmlFor="max" className="block text-sm font-bold text-amber-900 mb-1">
                Valor Máximo
              </label>
              <input
                type="number"
                id="max"
                name="max"
                value={formData.max}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-amber-100 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none bg-amber-50 text-amber-900"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-800 hover:bg-amber-900 text-white font-black py-3 px-4 rounded-lg transition duration-300 shadow-lg uppercase tracking-widest mt-4 cursor-pointer"
          >
            Guardar Configuración
          </button>
        </form>
      </div>
    </div>
  );
}