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