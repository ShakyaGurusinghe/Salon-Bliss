import api from './api';
import axios from 'axios';

export interface Voucher {
    _id: string; 
  // id?: string;
  code: string;
  title: string;
  description: string;
  discount: number;
  type: 'percentage' | 'fixed';
  validFrom: string;
  validUntil: string;
  minSpend: number;
  maxDiscount: number | null;
  usageLimit: number;
  usedCount?: number;
  category: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const getVouchers = async (): Promise<Voucher[]> => {
  const response = await api.get('/vouchers');
  return response.data.vouchers;
};

// export const getVouchers = async (): Promise<Voucher[]> => {
//   try {
//     const response = await axios.get('/vouchers'); // or your correct route
//     console.log("Raw API response:", response.data);
//     return response.data; // ✅ NOT response.data.vouchers
//   } catch (error) {
//     console.error("getVouchers error:", error);
//     throw error;
//   }
// };



export const createVoucher = async (voucherData: Omit<Voucher, '_id'>): Promise<Voucher> => {
  const response = await api.post('/vouchers', voucherData);
  return response.data;
};

export const updateVoucher = async (id: string, voucherData: Partial<Voucher>): Promise<Voucher> => {
  const response = await api.put(`/vouchers/${id}`, voucherData);
  return response.data.voucher;
};

export const deleteVoucher = async (id: string): Promise<void> => {
  await api.delete(`/vouchers/${id}`);
};

export const getVoucherStats = async () => {
  const response = await api.get('/vouchers/stats');
  return response.data;
};