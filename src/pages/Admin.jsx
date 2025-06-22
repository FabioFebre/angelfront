// src/pages/Admin.jsx
import React from 'react';
import CrearProducto from '../components/productos/CrearProducto';
import CrearCategoria from '../components/categorias/CrearCategoria';
import AdminProductos from '../components/productos/AdminProductos'; 

const Admin = () => (
  <section className="bg-white p-6 rounded-xl shadow-md">
    <h2 className="text-2xl font-bold mb-4">Panel de Administración</h2>

    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-2"> Crear Categoría</h3>
      <CrearCategoria />
    </div>

    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-2"> Crear Producto</h3>
      <CrearProducto />
    </div>

    <div>
      <AdminProductos /> {/* */}
    </div>
  </section>
);

export default Admin;
