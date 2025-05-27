// src/pages/Login.tsx
import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "src/components/ui";
import Input from "src/components/ui/input";

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
    setError(""); // Limpiar errores previos

    if (!email || !password) {
      setError("Por favor, ingresa tu email y contraseña.");
      return;
    }

    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:3000/api/auth/login", // Asegúrate que esta URL sea correcta y esté en una variable de entorno
        { email, password }
      );

      const { token, role } = response.data;
      localStorage.setItem("token", token);
      // Opcional: guardar el rol también si lo necesitas globalmente
      // localStorage.setItem("userRole", role);

      if (role === "ADMIN") {
        navigate("/admin");
      } else if (role === "USER") {
        navigate("/user"); // O la ruta que corresponda para usuarios normales
      } else {
        // Manejar roles desconocidos o redirigir a una página por defecto
        navigate("/");
      }
    } catch (err: any) { // Es buena práctica tipar el error si conoces su estructura
      if (axios.isAxiosError(err) && err.response) {
        // Asumir que el backend envía un mensaje de error en err.response.data.message o similar
        setError(err.response.data.message || "Error al iniciar sesión. Inténtalo de nuevo.");
      } else {
        setError("Ocurrió un error inesperado. Inténtalo de nuevo.");
      }
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100"> {/* Contenedor principal centrado */}
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md"> {/* Tarjeta del formulario */}
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Correo Electrónico
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              // Asumiendo que tu componente Input acepta className
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña
            </label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              // Asumiendo que tu componente Input acepta className
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            {/* Aquí podrías agregar un enlace para "Olvidé mi contraseña" */}
            {/* <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500 float-right">¿Olvidaste tu contraseña?</a> */}
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">
              {error}
            </p>
          )}

          <div>
            <Button
              type="submit"
              // Asumiendo que tu componente Button acepta className
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Ingresar
            </Button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;