import React, { useState } from 'react';
import ListaProductos from '../components/productos/ListaProductos';
import Carrito from '../components/carrito/Carrito';
import CheckoutForm from '../components/carrito/CheckoutForm';
import Comentarios from '../components/Comentarios';

function Home() {
  const [carrito, setCarrito] = useState([]);
  const [modalCarrito, setModalCarrito] = useState(false);
  const [busqueda, setBusqueda] = useState('');

  const agregarAlCarrito = (producto) => {
    const index = carrito.findIndex(i => i.producto.id === producto.id);
    if (index !== -1) {
      const actualizado = [...carrito];
      actualizado[index].cantidad += 1;
      setCarrito(actualizado);
    } else {
      setCarrito([...carrito, {
        producto,
        cantidad: 1,
        precio_unitario: producto.precio_final,
      }]);
    }
  };

  const cambiarCantidad = (index, nuevaCantidad) => {
    if (nuevaCantidad <= 0) return;
    const actualizado = [...carrito];
    actualizado[index].cantidad = nuevaCantidad;
    setCarrito(actualizado);
  };

  const eliminarItem = (index) => {
    const actualizado = carrito.filter((_, i) => i !== index);
    setCarrito(actualizado);
  };

  const limpiarCarrito = () => setCarrito([]);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Banner de contacto */}
      <header className="bg-blue-100 py-4 text-center shadow">
        <p className="text-blue-900 font-medium">
          ¿Tienes dudas? Contáctanos al 📞 999-888-777 o por WhatsApp 💬
        </p>
      </header>

      {/* Contenedor principal */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Barra de búsqueda */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="🔍 Buscar producto..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md shadow-sm"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        {/* Lista de productos */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            🧾 Productos disponibles
          </h2>
          <ListaProductos onAgregarAlCarrito={agregarAlCarrito} busqueda={busqueda} />
        </section>

        {/* Comentarios */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">💬 Opiniones</h2>
          <Comentarios />
        </section>
      </div>

      {/* Botón flotante Ver Carrito */}
      <button
        onClick={() => setModalCarrito(true)}
        className="fixed bottom-6 right-6 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-full shadow-lg z-40"
      >
        🛒 Ver Carrito ({carrito.length})
      </button>

      {/* Modal Carrito y Checkout */}
      {modalCarrito && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto px-4 py-10">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-4xl relative">
            <button
              onClick={() => setModalCarrito(false)}
              className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-black"
            >
              &times;
            </button>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">🛒 Tu carrito</h2>
                <Carrito
                  carrito={carrito}
                  onCambiarCantidad={cambiarCantidad}
                  onEliminarItem={eliminarItem}
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">💳 Finalizar compra</h2>
                <CheckoutForm
                  carrito={carrito}
                  onOrdenCreada={() => {
                    limpiarCarrito();
                    setModalCarrito(false);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;
