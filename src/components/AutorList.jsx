import React, { useEffect, useState } from 'react';
import { getAutores, deleteAutor } from '../api';
import { Link } from 'react-router-dom';
import { Pencil, Trash2, Plus, BookPlus } from 'lucide-react';

export default function AutorList() {
  const [autores, setAutores] = useState([]);

  useEffect(() => {
    getAutores().then((res) => setAutores(res.data));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este autor?')) {
      await deleteAutor(id);
      setAutores((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto font-body text-gray-800">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Autores</h1>
        <Link
          to="/autores/nuevo"
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg shadow transition-all"
        >
          <Plus size={18} />
          Nuevo Autor
        </Link>
      </div>

      {/* Lista de autores */}
      {autores.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-24">
          No hay autores registrados aún.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {autores.map((autor) => (
            <div
              key={autor.id}
              className="bg-white rounded-2xl shadow hover:shadow-xl p-6 flex flex-col items-center text-center transition-all"
            >
              <img
                src={autor.foto}
                alt={autor.nombre}
                className="w-32 h-32 object-cover rounded-full border-4 border-primary-100 shadow mb-4"
              />
              <h2 className="text-xl font-semibold mb-1">{autor.nombre}</h2>
              <p className="text-sm text-gray-500 mb-4">{autor.nacionalidad}</p>

              <div className="flex flex-col gap-2 w-full">
                <Link
                  to={`/autores/${autor.id}`}
                  className="btn-crud bg-yellow-400 hover:bg-yellow-500 text-white"
                >
                  <Pencil size={16} />
                  Editar
                </Link>
                <Link
                  to={`/autores/${autor.id}/agregar-libro`}
                  className="btn-crud bg-primary-500 hover:bg-primary-600 text-white"
                >
                  <BookPlus size={16} />
                  Agregar Libro
                </Link>
                <button
                  onClick={() => handleDelete(autor.id)}
                  className="btn-crud bg-red-500 hover:bg-red-600 text-white"
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
