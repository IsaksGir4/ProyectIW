import React, { InputHTMLAttributes } from "react";

// Define las props para el Input
// Extiende InputHTMLAttributes para heredar todas las propiedades estándar de un input HTML
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // Puedes agregar props personalizadas aquí si las necesitas,
  // por ejemplo, para manejar iconos, prefijos, etc.
  // label?: string; // Si quieres un label integrado en el componente input
}

export const Input: React.FC<InputProps> = ({
  className,
  type = "text", // Valor por defecto para el tipo de input
  ...props
}) => {
  // Estilos base que se aplicarán a todos los inputs
  const baseStyles =
    "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm " +
    "placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

  // Combinar los estilos
  // `className` viene de las props y permite sobrescribir/añadir estilos
  const combinedStyles = `${baseStyles} ${className || ""}`;

  return (
    <input
      type={type} // Permite que el tipo sea sobrescrito (text, email, password, number, etc.)
      className={combinedStyles}
      {...props} // Pasa todas las demás props (value, onChange, placeholder, name, id, etc.)
    />
  );
};

export default Input;