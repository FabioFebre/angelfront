// src/components/Comentarios.jsx
import React, { useState } from 'react';

const Comentarios = () => {
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');

  const agregarComentario = () => {
    if (nuevoComentario.trim() === '') return;

    setComentarios([...comentarios, {
      id: Date.now(),
      texto: nuevoComentario,
    }]);

    setNuevoComentario('');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-3"></h2>

      <input
        type="text"
        placeholder="Escribe tu comentario..."
        value={nuevoComentario}
        onChange={(e) => setNuevoComentario(e.target.value)}
        className="border border-gray-300 px-4 py-2 w-full rounded mb-2"
      />

      <button
        onClick={agregarComentario}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Agregar Comentario
      </button>

      <ul className="mt-4 space-y-2">
        {comentarios.map((comentario) => (
          <li key={comentario.id} className="bg-gray-100 p-3 rounded">
            {comentario.texto}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comentarios;
