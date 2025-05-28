// src/api/orders.ts
import axios from 'axios';
import { OrderTrans, CreateOrderTransDto, UpdateOrderTransDto } from '../types/order';

const API_URL = 'http://localhost:3000/orders'; // Asegúrate de que esta URL coincida con tu backend

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
};

export const getOrders = async (): Promise<OrderTrans[]> => {
  const response = await axios.get<OrderTrans[]>(API_URL, getAuthHeaders());
  return response.data;
};

export const getOrderById = async (id: string): Promise<OrderTrans> => {
  const response = await axios.get<OrderTrans>(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};

export const createOrder = async (data: CreateOrderTransDto): Promise<OrderTrans> => {
  const response = await axios.post<OrderTrans>(API_URL, data, getAuthHeaders());
  return response.data;
};

export const updateOrder = async (id: string, data: UpdateOrderTransDto): Promise<OrderTrans> => {
  const response = await axios.patch<OrderTrans>(`${API_URL}/${id}`, data, getAuthHeaders());
  return response.data;
};

export const deleteOrder = async (id: string): Promise<{ message: string }> => {
  const response = await axios.delete<{ message: string }>(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};