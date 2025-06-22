import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen p-6">
        <header className="text-center mb-4">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Tienda de electrodomésticos</h1>
          <nav className="flex justify-center gap-4 text-blue-700 underline">
            <Link to="/"> Inicio</Link>
            <Link to="/admin">Administrar</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
