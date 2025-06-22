import React, { useState } from 'react';
import axios from '../../api/axios';

const CheckoutForm = ({ carrito, onOrdenCreada, limpiarCarrito }) => {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    direccion: '',
    telefono: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const items = carrito.map(item => ({
      producto: item.producto.id,
      cantidad: item.cantidad,
    }));

    const total = carrito.reduce((acc, item) => {
      const precio = item.producto.precio;
      const descuento = item.producto.descuento || 0;
      const precioFinal = precio * (1 - descuento / 100);
      return acc + precioFinal * item.cantidad;
    }, 0);

    const datos = {
      ...form,
      total,
      items,
    };

    console.log("📦 Datos enviados:", datos);

    try {
      await axios.post('ordenes/', datos);
      alert(' Orden creada con éxito 🎉');
      onOrdenCreada(); // refrescar órdenes o cerrar modal
      limpiarCarrito(); // opcional: limpia el carrito si se pasó esta función
      setForm({ nombre: '', email: '', direccion: '', telefono: '' }); // limpia formulario
    } catch (error) {
      console.error(" Error en la orden:", error.response?.data);
      
    }
  };

  const calcularTotal = () => {
    return carrito.reduce((acc, item) => {
      const precio = item.producto.precio;
      const descuento = item.producto.descuento || 0;
      const precioFinal = precio * (1 - descuento / 100);
      return acc + precioFinal * item.cantidad;
    }, 0).toFixed(2);
  };

  return (
    <form className="p-4 space-y-3" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold">Finalizar compra</h2>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre completo"
        value={form.nombre}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={form.email}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />

      <input
        type="text"
        name="telefono"
        placeholder="Teléfono"
        value={form.telefono}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />

      <input
        type="text"
        name="direccion"
        placeholder="Dirección"
        value={form.direccion}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />

      <p className="text-lg font-semibold">
        Total a pagar: S/ {calcularTotal()}
      </p>

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
        Enviar orden
      </button>
    </form>
  );
};

export default CheckoutForm;
