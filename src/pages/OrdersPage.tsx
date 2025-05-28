// src/pages/OrdersPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { OrderTrans, PaymentStatus } from '../types/order'; // Importa Order y PaymentStatus
import { API_BASE_URL } from '../config';
import Button from '../components/ui/button'; // Asegúrate de la importación correcta de Button

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderTrans[]>([]); // Usa el tipo Order
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('No authentication token found.');
        setLoading(false);
        return;
      }

      // Asegúrate de que esta URL sea la correcta para obtener ÓRDENES en tu backend
      const response = await axios.get<OrderTrans[]>(`${API_BASE_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Mapea y convierte `total_amount` a número si viene como string
      setOrders(response.data.map(order => ({
        ...order,
        total_amount: Number(order.total_amount)
      })));

    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar las órdenes.');
      console.error('Error fetching orders:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // ... (otras funciones como handleOpenCreateModal, handleSubmit, etc. si tienes) ...

  if (loading) return <div className="text-center p-8">Cargando órdenes...</div>;
  if (error && !orders.length) return <div className="text-center p-8 text-red-600">Error: {error}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Gestión de Órdenes</h1>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

      {orders.length === 0 ? (
        <div className="text-center text-gray-600 p-8 border border-gray-300 rounded-lg shadow-md">
          <p className="text-xl mb-4">No hay órdenes registradas.</p>
          {/* <Button onClick={handleOpenCreateModal}>Crear primera orden</Button> */}
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CLIENTE</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PRODUCTOS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MONTO TOTAL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ESTADO PAGO</th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FECHA</th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.client?.email || order.client?.name || 'N/A'}</td> {/* Muestra el email o nombre del cliente */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.products.map(p => p.name).join(', ')} {/* Muestra nombres de productos */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.total_amount != null ? order.total_amount.toFixed(2) : '0.00'} {/* Aplicar toFixed de forma segura */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.payment_status}</td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {/* Botones de acción, ej. Ver detalles, Actualizar estado, etc. */}
                    {/* <Button onClick={() => handleEditOrder(order)} className="text-blue-600 hover:text-blue-900 mr-2 bg-blue-100 px-3 py-1 rounded">
                      Editar
                    </Button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;