// src/pages/OrderTransPage.tsx
import React, { useState, useEffect } from 'react';
import {
  OrderTrans,
  CreateOrderTransDto,
  PaymentStatus,
  MakeupProduct,
  User,
} from '../types/orderTrans';
import {
  getOrders,
  createOrder,
  deleteOrder,
  getMakeupProducts,
  getUsers,
} from '../api/orders'; // Asegúrate de que las funciones de productos y usuarios estén en orderService o impórtalas de sus respectivos servicios

const OrderTransPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderTrans[]>([]);
  const [products, setProducts] = useState<MakeupProduct[]>([]); // Para seleccionar productos
  const [clients, setClients] = useState<User[]>([]); // Para seleccionar clientes
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newOrderData, setNewOrderData] = useState<Partial<CreateOrderTransDto>>({
    productIds: [],
    payment_status: PaymentStatus.PAID, // Valor por defecto
  });
  const [selectedProductQuantities, setSelectedProductQuantities] = useState<{ [key: string]: number }>({});

const fetchOrders = async () => {
  setLoading(true);
  setError(null);
  try {
    console.log("fetchOrders: Calling getOrders from service..."); // <-- LOG AQUÍ
    const data = await getOrders(); // <-- Aquí se hace la llamada al servicio
    setOrders(data);
  } catch (err: any) {
    setError(err.response?.data?.message || 'Error al cargar las órdenes.');
    console.error('fetchOrders Error:', err.response?.data || err.message); // <-- LOG AQUÍ
    // Revisa si el error es de autenticación aquí
    if (err.response?.status === 401 || err.response?.status === 403) {
        console.error("fetchOrders: Authentication error. Token might be missing or invalid.");
        // Considera redirigir al login si es un error de autenticación al intentar cargar la lista
        // localStorage.removeItem('accessToken');
        // window.location.href = '/login';
    }
  } finally {
    setLoading(false);
  }
};

  const fetchProductsAndClients = async () => {
    try {
      const productsData = await getMakeupProducts();
      setProducts(productsData);
      const clientsData = await getUsers();
      setClients(clientsData);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar productos/clientes.');
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchProductsAndClients();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewOrderData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
    setNewOrderData((prev) => ({ ...prev, productIds: selectedOptions }));

    // Inicializar cantidades para los productos seleccionados si no existen
    const newQuantities = { ...selectedProductQuantities };
    selectedOptions.forEach(id => {
        if (newQuantities[id] === undefined) {
            newQuantities[id] = 1; // Cantidad por defecto
        }
    });
    // Eliminar cantidades de productos deseleccionados
    Object.keys(newQuantities).forEach(id => {
        if (!selectedOptions.includes(id)) {
            delete newQuantities[id];
        }
    });
    setSelectedProductQuantities(newQuantities);
  };

  const handleProductQuantityChange = (productId: string, quantity: number) => {
    setSelectedProductQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, quantity), // Asegurar que la cantidad sea al menos 1
    }));
  };

  const calculateTotalAmount = (): number => {
    let total = 0;
    if (newOrderData.productIds && products.length > 0) {
      newOrderData.productIds.forEach(productId => {
        const product = products.find(p => p.id === productId);
        const quantity = selectedProductQuantities[productId] || 1; // Usar 1 si no hay cantidad específica
        if (product) {
          total += product.stock * quantity; // Asumiendo que 'stock' es el precio unitario en este contexto
                                           // ¡AJUSTA ESTO SEGÚN TU LÓGICA DE PRECIOS!
        }
      });
    }
    return total;
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);

  const calculatedTotal = calculateTotalAmount();

  if (!newOrderData.clientId || !newOrderData.productIds || newOrderData.productIds.length === 0 || calculatedTotal <= 0) {
    setError('Por favor, completa todos los campos y selecciona al menos un producto.');
    return;
  }

  try {
    // Intenta crear la orden
    await createOrder({
      ...newOrderData,
      total_amount: calculatedTotal,
    } as CreateOrderTransDto);

    console.log("Orden creada exitosamente. Intentando refrescar lista..."); // <-- LOG AQUÍ

    // Refrescar la lista de órdenes
    // Asegúrate de que fetchOrders() esté correctamente definida y use getAuthHeaders()
    await fetchOrders(); // <-- Esta llamada es crucial

    console.log("Lista de órdenes refrescada."); // <-- LOG AQUÍ

    setIsModalOpen(false); // Cerrar el modal
    setNewOrderData({ productIds: [], payment_status: PaymentStatus.PAID }); // Resetear formulario
    setSelectedProductQuantities({});
  } catch (err: any) {
    setError(err.response?.data?.message || 'Error al crear la orden.');
    console.error('Error creating order:', err.response?.data || err.message);
    // Añade un log para ver si el error es de autenticación en la creación o el refresh
    if (err.response?.status === 401 || err.response?.status === 403) {
      console.error("Authentication error after order creation. Token might be invalid or missing.");
      // Podrías forzar un logout si esto sucede
      // localStorage.removeItem('accessToken');
      // window.location.href = '/login';
    }
  }
};

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta orden?')) {
      setError(null);
      try {
        await deleteOrder(id);
        fetchOrders(); // Refrescar la lista
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error al eliminar la orden.');
        console.error('Error deleting order:', err.response?.data || err.message);
      }
    }
  };

  if (loading) return <div className="p-6">Cargando órdenes...</div>;
  if (error && !orders.length) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Gestión de Órdenes</h1>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors mb-6"
      >
        Añadir Nueva Orden
      </button>

      {orders.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-600">
          No hay órdenes registradas.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Productos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado de Pago</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.id.substring(0, 8)}...</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.client?.email || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.products.map(p => p.name).join(', ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.total_amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.payment_status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="text-red-600 hover:text-red-900 ml-4"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal para añadir nueva orden */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Crear Nueva Orden</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="clientId" className="block text-gray-700 text-sm font-bold mb-2">
                  Cliente:
                </label>
                <select
                  id="clientId"
                  name="clientId"
                  value={newOrderData.clientId || ''}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Selecciona un cliente</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.email} ({client.id.substring(0, 8)}...)
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="productIds" className="block text-gray-700 text-sm font-bold mb-2">
                  Productos:
                </label>
                <select
                  id="productIds"
                  name="productIds"
                  multiple
                  value={newOrderData.productIds || []}
                  onChange={handleProductSelectChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                  required
                >
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} (Stock: {product.stock})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Mantén Ctrl/Cmd para seleccionar múltiples.</p>
              </div>

              {newOrderData.productIds && newOrderData.productIds.length > 0 && (
                <div className="mb-4 bg-gray-50 p-3 rounded-md">
                  <h3 className="text-md font-semibold mb-2">Cantidades de Productos Seleccionados:</h3>
                  {newOrderData.productIds.map(productId => {
                    const product = products.find(p => p.id === productId);
                    return (
                      <div key={productId} className="flex items-center mb-2">
                        <label htmlFor={`qty-${productId}`} className="w-1/2 text-sm text-gray-700">
                          {product?.name}:
                        </label>
                        <input
                          type="number"
                          id={`qty-${productId}`}
                          value={selectedProductQuantities[productId] || 1}
                          onChange={(e) => handleProductQuantityChange(productId, parseInt(e.target.value))}
                          min="1"
                          className="shadow appearance-none border rounded w-1/2 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                    );
                  })}
                  <p className="text-sm font-bold mt-2">
                    Monto Total Calculado: ${calculateTotalAmount().toFixed(2)}
                  </p>
                </div>
              )}


              <div className="mb-4">
                <label htmlFor="payment_status" className="block text-gray-700 text-sm font-bold mb-2">
                  Estado de Pago:
                </label>
                <select
                  id="payment_status"
                  name="payment_status"
                  value={newOrderData.payment_status || PaymentStatus.PAID}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  {Object.values(PaymentStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Crear Orden
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTransPage;