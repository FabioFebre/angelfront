// src/api.js
import axios from 'axios';

// Asegúrate de tener esta definición
const api = axios.create({
  baseURL: 'https://angelback.onrender.com/api/',
});

// Funciones para Autores
export const getAutores = () => api.get('/autores/');
export const getAutor = (id) => api.get(`/autores/${id}/`);
export const createAutor = (data) => api.post('/autores/', data);
export const updateAutor = (id, data) => api.put(`/autores/${id}/`, data);
export const deleteAutor = (id) => api.delete(`/autores/${id}/`);

// Funciones para Libros
export const getLibros = () => api.get('/libros/');
export const getLibro = (id) => api.get(`/libros/${id}/`);
export const createLibro = (data) => api.post('/libros/', data);
export const updateLibro = (id, data) => api.put(`/libros/${id}/`, data);
export const deleteLibro = (id) => api.delete(`/libros/${id}/`);
