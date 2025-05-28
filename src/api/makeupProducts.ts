// src/api/makeupProducts.ts
import axios from 'axios';
import { MakeupProduct, CreateMakeupProductDto, UpdateMakeupProductDto } from '../types/makeupProduct';

const API_URL = 'http://localhost:3000/makeup-products'; // Asegúrate de que esta URL coincida con tu backend

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken'); // Recupera el token de autenticación
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
};

export const getMakeupProducts = async (): Promise<MakeupProduct[]> => {
  const response = await axios.get<MakeupProduct[]>(API_URL, getAuthHeaders());
  return response.data;
};

export const getMakeupProductById = async (id: string): Promise<MakeupProduct> => {
  const response = await axios.get<MakeupProduct>(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};

export const createMakeupProduct = async (data: CreateMakeupProductDto): Promise<MakeupProduct> => {
  const response = await axios.post<MakeupProduct>(API_URL, data, getAuthHeaders());
  return response.data;
};

export const updateMakeupProduct = async (id: string, data: UpdateMakeupProductDto): Promise<MakeupProduct> => {
  const response = await axios.patch<MakeupProduct>(`${API_URL}/${id}`, data, getAuthHeaders());
  return response.data;
};

export const deleteMakeupProduct = async (id: string): Promise<{ message: string }> => {
  const response = await axios.delete<{ message: string }>(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};