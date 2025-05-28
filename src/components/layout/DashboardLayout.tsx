// src/components/layout/DashboardLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Aquí podrías añadir una Navbar superior si la necesitas */}
        {/* <Navbar /> */} 
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet /> {/* Aquí se renderizarán las páginas de las secciones */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;