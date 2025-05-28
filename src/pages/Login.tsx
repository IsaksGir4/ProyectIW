// src/pages/Login.tsx
import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Ajusta estas rutas según tu configuración (alias o relativas)
import Button from "../components/ui/button"; // O "../components/ui/button"
import Input from "../components/ui/input";   // O "../components/ui/input"

interface LoginResponse {
  token: string;
  role: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor, ingresa tu email y contraseña.");
      return;
    }

    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:3000/auth/login",
        { email, password }
      );

      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userRole", response.data.role);

      navigate("/dashboard");
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Error al iniciar sesión.");
      } else {
        setError("Ocurrió un error inesperado. Inténtalo de nuevo.");
      }
    }
  };

  return (
    // Contenedor principal: Ocupa toda la pantalla, con un fondo degradado y centra el contenido
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Tarjeta del formulario de login */}
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl border border-gray-200">
        <div>
          {/* Título y subtítulo centrados */}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Bienvenido de Nuevo
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Inicia sesión para continuar
          </p>
        </div>

        {/* Formulario */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Grupo de inputs (para que parezcan unidos) */}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Correo Electrónico
              </label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo Electrónico"
                // Clases específicas para el input de email (borde superior redondeado)
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                // Clases específicas para el input de contraseña (borde inferior redondeado y margen negativo)
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm mt-[-1px]"
              />
            </div>
          </div>

          {/* Enlace "¿Olvidaste tu contraseña?" */}
          <div className="flex items-center justify-end"> {/* Alineado a la derecha */}
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          {/* Mensaje de error */}
          {error && (
            <p className="text-red-600 text-sm text-center font-medium">
              {error}
            </p>
          )}

          {/* Botón de Iniciar Sesión */}
          <div>
            <Button
              type="submit"
              disabled={!email || !password}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Iniciar Sesión
            </Button>
          </div>
        </form>

        {/* Enlace para registrarse */}
        <div className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <a href="register" className="font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out">
            Regístrate
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;