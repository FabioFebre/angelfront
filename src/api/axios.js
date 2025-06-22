// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://backangel.onrender.com/api/',
  withCredentials: true,
});

export default instance;
