// src/pages/UsersPage.tsx
import React, { useEffect, useState } from 'react';
import { getUsers, createUser, deleteUser } from '../api/user'; // Importa createUser
import { BasicUser, CreateUserDto, UserRole } from '../types/user'; // Importa CreateUserDto y UserRole

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<BasicUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal
  const [newUserData, setNewUserData] = useState<CreateUserDto>({
    email: '',
    name: '',
    password: '',
    role: UserRole.CLIENT, // Valor por defecto para el rol
    test_subject_status: false,
    allergic_reactions: '',
  });

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('UsersPage - fetchUsers: Cargando usuarios...');
      const data = await getUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar los usuarios.');
      console.error('UsersPage - fetchUsers ERROR:', err.response?.data || err.message);
      if (err.response?.status === 401 || err.response?.status === 403) {
        console.error("UsersPage - fetchUsers: Error de autenticación. Posiblemente token perdido o inválido.");
        // Opcional: Podrías forzar un logout o redirigir al login aquí
        // localStorage.removeItem('accessToken');
        // window.location.href = '/';
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar a este usuario?')) {
      try {
        console.log(`UsersPage - handleDeleteUser: Eliminando usuario con ID: ${id}`);
        await deleteUser(id);
        console.log('UsersPage - handleDeleteUser: Usuario eliminado exitosamente. Refrescando lista...');
        fetchUsers(); // Recargar la lista después de eliminar
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error al eliminar el usuario.');
        console.error('UsersPage - handleDeleteUser ERROR:', err.response?.data || err.message);
      }
    }
  };

  // Manejador para el envío del formulario de creación de usuario
  const handleCreateUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Pequeña validación básica
    if (!newUserData.email || !newUserData.name || !newUserData.password || !newUserData.role) {
      setError('Por favor, completa todos los campos obligatorios (Email, Nombre, Contraseña, Rol).');
      return;
    }

    try {
      console.log('UsersPage - handleCreateUserSubmit: Intentando crear usuario...');
      await createUser(newUserData);
      console.log('UsersPage - handleCreateUserSubmit: Usuario creado exitosamente.');
      setIsModalOpen(false); // Cerrar el modal
      setNewUserData({ // Resetear el formulario
        email: '',
        name: '',
        password: '',
        role: UserRole.CLIENT,
        test_subject_status: false,
        allergic_reactions: '',
      });
      fetchUsers(); // Recargar la lista de usuarios
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear el usuario.');
      console.error('UsersPage - handleCreateUserSubmit ERROR:', err.response?.data || err.message);
    }
  };


  // Carga inicial de usuarios
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <p className="p-4">Cargando usuarios...</p>;
  }

  if (error) {
    return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-4" role="alert">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Añadir Nuevo Usuario
      </button>

      {users.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Nombre</th> {/* Añadido Nombre */}
                <th className="py-3 px-6 text-left">Rol</th>
                <th className="py-3 px-6 text-left">Sujeto Prueba</th> {/* Añadido Sujeto Prueba */}
                <th className="py-3 px-6 text-left">Reacciones Alérgicas</th> {/* Añadido Reacciones Alérgicas */}
                <th className="py-3 px-6 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{user.id}</td>
                  <td className="py-3 px-6 text-left">{user.email}</td>
                  <td className="py-3 px-6 text-left">{user.name}</td> {/* Muestra el nombre */}
                  <td className="py-3 px-6 text-left">{user.role}</td>
                  <td className="py-3 px-6 text-left">{user.test_subject_status ? 'Sí' : 'No'}</td> {/* Muestra el estado */}
                  <td className="py-3 px-6 text-left">{user.allergic_reactions || 'N/A'}</td> {/* Muestra reacciones */}
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center">
                      {/* Botones de acción (Editar, Eliminar) */}
                      {/* Por ahora solo Eliminar */}
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-xs"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal para Añadir Nuevo Usuario */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Añadir Nuevo Usuario</h2>
            <form onSubmit={handleCreateUserSubmit}>
              {/* Email */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newUserData.email}
                  onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                  required
                />
              </div>

              {/* Nombre */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Nombre:
                </label>
                <input
                  type="text"
                  id="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newUserData.name}
                  onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                  required
                />
              </div>

              {/* Contraseña */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Contraseña:
                </label>
                <input
                  type="password"
                  id="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newUserData.password}
                  onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                  required
                />
              </div>

              {/* Rol */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                  Rol:
                </label>
                <select
                  id="role"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newUserData.role}
                  onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value as UserRole })}
                  required
                >
                  {Object.values(UserRole).map((role) => (
                    <option key={role} value={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)} {/* Capitalizar el rol */}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sujeto de Prueba */}
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="test_subject_status"
                  className="mr-2 leading-tight"
                  checked={newUserData.test_subject_status}
                  onChange={(e) => setNewUserData({ ...newUserData, test_subject_status: e.target.checked })}
                />
                <label className="text-gray-700 text-sm font-bold" htmlFor="test_subject_status">
                  Sujeto de Prueba:
                </label>
              </div>

              {/* Reacciones Alérgicas */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="allergic_reactions">
                  Reacciones Alérgicas:
                </label>
                <textarea
                  id="allergic_reactions"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newUserData.allergic_reactions || ''}
                  onChange={(e) => setNewUserData({ ...newUserData, allergic_reactions: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Crear Usuario
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;