// src/services/userService.ts
import axios from 'axios';
import { BasicUser, CreateUserDto, UpdateUserDto } from '../types/user'; // Importa los tipos de usuario

const API_URL = 'http://localhost:3000/users'; // URL de tu controlador de usuarios en el backend

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
};

export const getUsers = async (): Promise<BasicUser[]> => {
  console.log('userService.ts - getUsers: Haciendo solicitud para obtener usuarios.');
  const response = await axios.get<BasicUser[]>(API_URL, getAuthHeaders());
  return response.data;
};

export const getUserById = async (id: string): Promise<BasicUser> => {
  console.log(`userService.ts - getUserById: Haciendo solicitud para obtener usuario con ID: ${id}`);
  const response = await axios.get<BasicUser>(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};

export const createUser = async (userData: CreateUserDto): Promise<BasicUser> => {
  console.log('userService.ts - createUser: Haciendo solicitud POST para crear usuario.');
  const response = await axios.post<BasicUser>(API_URL, userData, getAuthHeaders());
  return response.data;
};

export const updateUser = async (id: string, userData: UpdateUserDto): Promise<BasicUser> => {
  console.log(`userService.ts - updateUser: Haciendo solicitud PATCH para actualizar usuario con ID: ${id}`);
  const response = await axios.patch<BasicUser>(`${API_URL}/${id}`, userData, getAuthHeaders());
  return response.data;
};

export const deleteUser = async (id: string): Promise<{ message: string }> => {
  console.log(`userService.ts - deleteUser: Haciendo solicitud DELETE para eliminar usuario con ID: ${id}`);
  const response = await axios.delete<{ message: string }>(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};