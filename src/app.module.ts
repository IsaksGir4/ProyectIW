import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { parse } from 'url'; // 📌 Importamos url parser
import { UsersModule } from './users/users.module';
import { MakeupProductsModule } from './makeup-products/makeup-products.module';
import { ProductsTestsModule } from './products-tests/products-tests.module';
import { OrderTransModule } from './order-&-transactions/orderTrans.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL no está definida en el .env');
}

const dbUrl = new URL(process.env.DATABASE_URL);

// Determinar si usar SSL basado en el entorno o la URL
const isProduction = process.env.NODE_ENV === 'production';
let useSsl = isProduction || dbUrl.hostname.includes('render.com') || dbUrl.hostname.includes('fly.io') || dbUrl.hostname.includes('elephantsql.com'); // Puedes añadir otros hosts de proveedores de DB en la nube aquí

// Si la conexión es a localhost o una IP local, forzamos useSsl a false
if (dbUrl.hostname === 'localhost' || dbUrl.hostname === '127.0.0.1') {
  useSsl = false;
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: dbUrl.hostname,
      port: Number(dbUrl.port),
      username: dbUrl.username,
      password: dbUrl.password,
      database: dbUrl.pathname?.substring(1),
      autoLoadEntities: true,
      synchronize: true,
       ssl: useSsl ? { rejectUnauthorized: false } : false, // <--- ¡AQUÍ ESTÁ LA CLAVE!

      
    }),
    UsersModule, MakeupProductsModule, ProductsTestsModule, OrderTransModule, AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
