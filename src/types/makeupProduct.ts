// src/types/makeupProduct.ts

export enum ProductCategory {
  LIPSTICK = 'Lipstick',
  FOUNDATION = 'foundation',
  EYESHADOW = 'eyeshadow',
  OTHER = 'other',
}

// Interfaz para un producto de maquillaje
export interface MakeupProduct {
  id: string;
  name: string;
  category: ProductCategory;
  stock: number;
  warehouse_location: string;
  durability_score: number;
  // productTests?: ProductTest[]; // Opcional, si no lo necesitas en el frontend
}

// Interfaces para DTOs (Data Transfer Objects) si las necesitas
export interface CreateMakeupProductDto {
  name: string;
  category: ProductCategory;
  stock: number;
  warehouse_location: string;
  durability_score: number;
}

export interface UpdateMakeupProductDto {
  name?: string;
  category?: ProductCategory;
  stock?: number;
  warehouse_location?: string;
  durability_score?: number;
}