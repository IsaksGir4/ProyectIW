// src/types/order.ts

import { BasicUser } from './user';
import { MakeupProduct } from './makeupProduct';

export enum PaymentStatus {
  PAID = 'Paid',
  REFUNDED = 'Refunded',
  FAILED = 'Failed',
}

export interface OrderTrans {
  id: string;
  client: BasicUser; // El cliente que realizó la orden
  products: MakeupProduct[]; // Los productos en la orden (solo información esencial)
  total_amount: number;
  payment_status: PaymentStatus;
}

// DTOs para crear/actualizar
export interface CreateOrderTransDto {
  clientId: string; // Necesitarás el ID del cliente
  productIds: string[]; // IDs de los productos
  total_amount: number;
  payment_status: PaymentStatus;
}

export interface UpdateOrderTransDto {
  clientId?: string;
  productIds?: string[];
  total_amount?: number;
  payment_status?: PaymentStatus;
}