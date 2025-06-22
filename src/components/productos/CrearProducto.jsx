// src/components/CrearProducto.jsx
import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';

const CrearProducto = () => {
  const [categorias, setCategorias] = useState([]);
  const [formulario, setFormulario] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    descuento: 0,
    categoria: '',
    imagen: null
  });

    useEffect(() => {
    axios.get('categorias/')
        .then(res => setCategorias(res.data))
        .catch(err => console.error('Error al cargar categorías', err));
    }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleImagen = (e) => {
    setFormulario({ ...formulario, imagen: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(formulario).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await axios.post('productos/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Producto creado con éxito ');
      setFormulario({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        descuento: 0,
        categoria: '',
        imagen: null
      });
    } catch (error) {
      console.error('Error al crear producto:', error);
      alert('Error al crear producto');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 border rounded-xl mt-4">
      <h2 className="text-2xl font-semibold mb-4">Crear nuevo producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="nombre" value={formulario.nombre} onChange={handleChange} className="border p-2 w-full" placeholder="Nombre" required />
        <textarea name="descripcion" value={formulario.descripcion} onChange={handleChange} className="border p-2 w-full" placeholder="Descripción" required />
        <input type="number" name="precio" value={formulario.precio} onChange={handleChange} className="border p-2 w-full" placeholder="Precio" required />
        <input type="number" name="stock" value={formulario.stock} onChange={handleChange} className="border p-2 w-full" placeholder="Stock" required />
        <input type="number" name="descuento" value={formulario.descuento} onChange={handleChange} className="border p-2 w-full" placeholder="Descuento %" />
        
        <select name="categoria" value={formulario.categoria} onChange={handleChange} className="border p-2 w-full" required>
          <option value="">Selecciona una categoría</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
          ))}
        </select>

        <input type="file" name="imagen" onChange={handleImagen} className="border p-2 w-full" accept="image/*" required />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Crear Producto
        </button>
      </form>
    </div>
  );
};

export default CrearProducto;
