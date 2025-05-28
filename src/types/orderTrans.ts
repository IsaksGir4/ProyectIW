// src/types/orderTrans.ts (o donde definas tus tipos)

// Enum para el estado de pago, debe coincidir con el backend
export enum PaymentStatus {
  PAID = 'Paid',
  REFUNDED = 'Refunded',
  FAILED = 'Failed',
}

// Tipo para el producto de maquillaje (puede que ya lo tengas)
export interface MakeupProduct {
  id: string;
  name: string;
  category: string;
  stock: number;
  location: string;
  durability: number;
}

// Tipo para el usuario (cliente)
export interface User {
  id: string;
  email: string;
  role: string; // Asegúrate de que esto coincida con tu entidad User
  // ... otras propiedades de usuario que necesites
}

// Tipo para la entidad de orden que viene del backend
export interface OrderTrans {
  id: string;
  client: User; // El cliente completo
  products: MakeupProduct[]; // Los productos completos
  total_amount: number;
  payment_status: PaymentStatus;
  // Puedes añadir createdAt, updatedAt si tu entidad los tiene
}

// DTO para enviar al backend al crear una orden
export interface CreateOrderTransDto {
  clientId: string;
  productIds: string[]; // Solo IDs de productos
  total_amount: number;
  payment_status: PaymentStatus;
}