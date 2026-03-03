import axios from 'axios';

// Use your machine's IP address instead of localhost for physical device testing
const BASE_URL = 'http://192.168.x.x:3000/api'; 

const api = axios.create({ baseURL: BASE_URL });

export const fetchVenues = async (lat: number, lng: number, radius: number) => {
  const response = await api.get(`/public/venue/${lng}/${lat}/${radius}`);
  return response.data;
};

export const createBooking = async (id: string, bookingDetails: any, token: string) => {
  const response = await api.post(`/analysis/book/${id}`, bookingDetails, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};