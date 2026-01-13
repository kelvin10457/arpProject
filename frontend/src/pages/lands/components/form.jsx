import { useState } from "react";

export default function Form( {onRefresh} ) {
  const [formData, setFormData] = useState({
    nameLand: '',
    description: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/lands`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onRefresh(); //re-renderiza al padre
        setFormData({
          nameLand: '',
          description: ''
        })
      }
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl border-t-8 border-amber-800 p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-amber-900 mb-2">
            Registro de Terrenos
          </h2>
          <p className="text-amber-700 font-medium">
            Ingrese la información detallada del nuevo lote o terreno.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nameLand" className="block text-sm font-bold text-amber-900 mb-1">
              Nombre del Lote
            </label>
            <input
              type="text"
              id="nameLand"
              name="nameLand"
              value={formData.nameLand}
              onChange={handleChange}
              placeholder="Ej. Terreno Sector Norte"
              className="w-full px-4 py-2 border-2 border-amber-100 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none bg-amber-50 text-amber-900 transition-all"
              required
            />
          </div>

          {/* Variable: description */}
          <div>
            <label htmlFor="description" className="block text-sm font-bold text-amber-900 mb-1">
              Descripción del Lote
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Detalles sobre el suelo, ubicación o estado..."
              rows="4"
              className="w-full px-4 py-2 border-2 border-amber-100 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none bg-amber-50 text-amber-900 transition-all resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full bg-amber-800 hover:bg-amber-900 text-white font-black py-3 px-4 rounded-lg transition duration-300 shadow-lg uppercase tracking-widest mt-4 transform active:scale-[0.98]"
          >
            Registrar Terreno
          </button>
        </form>
      </div>
    </div>
  );
}