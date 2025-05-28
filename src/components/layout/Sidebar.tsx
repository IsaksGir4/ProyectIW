// src/components/Sidebar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate

const Sidebar: React.FC = () => {
  const navigate = useNavigate(); // Hook para la navegación

  const handleLogout = () => {
    console.log('Cerrando sesión...');
    localStorage.removeItem('accessToken'); // Elimina el token del localStorage
    navigate('/'); // Redirige al usuario a la página de login (o la raíz)
  };

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col h-screen p-4">
      <div className="text-2xl font-bold mb-6 text-center">Admin Panel</div>
      <nav className="flex-grow">
        <ul>
          <li className="mb-2">
            <Link
              to="/dashboard"
              className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
            >
              Dashboard Home
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/dashboard/makeup-products"
              className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
            >
              Maquillaje
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/dashboard/orders"
              className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
            >
              Pedidos
            </Link>
          </li>
          {/* NUEVA PESTAÑA: Usuarios */}
          <li className="mb-2">
            <Link
              to="/dashboard/users" 
              className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
            >
              Usuarios {/* <--- Nuevo texto */}
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/dashboard/product-tests" // Suponiendo que esta es la ruta para "Pruebas de Producto"
              className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200"
            >
              Pruebas de Producto
            </Link>
          </li>
        </ul>
      </nav>
      {/* Botón de Cerrar Sesión */}
      <div className="mt-auto"> {/* Esto empujará el botón al final de la barra lateral */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;