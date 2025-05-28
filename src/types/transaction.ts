// src/types/transaction.ts

/**
 * Define la estructura de un objeto de Transacción.
 * Asegúrate de que estas propiedades y tipos coincidan con lo que tu backend NestJS
 * devuelve para una transacción.
 */
export interface Transaction {
  id: string; // El ID único de la transacción (UUID o similar)
  orderId: string; // El ID de la orden asociada a esta transacción
  paymentMethod: string; // Ej: 'credit_card', 'paypal', 'cash'
  total_amount: number; // El monto total de la transacción. ¡Debe ser un número!
  currency: string; // Ej: 'USD', 'COP', 'EUR'
  status: 'pending' | 'completed' | 'failed' | 'refunded'; // Estado de la transacción
  transactionDate: string; // Fecha y hora de la transacción (formato ISO 8601 string)
  // Añade cualquier otra propiedad relevante que tu backend devuelva para una transacción
  // userId?: string; // Si la transacción está ligada a un usuario
  // gatewayResponse?: string; // Si hay alguna respuesta de la pasarela de pago
}

// Opcional: Si necesitas un DTO para crear transacciones desde el frontend (menos común)
// export interface CreateTransactionDto {
//   orderId: string;
//   paymentMethod: string;
//   total_amount: number;
//   currency: string;
//   // ... otras propiedades necesarias para la creación
// }