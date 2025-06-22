import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria: '',
    descuento: 0,
    imagen: null,
  });

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = () => {
    axios.get('productos/')
      .then(res => setProductos(res.data))
      .catch(err => console.error(err));
  };

  const eliminarProducto = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      axios.delete(`productos/${id}/`)
        .then(() => obtenerProductos())
        .catch(err => console.error(err));
    }
  };

  const editarProducto = (producto) => {
    setModoEdicion(producto.id);
    setFormData({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      categoria: producto.categoria || '',
      descuento: producto.descuento || 0,
      imagen: null, // no prellenar imagen, se vuelve a subir si se desea
    });
  };

  const guardarCambios = () => {
    const data = new FormData();
    data.append('nombre', formData.nombre);
    data.append('descripcion', formData.descripcion);
    data.append('precio', formData.precio);
    data.append('stock', formData.stock);
    data.append('categoria', formData.categoria);
    data.append('descuento', formData.descuento);
    if (formData.imagen instanceof File) {
      data.append('imagen', formData.imagen);
    }

    axios.put(`productos/${modoEdicion}/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(() => {
        setModoEdicion(null);
        obtenerProductos();
      })
      .catch(err => console.error(err.response?.data || err));
  };

  return (
    <section className="bg-white p-6 rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4"> Administrar Productos</h2>

      {productos.map((producto) => (
        <div key={producto.id} className="border-b py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          {modoEdicion === producto.id ? (
            <div className="flex flex-col md:flex-row flex-wrap gap-2 w-full">
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="border px-2 py-1 rounded w-full md:w-1/5"
                placeholder="Nombre"
              />
              <input
                type="text"
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                className="border px-2 py-1 rounded w-full md:w-1/4"
                placeholder="Descripción"
              />
              <input
                type="number"
                value={formData.precio}
                onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                className="border px-2 py-1 rounded w-full md:w-1/6"
                placeholder="Precio"
              />
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="border px-2 py-1 rounded w-full md:w-1/6"
                placeholder="Stock"
              />
              <input
                type="number"
                value={formData.descuento}
                onChange={(e) => setFormData({ ...formData, descuento: e.target.value })}
                className="border px-2 py-1 rounded w-full md:w-1/6"
                placeholder="Descuento (%)"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, imagen: e.target.files[0] })}
                className="border px-2 py-1 rounded w-full md:w-1/4"
              />
              <button
                onClick={guardarCambios}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                💾 Guardar
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1">
                <p className="font-semibold">{producto.nombre}</p>
                <p className="text-sm text-gray-600">{producto.descripcion}</p>
                <p className="text-sm text-gray-500">Precio: S/ {producto.precio}</p>
                <p className="text-sm text-gray-500">Stock: {producto.stock}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => editarProducto(producto)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => eliminarProducto(producto.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  🗑️ Eliminar
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </section>
  );
};

export default AdminProductos;
