// src/pages/Register.tsx
import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserRole, RegisterUserDto, RegisterResponse } from '../types/user'; // Asegúrate de que la ruta sea correcta
import Input from '../components/ui/input';
import Button from '../components/ui/button';

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<UserRole>(UserRole.CLIENT); // Rol por defecto al registrar
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validación básica del lado del cliente
    if (!name || !email || !password || !role) {
      setError("Por favor, rellena todos los campos.");
      return;
    }

    const registerData: RegisterUserDto = { name, email, password, role };

    try {
      // Ajusta la URL del backend según tu configuración (ej. http://localhost:3001)
      const response = await axios.post<RegisterResponse>(
        "http://localhost:3000/auth/register", // Endpoint de registro de tu backend
        registerData
      );

      setSuccess(response.data.message || "Registro exitoso. ¡Ahora puedes iniciar sesión!");
      // Opcional: limpiar el formulario o redirigir al login
      setName('');
      setEmail('');
      setPassword('');
      setRole(UserRole.CLIENT); // Resetear a rol por defecto
      
      // Podrías redirigir automáticamente al login después de un registro exitoso
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (err: any) {
      setError(err.response?.data?.message || 'Error en el registro. Inténtalo de nuevo.');
      console.error('Error de registro:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crea una nueva cuenta
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
          {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">{success}</div>}

          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Nombre</label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Dirección de Correo</label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Dirección de Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mt-4">Rol</label>
              <select
                id="role"
                name="role"
                required
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-b-md"
              >
                {/* Puedes filtrar los roles que se pueden registrar aquí */}
                {Object.values(UserRole).map((r) => (
                  // Generalmente, no permites que los usuarios se registren como 'admin' o 'employee'
                  // Estos roles se asignan manualmente o a través de un proceso controlado.
                  // Aquí filtramos para que solo 'client' y 'tester' sean opciones de registro público.
                  (r === UserRole.CLIENT || r === UserRole.TESTER) && (
                    <option key={r} value={r}>
                      {r.charAt(0).toUpperCase() + r.slice(1).toLowerCase()} {/* Capitaliza el rol */}
                    </option>
                  )
                ))}
              </select>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Registrarse
            </Button>
          </div>

          <div className="text-sm text-center">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/" className="font-medium text-blue-600 hover:text-blue-500">
              Inicia sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;