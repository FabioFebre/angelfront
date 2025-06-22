import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';

const ListaProductos = ({ onAgregarAlCarrito, busqueda }) => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

  useEffect(() => {
    axios.get('productos/')
      .then(res => setProductos(res.data))
      .catch(err => console.error(err));

    axios.get('categorias/')
      .then(res => setCategorias(res.data))
      .catch(err => console.error(err));
  }, []);

  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
    (categoriaSeleccionada === '' || producto.categoria?.nombre === categoriaSeleccionada)
  );

  const recomendados = productos.slice(0, 4);

  return (
    <>
      {/* Filtro por categoría */}
      <div className="mb-4 flex justify-center">
        <select
          className="border px-3 py-2 rounded"
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
          ))}
        </select>
      </div>

      {/* Lista de productos */}
      <div className="grid md:grid-cols-3 gap-4 p-4">
        {productosFiltrados.map(producto => (
          <div key={producto.id} className="border rounded-xl p-4 shadow">
            <img src={producto.imagen} alt={producto.nombre} className="w-full h-48 object-cover rounded" />
            <h2 className="text-lg font-bold">{producto.nombre}</h2>
            <p className="text-sm text-gray-600">{producto.descripcion}</p>
            <p className="text-sm text-gray-500">Stock: {producto.stock}</p>
            {producto.descuento > 0 ? (
              <>
                <p className="line-through text-red-400">S/ {producto.precio}</p>
                <p className="text-green-600 font-bold">S/ {producto.precio_final.toFixed(2)}</p>
              </>
            ) : (
              <p className="font-bold">S/ {producto.precio}</p>
            )}
            <button
              onClick={() => onAgregarAlCarrito(producto)}
              disabled={producto.stock === 0}
              className={`mt-2 px-3 py-1 rounded text-white ${producto.stock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}`}
            >
              {producto.stock === 0 ? 'Agotado' : 'Agregar al carrito'}
            </button>
          </div>
        ))}
      </div>

      {/* Recomendaciones */}
      <h3 className="text-xl font-semibold mt-10 mb-4 text-center"> También te pueden interesar:</h3>
      <div className="grid md:grid-cols-4 gap-4 p-4">
        {recomendados.map(prod => (
          <div key={prod.id} className="bg-gray-50 p-3 rounded shadow text-center">
            <img src={prod.imagen} alt={prod.nombre} className="w-full h-32 object-cover rounded mb-2" />
            <p className="text-sm font-medium">{prod.nombre}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListaProductos;
