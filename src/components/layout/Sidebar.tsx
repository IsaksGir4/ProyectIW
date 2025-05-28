// src/components/layout/Sidebar.tsx
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { UserRole, UserTokenPayload } from '../../types/user'; // Ajusta la ruta

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwtDecode<UserTokenPayload>(token);
        setUserRole(decodedToken.role);
      } catch (e) {
        console.error("Error decodificando token en Sidebar:", e);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  if (!userRole) {
    return null; // O un spinner de carga mientras se decodifica el token
  }

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col min-h-screen">
      <div className="p-6 text-2xl font-bold text-center border-b border-gray-700">
        Admin Panel
      </div>
      <nav className="flex-1 px-4 py-6">
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              end // Asegura que solo se active cuando la ruta es exactamente "/dashboard"
              className={({ isActive }) =>
                `block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${
                  isActive ? 'bg-gray-700 text-blue-400' : 'text-gray-300'
                }`
              }
            >
              Dashboard Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/makeup-products"
              className={({ isActive }) =>
                `block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${
                  isActive ? 'bg-gray-700 text-blue-400' : 'text-gray-300'
                }`
              }
            >
              Maquillaje
            </NavLink>
          </li>
          {/* Solo mostrar Pedidos y Transacciones a 'admin' o 'employee' */}
          {(userRole === 'admin' || userRole === 'employee') && (
            <>
              <li>
                <NavLink
                  to="/dashboard/orders"
                  className={({ isActive }) =>
                    `block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${
                      isActive ? 'bg-gray-700 text-blue-400' : 'text-gray-300'
                    }`
                  }
                >
                  Pedidos
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/transactions"
                  className={({ isActive }) =>
                    `block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${
                      isActive ? 'bg-gray-700 text-blue-400' : 'text-gray-300'
                    }`
                  }
                >
                  Transacciones
                </NavLink>
              </li>
            </>
          )}
          {/* Solo mostrar Pruebas de Producto a 'admin' */}
          {userRole === 'admin' && (
            <li>
              <NavLink
                to="/dashboard/product-tests"
                className={({ isActive }) =>
                  `block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 ${
                    isActive ? 'bg-gray-700 text-blue-400' : 'text-gray-300'
                  }`
                }
              >
                Pruebas de Producto
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition duration-200"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;