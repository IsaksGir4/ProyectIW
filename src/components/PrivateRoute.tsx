// src/components/PrivateRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // npm install jwt-decode
import { UserRole, UserTokenPayload } from '../types/user'; // Asegúrate de que la ruta sea correcta

interface PrivateRouteProps {
  allowedRoles?: UserRole[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const decodedToken = jwtDecode<UserTokenPayload>(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        // Token expirado
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole'); // Limpia también el rol
        setIsAuthenticated(false);
        return;
      }

      setUserRole(decodedToken.role);
      setIsAuthenticated(true);

    } catch (e) {
      console.error("Error decodificando token:", e);
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) {
    // Aún verificando autenticación
    return <div className="flex items-center justify-center min-h-screen text-lg">Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />; // Redirige al login si no está autenticado
  }

  // Si se especifican roles permitidos, verificar que el usuario tenga uno de ellos
  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    // Si el usuario no tiene un rol permitido, redirigir a una página de acceso denegado o al dashboard principal
    return <Navigate to="/dashboard" replace />; 
  }

  return <Outlet />; // Renderiza el componente hijo de la ruta
};

export default PrivateRoute;