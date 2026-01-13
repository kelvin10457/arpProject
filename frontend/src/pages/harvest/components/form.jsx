import React, { useState } from 'react';

export default function Form({ onRefresh }) {
  const [formData, setFormData] = useState({
    nameHarvest: '',
    date: '',
    amountOfBags: 0,
    pricePerBag: 0,
    nameLand: ''
  });

  const [lands,setLands] = useState([]);
  async function fetchLands(){
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/lands`);
            const data = await response.json();
            setLands(data)
        }
        catch(error){
            alert(`there was an error: ${error}`);
        }
    }

    useState(()=> {
      fetchLands();
    },[])

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/harvest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onRefresh(); //re-renderiza al padre
        setFormData({
          nameHarvest: '',
          date: '',
          amountOfBags: 0,
          pricePerBag: 0,
          nameLand: ''
        })
      }
    } catch (error) {
      alert("Error al guardar:", error);
    }
  }

  function handleChange(e) {
    const { name, value, type } = e.target;
    
    const finalValue = type === 'number' ? parseFloat(value) : value;

    setFormData({ 
      ...formData, 
      [name]: finalValue 
    });
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl border-t-8 border-amber-800 p-8">
        <h2 className="text-3xl font-extrabold text-amber-900 mb-2">
          Registro de Cosecha
        </h2>
        <p className="text-amber-700 mb-8 font-medium">Complete la información del lote actual.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nameHarvest" className="block text-sm font-bold text-amber-900 mb-1">
                  Nombre de la Cosecha
            </label>
            <input
              type="text"
              id="nameHarvest"
              name="nameHarvest"
              value={formData.nameHarvest}
              onChange={handleChange}
              placeholder="Cosecha de Invierno 2025"
              className="w-full px-4 py-2 border-2 border-amber-100 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none bg-amber-50 text-amber-900"
              required
            />
          </div>

          {/* Select: nameLand */}
          <div>
            <label htmlFor="nameLand" className="block text-sm font-bold text-amber-900 mb-1">
              Nombre del Lote de la Cosecha
            </label>
            <select
              id="nameLand"
              name="nameLand"
              value={formData.nameLand}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-amber-100 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none bg-amber-50 text-amber-900 transition-all cursor-pointer"
              required
            >
              <option value="" disabled>Seleccione un lote...</option>
              {lands.map((land, index) => (
                <option key={index} value={land.name_land}>{land.name_land}</option>
              ))}
            </select>
          </div>

          {/* Date: date */}
          <div>
            <label htmlFor="date" className="block text-sm font-bold text-amber-900 mb-1">
              Fecha de Ingreso
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Number: amountOfBags */}
            <div>
              <label htmlFor="amountOfBags" className="block text-sm font-bold text-amber-900 mb-1">
                Cantidad de Sacos
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

            {/* Number: pricePerBag */}
            <div>
              <label htmlFor="pricePerBag" className="block text-sm font-bold text-amber-900 mb-1">
                Precio por Saco
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-amber-700 font-bold">$</span>
                <input
                  type="number"
                  step="0.01"
                  id="pricePerBag"
                  name="pricePerBag"
                  value={formData.pricePerBag}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-2 border-2 border-amber-100 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none bg-amber-50 text-amber-900"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="cursor-pointer w-full bg-amber-800 hover:bg-amber-900 text-white font-black py-3 px-4 rounded-lg transition duration-300 shadow-lg uppercase tracking-widest mt-4"
          >
            Registrar Cosecha
          </button>
        </form>
      </div>
    </div>
  );
};
