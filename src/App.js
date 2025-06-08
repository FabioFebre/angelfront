import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import AutorList from './components/AutorList';
import AutorForm from './components/AutorForm';
import LibroList from './components/LibroList';
import LibroForm from './components/LibroForm';

export default function App() {
  return (
    <Router>
      <div className="max-w-6xl mx-auto p-4">
        <nav className="flex gap-6 mb-6 border-b pb-3 text-lg">
          <Link to="/" className="text-blue-600 hover:underline font-semibold">Autores</Link>
          <Link to="/libros" className="text-blue-600 hover:underline font-semibold">Libros</Link>
        </nav>

        <Routes>
          {/* AUTOR CRUD */}
          <Route path="/" element={<AutorList />} />
          <Route path="/autores/nuevo" element={<AutorForm />} />
          <Route path="/autores/:id" element={<AutorForm />} />

          {/* LIBRO CRUD */}
          <Route path="/libros" element={<LibroList />} />
          <Route path="/libros/crear" element={<LibroForm />} />
          <Route path="/libros/editar/:id" element={<LibroForm />} />
        </Routes>
      </div>
    </Router>
  );
}
