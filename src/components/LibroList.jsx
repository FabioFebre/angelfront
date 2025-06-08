// src/components/LibroList.jsx
import React, { useEffect, useState } from 'react';
import { getLibros, deleteLibro } from '../api';
import { Link } from 'react-router-dom';
import { Pencil, Trash2, Plus } from 'lucide-react';

export default function LibroList() {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLibros()
      .then((response) => {
        console.log("Libros recibidos desde API:", response.data);
        setLibros(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar libros:", err);
        setLibros([]);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este libro?")) {
      try {
        await deleteLibro(id);
        setLibros(libros.filter((libro) => libro.id !== id));
      } catch (err) {
        console.error("Error al eliminar libro:", err);
      }
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Libros</h2>
        <Link
          to="/libros/crear"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition duration-200"
        >
          <Plus size={18} />
          Nuevo Libro
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 text-lg mt-24">Cargando libros...</p>
      ) : libros.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-24">No hay libros registrados aún.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {libros.map((libro) => (
            <div
              key={libro.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4"
            >
              <img
                src={libro.portada}
                alt={libro.titulo}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{libro.titulo}</h3>
              <p className="text-sm text-gray-600 mb-1">Género: {libro.genero}</p>
              <p className="text-sm text-gray-600 mb-4">Año: {libro.año}</p>

              <div className="flex gap-3">
                <Link
                  to={`/libros/editar/${libro.id}`}
                  className="flex items-center gap-1 text-sm px-3 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md font-medium"
                >
                  <Pencil size={16} />
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(libro.id)}
                  className="flex items-center gap-1 text-sm px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium"
                >
                  <Trash2 size={16} />
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
