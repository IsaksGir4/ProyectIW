// src/pages/DashboardHome.tsx
import React from 'react';

const DashboardHome: React.FC = () => {
  return (
    <div className="text-center p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Bienvenido al Dashboard</h2>
      <p className="text-gray-600">Selecciona una sección del menú lateral para comenzar.</p>
    </div>
  );
};

export default DashboardHome;