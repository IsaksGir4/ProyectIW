import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Cargar el .env desde la raíz del proyecto
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { AppModule } from './app.module';

console.log('DATABASE_URL desde dotenv:', process.env.DATABASE_URL); // 🔍 Depuración

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
// Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:5173', // Permite solicitudes solo desde tu frontend React
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Permite los métodos HTTP necesarios
    credentials: true, // Si usas cookies, encabezados de autorización, etc.
  });

  await app.listen(3000); // Asegúrate de que el puerto sea el mismo que el frontend espera
}
bootstrap();

