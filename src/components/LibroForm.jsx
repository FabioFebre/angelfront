import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createLibro, getLibros, updateLibro, getAutores } from '../api';

export default function LibroForm() {
  const [form, setForm] = useState({
    titulo: '',
    genero: '',
    año: '',
    portada: null, // ahora es archivo
    autor: '',
  });

  const [autores, setAutores] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getLibros().then((res) => {
        const libro = res.data.find((l) => l.id === parseInt(id));
        if (libro) {
          // Nota: no cargamos imagen en form, solo los campos editables
          setForm({
            titulo: libro.titulo,
            genero: libro.genero,
            año: libro.año,
            portada: null,
            autor: libro.autor,
          });
        }
      });
    }

    getAutores().then((res) => setAutores(res.data));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'portada') {
      setForm({ ...form, portada: files[0] }); // Guardar archivo
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('titulo', form.titulo);
    formData.append('genero', form.genero);
    formData.append('año', form.año);
    formData.append('autor', form.autor);
    if (form.portada) {
      formData.append('portada', form.portada);
    }

    try {
      if (id) {
        await updateLibro(id, formData);
      } else {
        await createLibro(formData);
      }
      navigate('/libros');
    } catch (error) {
      console.error('Error al guardar libro:', error);
      alert('Error al guardar. Revisa los campos.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow max-w-xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Editar Libro' : 'Crear Libro'}</h2>

      <input
        type="text"
        name="titulo"
        value={form.titulo}
        onChange={handleChange}
        placeholder="Título"
        className="border p-2 w-full rounded"
        required
      />

      <input
        type="text"
        name="genero"
        value={form.genero}
        onChange={handleChange}
        placeholder="Género"
        className="border p-2 w-full rounded"
        required
      />

      <input
        type="number"
        name="año"
        value={form.año}
        onChange={handleChange}
        placeholder="Año"
        className="border p-2 w-full rounded"
        required
      />

      <input
        type="file"
        name="portada"
        onChange={handleChange}
        className="border p-2 w-full rounded"
        accept="image/*"
      />

      <select
        name="autor"
        value={form.autor}
        onChange={handleChange}
        className="border p-2 w-full rounded"
        required
      >
        <option value="">Selecciona un autor</option>
        {autores.map((autor) => (
          <option key={autor.id} value={autor.id}>
            {autor.nombre}
          </option>
        ))}
      </select>

      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full">
        {id ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
}
