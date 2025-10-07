import axios from "axios";

const API_BASE = "http://localhost:8000/api"; // URL پروژه Django

export const getAuthors = () => axios.get(`${API_BASE}/authors/`);
export const getPublishers = () => axios.get(`${API_BASE}/publishers/`);
export const getCategories = () => axios.get(`${API_BASE}/categories/`);

export const getBooks = () => axios.get(`${API_BASE}/books/`);
export const addBook = (data)=>axios.post(`${API_BASE}/books/`,data);
export const updateBook = (id, data)=>axios.put(`${API_BASE}/book/${id}/`, data);
export const deleteBook =(id)=>axios.delete(`${API_BASE}/book/${id}/`); 

export const getMembers = () => axios.get(`${API_BASE}/members/`);
export const getLibrarians = () => axios.get(`${API_BASE}/librarians/`);
export const getLoans = () => axios.get(`${API_BASE}/loans/`);
export const getReservations = () => axios.get(`${API_BASE}/reservations/`);
export const getReviews = () => axios.get(`${API_BASE}/reviews/`);
export const getEvents = () => axios.get(`${API_BASE}/events/`);

