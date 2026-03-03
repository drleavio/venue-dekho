import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Automatically attach JWT token to protected requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: (data: any) => API.post('/auth/login', data),
  signup: (data: any) => API.post('/auth/signup', data),
  googleAuth: (idToken: string) => API.post('/auth/google', { idToken }),
};

export const venueApi = {
  getVenues: (lat: number, lng: number, radius: number) => 
    API.get(`/public/venue/${lng}/${lat}/${radius}`),
  getVenueById: (id: string) => API.get(`/public/venue/${id}`),
};

export const clientApi = {
  getDashboard: () => API.get('/analysis/analysis'),
  addVenue: (data: any) => API.post('/analysis/add', data),
  bookVenue: (id: string, data: any) => API.post(`/analysis/book/${id}`, data),
};