// src/components/Modal.tsx
import React, { FC, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;       // Controla si el modal está visible
  onClose: () => void;   // Función para cerrar el modal
  title: string;         // Título del modal
  children: ReactNode;   // Contenido que se renderizará dentro del modal
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null; // Si no está abierto, no renderizamos nada
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose} // Cierra el modal si se hace clic en el overlay
      ></div>

      {/* Contenido del Modal */}
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          {/* Header del Modal */}
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t">
            <h3 className="text-3xl font-semibold text-gray-800">{title}</h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-gray-700 opacity-70 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={onClose}
            >
              <span className="text-gray-700 opacity-70 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>

          {/* Body del Modal */}
          <div className="relative p-6 flex-auto">
            {children} {/* Aquí se renderizará el formulario o cualquier otro contenido */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;