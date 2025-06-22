// src/components/CrearCategoria.jsx
import React, { useState } from 'react';
import axios from '../../api/axios';

const CrearCategoria = () => {
  const [nombre, setNombre] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('categorias/', { nombre });
      alert('Categoría creada con éxito');
      setNombre('');
    } catch (error) {
      console.error('Error al crear categoría:', error);
      alert('Error al crear categoría');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-xl mb-6">
      <h2 className="text-xl font-semibold mb-2">Crear nueva categoría</h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre de categoría"
          required
          className="border p-2 flex-1"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Crear
        </button>
      </form>
    </div>
  );
};

export default CrearCategoria;
