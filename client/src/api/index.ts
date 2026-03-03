import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000/api' });

// Add token to protected routes
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export const signIn = (data: any) => API.post('/auth/login', data); //
export const signUp = (data: any) => API.post('/auth/signup', data); //
export const fetchVenues = (lng: number, lat: number, radius: number, page: number) => 
    API.get(`/public/venue/${lng}/${lat}/${radius}?page=${page}&limit=20`);
export const fetchVenueById = (id: string) => API.get(`/public/venue/${id}`); //
export const createBooking = (id: string, data: any) => API.post(`/analysis/book/${id}`, data); //