// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backangel.onrender.com/api/',
  withCredentials: true, // Enviar cookies para login y autorización
});

// ─── AUTENTICACIÓN ────────────────────────────────
export const register = (data) => api.post('/register/', data);
export const login = (data) => api.post('/login/', data);
export const logout = () => api.post('/logout/');
export const getUser = () => api.get('/user/');
export const getCSRFToken = () => api.get('/csrf-cookie/'); // si tu backend lo usa

// ─── CATEGORÍAS ─────────────────────────────────────
export const getCategorias = () => api.get('/categorias/');
export const getCategoria = (id) => api.get(`/categorias/${id}/`);
export const createCategoria = (data) => api.post('/categorias/', data);
export const updateCategoria = (id, data) => api.put(`/categorias/${id}/`, data);
export const deleteCategoria = (id) => api.delete(`/categorias/${id}/`);

// ─── PRODUCTOS ─────────────────────────────────────
export const getProductos = () => api.get('/productos/');
export const getProducto = (id) => api.get(`/productos/${id}/`);
export const createProducto = (data) => api.post('/productos/', data);
export const updateProducto = (id, data) => api.put(`/productos/${id}/`, data);
export const deleteProducto = (id) => api.delete(`/productos/${id}/`);

// ─── ORDENES ─────────────────────────────────────
export const getOrdenes = () => api.get('/ordenes/');
export const createOrden = (data) => api.post('/ordenes/', data);
export const updateOrden = (id, data) => api.put(`/ordenes/${id}/`, data);
export const deleteOrden = (id) => api.delete(`/ordenes/${id}/`);
