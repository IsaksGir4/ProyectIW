// src/types/user.ts

// Asegúrate de que estos roles coincidan exactamente con tu backend
export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client',
  TESTER = 'tester',
  EMPLOYEE = 'employee',
}

export interface UserTokenPayload {
  sub: string; // User ID
  username: string; // User email
  role: UserRole;
  iat: number;
  exp: number;
}

// Interfaz para la información básica del usuario que puede aparecer en otras entidades
export interface BasicUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  test_subject_status?: boolean; // Opcional si no siempre se carga
  allergic_reactions?:string;
}

export interface RegisterUserDto {
  email: string;
  name: string;
  password: string;
  role: UserRole; // El rol se enviará desde el frontend
}

// Interfaz para la respuesta del registro (podría ser un token, un mensaje, o el usuario creado)
export interface RegisterResponse {
  message?: string; // O un token si tu backend devuelve uno en el registro
  // Si tu backend devuelve el usuario creado, podría ser algo como:
  // user: { id: string; name: string; email: string; role: UserRole; };
}

// Interfaz para la respuesta del login (ya la tienes, pero la incluyo para contexto)
export interface LoginResponse {
  token: string;
  role: UserRole; // Es crucial que el backend devuelva el rol aquí
}

export interface CreateUserDto {
  email: string;
  name: string;
  password: string; // La contraseña es obligatoria en la creación si no es autogenerada
  role: UserRole;
  test_subject_status?: boolean; // Opcional, un admin podría establecer esto al crear
  allergic_reactions?: string; // Opcional, un admin podría establecer esto al crear
}

// DTO para actualizar un usuario
// Todos los campos son opcionales porque solo se envían los que se quieren actualizar (PATCH).
export interface UpdateUserDto {
  email?: string;
  name?: string;
  password?: string; // Opcional, para cambiar la contraseña del usuario
  role?: UserRole;
  test_subject_status?: boolean;
  allergic_reactions?: string;
}