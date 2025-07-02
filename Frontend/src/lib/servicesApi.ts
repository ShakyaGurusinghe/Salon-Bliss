import api from './api';

export const fetchServices = () => api.get('/services');
export const createService = (serviceData: any) => api.post('/services', serviceData);
export const fetchOneService = (id: string) => api.get(`/services/${id}`);
export const updateService = (id: string, serviceData: any) => api.put(`/services/${id}`, serviceData);
export const deleteService = (id: string) => api.delete(`/services/${id}`);
export const toggleServiceStatus = (id: string, active: boolean) => 
  api.patch(`/services/${id}/status`, { active });

export type Service = {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  active: boolean;
  rating?: number;
  bookings?: number;
  createdAt?: string;
  updatedAt?: string;
};