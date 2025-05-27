// Ruta: src/components/ui/index.ts

// Opción A: Si quieres re-exportar el Button (y otros) como nombrados desde '@/components/ui'
// Esto permitiría: import { Button } from '@/components/ui';
// Para esto, necesitarías que button.tsx exporte Button de forma nombrada (export const Button)
// O puedes re-exportar el default así:
export { default as Button } from './button'; // Asume que button.tsx está en la misma carpeta 'ui'

// Cuando tengas tu componente Input (ej. src/components/ui/input.tsx con export default Input)
// export { default as Input } from './input';

// Si tus componentes (Button.tsx, Input.tsx) usaran exportaciones nombradas (export const Button), harías:
// export * from './Button'; // Si el archivo se llama Button.tsx
// export * from './Input';  // Si el archivo se llama Input.tsx