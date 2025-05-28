// src/types/productTest.ts

import { BasicUser } from './user';
import { MakeupProduct } from './makeupProduct';

export interface ProductTest {
  id: string;
  tester: BasicUser; // El usuario que realizó la prueba
  product: MakeupProduct; // El producto probado
  reaction: string;
  rating: number;
  survival_status: boolean;
}

// DTOs para crear/actualizar
export interface CreateProductTestDto {
  testerId: string; // ID del tester
  productId: string; // ID del producto
  reaction: string;
  rating: number;
  survival_status: boolean;
}

export interface UpdateProductTestDto {
  testerId?: string;
  productId?: string;
  reaction?: string;
  rating?: number;
  survival_status?: boolean;
}