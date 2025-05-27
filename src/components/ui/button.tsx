import React, { ButtonHTMLAttributes } from "react";

// Define las props para el botón
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // Puedes agregar props personalizadas aquí si las necesitas
  // Por ejemplo, variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  disabled,
  ...props
}) => {
  // Estilos base que se aplicarán a todos los botones
  const baseStyles =
    "py-2 px-4 rounded font-semibold transition duration-150 ease-in-out";

  // Estilos para el estado deshabilitado
  const disabledStyles = "opacity-50 cursor-not-allowed";

  // Estilos principales o de variante (puedes expandir esto con más variantes)
  const primaryStyles =
    "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";

  // Combinar los estilos
  const combinedStyles = `${baseStyles} ${primaryStyles} ${
    disabled ? disabledStyles : ""
  } ${className || ""}`; // `className` viene de las props y permite sobrescribir/añadir estilos

  return (
    <button type="button" className={combinedStyles} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;