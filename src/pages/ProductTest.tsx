// src/pages/ProductTestsPage.tsx
// src/pages/ProductTestsPage.tsx
import React, { useState, useEffect } from 'react';
import { ProductTest, CreateProductTestDto, UpdateProductTestDto } from '../types/productTest';
import { getProductTests, createProductTest, updateProductTest, deleteProductTest } from '../api/productTests';
import Button from '../components/ui/button';
import Input from '../components/ui/input';
// Importa tus componentes de selección de usuario y producto si los haces
// import UserSelect from '@/components/common/UserSelect';
// import ProductSelect from '@/components/common/ProductSelect';

const ProductTestsPage: React.FC = () => {
  const [productTests, setProductTests] = useState<ProductTest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentProductTest, setCurrentProductTest] = useState<ProductTest | null>(null);

  const [formData, setFormData] = useState<CreateProductTestDto | UpdateProductTestDto>({
    testerId: '',
    productId: '',
    reaction: '',
    rating: 5,
    survival_status: true,
  });

  useEffect(() => {
    fetchProductTests();
  }, []);

  const fetchProductTests = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProductTests();
      setProductTests(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar pruebas de producto.');
    } finally {
      setLoading(false);
    }
  };

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    // Declara 'checked' por separado y asigna solo si el tipo es 'checkbox'
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'rating' ? Number(value) : value),
    }));
  };

  const handleOpenCreateModal = () => {
    setCurrentProductTest(null);
    setFormData({
      testerId: '',
      productId: '',
      reaction: '',
      rating: 5,
      survival_status: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (test: ProductTest) => {
    setCurrentProductTest(test);
    setFormData({
      testerId: test.tester.id,
      productId: test.product.id,
      reaction: test.reaction,
      rating: test.rating,
      survival_status: test.survival_status,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentProductTest(null);
    setError(null);
  };

  const handleSaveProductTest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (currentProductTest) {
        await updateProductTest(currentProductTest.id, formData);
      } else {
        await createProductTest(formData as CreateProductTestDto);
      }
      fetchProductTests();
      handleCloseModal();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al guardar la prueba de producto.');
    }
  };

  const handleDeleteProductTest = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta prueba de producto?')) {
      setError(null);
      try {
        await deleteProductTest(id);
        fetchProductTests();
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error al eliminar la prueba de producto.');
      }
    }
  };

  if (loading) return <div className="text-center p-8">Cargando pruebas de producto...</div>;
  if (error && !productTests.length) return <div className="text-center p-8 text-red-600">Error: {error}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Gestión de Pruebas de Producto</h1>
      
      <div className="mb-6 text-right">
        <Button onClick={handleOpenCreateModal} className="bg-green-600 hover:bg-green-700">
          Añadir Nueva Prueba
        </Button>
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

      {productTests.length === 0 ? (
        <div className="text-center text-gray-600 p-8 border border-gray-300 rounded-lg shadow-md">
          <p className="text-xl mb-4">No hay pruebas de producto registradas.</p>
          <p>¡Haz clic en "Añadir Nueva Prueba" para empezar!</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tester</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reacción</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Puntuación</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado Supervivencia</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productTests.map((test) => (
                <tr key={test.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{test.product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{test.tester.name} ({test.tester.email})</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs overflow-hidden text-ellipsis">{test.reaction}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{test.rating}/10</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      test.survival_status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {test.survival_status ? 'Superviviente' : 'No Superviviente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button onClick={() => handleOpenEditModal(test)} className="text-white-600 hover:text-blue-900 mr-2 bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded-md text-xs">
                      Editar
                    </Button>
                    <Button onClick={() => handleDeleteProductTest(test.id)} className="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-md text-xs">
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal para Crear/Editar Prueba de Producto */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative p-8 bg-white w-full max-w-lg mx-auto rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              {currentProductTest ? 'Editar Prueba de Producto' : 'Crear Nueva Prueba'}
            </h3>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm" role="alert">{error}</div>}
            <form onSubmit={handleSaveProductTest} className="space-y-4">
              <div>
                <label htmlFor="productId" className="block text-sm font-medium text-gray-700">Producto (ID)</label>
                <Input type="text" id="productId" name="productId" value={formData.productId} onChange={handleInputChange} required className="mt-1" placeholder="ID del Producto" />
                {/* Idealmente, un componente de selección de producto */}
              </div>
              <div>
                <label htmlFor="testerId" className="block text-sm font-medium text-gray-700">Tester (ID)</label>
                <Input type="text" id="testerId" name="testerId" value={formData.testerId} onChange={handleInputChange} required className="mt-1" placeholder="ID del Tester" />
                {/* Idealmente, un componente de selección de tester (usuario) */}
              </div>
              <div>
                <label htmlFor="reaction" className="block text-sm font-medium text-gray-700">Reacción</label>
                <textarea 
                  id="reaction" 
                  name="reaction" 
                  value={formData.reaction} 
                  onChange={handleInputChange} 
                  required 
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                ></textarea>
              </div>
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Puntuación (1-10)</label>
                <Input type="number" id="rating" name="rating" value={formData.rating} onChange={handleInputChange} required className="mt-1" min="1" max="10" />
              </div>
              <div className="flex items-center">
                <input 
                  id="survival_status" 
                  name="survival_status" 
                  type="checkbox" 
                  checked={formData.survival_status} 
                  onChange={handleInputChange} 
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="survival_status" className="ml-2 block text-sm text-gray-900">
                  Estado de Supervivencia (Test superado)
                </label>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <Button type="button" onClick={handleCloseModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800">
                  Cancelar
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                  {currentProductTest ? 'Actualizar' : 'Crear'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTestsPage;