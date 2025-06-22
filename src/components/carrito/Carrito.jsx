// src/components/Carrito.jsx
import React from 'react';

const Carrito = ({ carrito, onCambiarCantidad, onEliminarItem }) => {
  const total = carrito.reduce((acc, item) => acc + item.cantidad * item.precio_unitario, 0);

  return (
    <div className="p-4 border-t">
      <h2 className="text-xl font-semibold">Carrito</h2>
      {carrito.map((item, index) => (
        <div key={index} className="flex justify-between items-center my-2">
          <div>
            <p>{item.producto.nombre}</p>
            <small>Talla: {item.talla}</small>
            <div className="flex items-center space-x-2">
              <button onClick={() => onCambiarCantidad(index, item.cantidad - 1)}>-</button>
              <span>{item.cantidad}</span>
              <button onClick={() => onCambiarCantidad(index, item.cantidad + 1)}>+</button>
            </div>
          </div>
          <div>
            <p>S/ {(item.precio_unitario * item.cantidad).toFixed(2)}</p>
            <button onClick={() => onEliminarItem(index)} className="text-red-500 text-sm">Eliminar</button>
          </div>
        </div>
      ))}
      <hr />
      <p className="font-bold mt-2">Total: S/ {total.toFixed(2)}</p>
    </div>
  );
};

export default Carrito;
//asdasd