// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute'; // Asegúrate de que la ruta sea correcta
import DashboardLayout from './components/layout/DashboardLayout'; // Asegúrate de que la ruta sea 
import { UserRole } from './types/user';

// Páginas del Dashboard
import DashboardHome from './pages/DashboardHome';
import MakeupProductsPage from './pages/Makeup';
import ProductTestsPage from './pages/ProductTest';

import './App.css'; 
import OrdersPage from './pages/OrdersPage';
import TransactionsPage from './pages/TransactionPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
         <Route path="/register" element={<Register />} />

        {/* Rutas Protegidas por PrivateRoute y envueltas en DashboardLayout */}
        <Route element={<PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.EMPLOYEE, UserRole.CLIENT, UserRole.TESTER]} />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} /> {/* Ruta por defecto de /dashboard */}
            <Route path="makeup-products" element={<MakeupProductsPage />} />

             <Route element={<PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.EMPLOYEE]} />}>
              <Route path="orders" element={<OrdersPage />} />
              <Route path="transactions" element={<TransactionsPage />} />
            </Route>
        
            
            <Route element={<PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.TESTER]} />}>
              <Route path="product-tests" element={<ProductTestsPage />} />
            </Route>

          </Route>
        </Route>

        {/* Ruta para capturar cualquier otra cosa (ej. 404 Page) */}
        <Route path="*" element={<div className="text-center p-20 text-xl">404 - Página no encontrada</div>} />
      </Routes>
    </div>
  );
}

export default App;