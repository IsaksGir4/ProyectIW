// src/api/productTests.ts
import axios from 'axios';
import { ProductTest, CreateProductTestDto, UpdateProductTestDto } from '../types/productTest';

const API_URL = 'http://localhost:3000/products-tests'; // Ajusta si tu backend usa '/products-tests'

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
};

export const getProductTests = async (): Promise<ProductTest[]> => {
  const response = await axios.get<ProductTest[]>(API_URL, getAuthHeaders());
  return response.data;
};

export const getProductTestById = async (id: string): Promise<ProductTest> => {
  const response = await axios.get<ProductTest>(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};

export const createProductTest = async (data: CreateProductTestDto): Promise<ProductTest> => {
  const response = await axios.post<ProductTest>(API_URL, data, getAuthHeaders());
  return response.data;
};

export const updateProductTest = async (id: string, data: UpdateProductTestDto): Promise<ProductTest> => {
  const response = await axios.patch<ProductTest>(`${API_URL}/${id}`, data, getAuthHeaders());
  return response.data;
};

export const deleteProductTest = async (id: string): Promise<{ message: string }> => {
  const response = await axios.delete<{ message: string }>(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};