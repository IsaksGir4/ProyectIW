// src/services/orderService.ts
import axios from 'axios';
import { OrderTrans, CreateOrderTransDto } from '../types/orderTrans'; // Asegúrate de que la ruta sea correcta
import { MakeupProduct } from '../types/orderTrans'; // Importa también MakeupProduct
import { User } from 'src/users/entities/user.entity';

const API_URL = 'http://localhost:3000/orders'; // La URL de tu controlador de órdenes

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken'); // Recupera el token de autenticación
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
};
export const getOrders = async (): Promise<OrderTrans[]> => {
  const response = await axios.get(API_URL, getAuthHeaders());
  return response.data;
};

export const createOrder = async (orderData: CreateOrderTransDto): Promise<OrderTrans> => {
  const response = await axios.post(API_URL, orderData, getAuthHeaders());
  return response.data;
};

export const deleteOrder = async (id: string): Promise<{ message: string }> => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};

// Función para obtener productos de maquillaje (necesaria para el modal de creación de orden)
// Puedes mover esto a un makeupProductService.ts si lo tienes separado
const PRODUCTS_API_URL = 'http://localhost:3000/makeup-products';
export const getMakeupProducts = async (): Promise<MakeupProduct[]> => {
  const response = await axios.get(PRODUCTS_API_URL, getAuthHeaders());
  return response.data;
};

// Función para obtener usuarios (necesaria para el modal de creación de orden)
const USERS_API_URL = 'http://localhost:3000/users';
export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get(USERS_API_URL, getAuthHeaders());
  return response.data;
};