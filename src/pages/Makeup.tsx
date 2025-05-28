// src/pages/MakeupProductsPage.tsx
import React, { useState, useEffect } from 'react';
import { MakeupProduct, CreateMakeupProductDto, UpdateMakeupProductDto, ProductCategory } from '../types/makeupProduct'; // Importa tus tipos
import { getMakeupProducts, createMakeupProduct, updateMakeupProduct, deleteMakeupProduct } from '../api/makeupProducts'; // Tus funciones API
import Modal from '../components/ui/modal';
import Input from '../components/ui/input'; // Tus componentes de UI
import Button from '../components/ui/button';

const MakeupProductsPage: React.FC = () => {
  const [products, setProducts] = useState<MakeupProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<MakeupProduct | null>(null);
  const [formData, setFormData] = useState<CreateMakeupProductDto | UpdateMakeupProductDto>({
    name: '',
    category: ProductCategory.OTHER, // Inicializado con un valor válido del enum
    stock: 0,
    warehouse_location: '',
    durability_score: 0,
  });

  // Función para obtener los productos
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMakeupProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar los productos.');
    } finally {
      setLoading(false);
    }
  };

  // Se ejecuta al montar el componente para cargar los productos
  useEffect(() => {
    fetchProducts();
  }, []);

  // Manejador genérico para cambios en los inputs del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      // Convierte a número solo si el campo es 'stock' o 'durability_score'
      [name]: (name === 'stock' || name === 'durability_score') ? Number(value) : value,
    }));
  };

  // Abre el modal para crear un nuevo producto
  const handleOpenCreateModal = () => {
    setCurrentProduct(null); // Asegura que no estemos en modo edición
    setFormData({ // Reinicia el formulario
      name: '',
      category: ProductCategory.OTHER, // Valor por defecto para una nueva creación
      stock: 0,
      warehouse_location: '',
      durability_score: 0
    });
    setIsModalOpen(true);
  };

  // Abre el modal para editar un producto existente
  const handleOpenEditModal = (product: MakeupProduct) => {
    setCurrentProduct(product);
    setFormData({ // Carga los datos del producto existente en el formulario
      name: product.name,
      category: product.category,
      stock: product.stock,
      warehouse_location: product.warehouse_location,
      durability_score: product.durability_score,
    });
    setIsModalOpen(true);
  };

  // Cierra el modal y limpia el estado de edición/error
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
    setError(null);
  };

  // Envío del formulario (crear o actualizar)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Limpiar errores antes de intentar el envío

    // Validación básica del lado del cliente
    if (!formData.name || !formData.category || !formData.warehouse_location) {
        setError('Por favor, rellena todos los campos obligatorios (Nombre, Categoría, Ubicación).');
        return;
    }
    if (formData.stock === 0) { // Opcional: valida si el stock puede ser 0
        setError('El stock no puede ser cero.');
        return;
    }
    if (formData.durability_score === 0) { // Opcional: valida si la durabilidad puede ser 0
        setError('La durabilidad no puede ser cero.');
        return;
    }


    try {
      if (currentProduct) {
        // Si hay un producto actual, es una actualización
        await updateMakeupProduct(currentProduct.id, formData);
      } else {
        // Si no, es una nueva creación
        await createMakeupProduct(formData as CreateMakeupProductDto);
      }
      fetchProducts(); // Refrescar la lista de productos después de guardar
      handleCloseModal(); // Cerrar el modal
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al guardar el producto.');
      console.error('Error al guardar el producto:', err.response?.data || err.message);
    }
  };

  // Eliminar un producto
  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await deleteMakeupProduct(id);
        fetchProducts(); // Refrescar la lista después de eliminar
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error al eliminar el producto.');
        console.error('Error al eliminar el producto:', err.response?.data || err.message);
      }
    }
  };

  if (loading) return <div className="text-center p-8">Cargando productos...</div>;
  if (error && !products.length) return <div className="text-center p-8 text-red-600">Error: {error}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Gestión de Productos de Maquillaje</h1>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

      <div className="flex justify-end mb-4">
        <Button onClick={handleOpenCreateModal}>Añadir Nuevo Producto</Button>
      </div>

      {products.length === 0 ? (
        <div className="text-center text-gray-600 p-8 border border-gray-300 rounded-lg shadow-md">
          <p className="text-xl mb-4">No hay productos de maquillaje registrados.</p>
          <Button onClick={handleOpenCreateModal}>Crear primer producto</Button>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NOMBRE</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CATEGORÍA</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STOCK</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UBICACIÓN</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DURABILIDAD</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td> {/* Muestra el ID completo */}                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.warehouse_location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.durability_score}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button
                      onClick={() => handleOpenEditModal(product)}
                      className="text-white-600 hover:text-blue-900 mr-2 bg-blue-100 px-3 py-1 rounded"
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-900 bg-red-100 px-3 py-1 rounded"
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal para Crear/Editar Producto */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={currentProduct ? 'Editar Producto' : 'Crear Nuevo Producto'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

          {/* Campo Nombre */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
            <Input
              type="text"
              name="name"
              id="name"
              value={formData.name || ''}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Campo Categoría - Usando <select> para Product Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría</label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="" disabled>Selecciona una categoría</option> {/* Opción predeterminada */}
              {Object.values(ProductCategory).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Campo Stock */}
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
            <Input
              type="number"
              name="stock"
              id="stock"
              value={formData.stock || 0}
              onChange={handleInputChange}
              required
              min="0" // Permite al menos 0
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Campo Ubicación (Corregido 'name') */}
          <div>
            <label htmlFor="warehouse_location" className="block text-sm font-medium text-gray-700">Ubicación</label>
            <Input
              type="text"
              name="warehouse_location" // ¡CORREGIDO! Coincide con el estado
              id="warehouse_location" // Usa el mismo ID para ser consistente
              value={formData.warehouse_location || ''}
              onChange={handleInputChange}
              required
              placeholder="Ej: Almacén A, Estante 3"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Campo Durabilidad (Corregido 'name') */}
          <div>
            <label htmlFor="durability_score" className="block text-sm font-medium text-gray-700">Durabilidad </label>
            <Input
              type="number"
              name="durability_score" // ¡CORREGIDO! Coincide con el estado
              id="durability_score" // Usa el mismo ID para ser consistente
              value={formData.durability_score || 0}
              onChange={handleInputChange}
              required
              min="0" // Permite al menos 0
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {currentProduct ? 'Guardar Cambios' : 'Crear Producto'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MakeupProductsPage;