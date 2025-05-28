// src/pages/TransactionsPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { OrderTrans, PaymentStatus } from '../types/order'; // <--- ¡Importa Order y PaymentStatus!
import { API_BASE_URL } from '../config'; // Tu URL base de la API
import Button from '../components/ui/button'; // Asegúrate de la importación correcta de Button

const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<OrderTrans[]>([]); // Usa el tipo Order
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('No authentication token found.');
        setLoading(false);
        return;
      }

      // Asegúrate de que esta URL sea la correcta para obtener TRANSACCIONES/ORDENES en tu backend
      // Si tu controlador de transacciones expone las mismas OrderTrans, la URL es clave.
      // Podría ser `/orders` o `/transactions` dependiendo de cómo lo tengas en el backend.
      const response = await axios.get<OrderTrans[]>(`${API_BASE_URL}/orders`, { // Asumiendo que /orders te da las OrderTrans
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Mapea y convierte `total_amount` a número si viene como string
      setTransactions(response.data.map(trans => ({
        ...trans,
        total_amount: Number(trans.total_amount)
      })));

    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar las transacciones.');
      console.error('Error fetching transactions:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-8">Cargando transacciones...</div>;
  if (error && !transactions.length) return <div className="text-center p-8 text-red-600">Error: {error}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Gestión de Transacciones</h1>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

      {transactions.length === 0 ? (
        <div className="text-center text-gray-600 p-8 border border-gray-300 rounded-lg shadow-md">
          <p className="text-xl mb-4">No hay transacciones registradas.</p>
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
                {/* Si tienes una fecha de transacción o creación en OrderTrans, añádela aquí */}
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FECHA</th> */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((trans) => (
                <tr key={trans.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{trans.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trans.client?.email || trans.client?.name || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {trans.products.map(p => p.name).join(', ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {/* Aquí la corrección para toFixed */}
                    {trans.total_amount != null ? trans.total_amount.toFixed(2) : '0.00'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trans.payment_status}</td>
                  {/* Si tienes una fecha de transacción o creación en OrderTrans */}
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(trans.createdAt).toLocaleDateString()}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;