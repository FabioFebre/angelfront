// src/components/AutorForm.jsx
import React, { useEffect, useState } from 'react';
import { createAutor, getAutor, updateAutor } from '../api';
import { useNavigate, useParams } from 'react-router-dom';

export default function AutorForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    nacionalidad: '',
    fecha_nacimiento: '',
    foto: null,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getAutor(id).then(res => {
        setFormData({
          nombre: res.data.nombre,
          nacionalidad: res.data.nacionalidad,
          fecha_nacimiento: res.data.fecha_nacimiento,
          foto: null, // No se prellena la foto
        });
      });
    }
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    setFormData(prev => ({ ...prev, foto: e.target.files[0] }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append('nombre', formData.nombre);
    data.append('nacionalidad', formData.nacionalidad);
    data.append('fecha_nacimiento', formData.fecha_nacimiento);
    if (formData.foto) data.append('foto', formData.foto);

    if (id) {
      await updateAutor(id, data);
    } else {
      await createAutor(data);
    }
    navigate('/');
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">{id ? 'Editar Autor' : 'Nuevo Autor'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" className="w-full border p-2 rounded" />
        <input name="nacionalidad" value={formData.nacionalidad} onChange={handleChange} placeholder="Nacionalidad" className="w-full border p-2 rounded" />
        <input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="file" onChange={handleFileChange} className="w-full border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {id ? 'Actualizar' : 'Crear'}
        </button>
      </form>
    </div>
  );
}
