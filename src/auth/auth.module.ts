// src/auth/auth.module.ts
import { Module, forwardRef } from '@nestjs/common'; // <-- Importa forwardRef
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { AuthGuard } from './auth.guard';
import { JwtStrategy } from './jwt.strategy';
import * as dotenv from 'dotenv';

import { UsersModule } from 'src/users/users.module'; // Importa UsersModule

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Puedes quitar esto si UsersModule ya lo gestiona
    forwardRef(() => UsersModule), // <--- ¡APLICA forwardRef AQUÍ!
    JwtModule.register({
      secret: process.env.JWT_SECRET || 's3cr3t0_ultr4_S3gur0',
      signOptions: {expiresIn: '1h'},
    }),
  ],
  providers: [
    AuthService,
    AuthGuard,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [
    AuthService,
    JwtModule,
    AuthGuard,
    JwtStrategy,
  ],
})
export class AuthModule {
  constructor() {
    if (!process.env.JWT_SECRET) {
      console.warn('WARNING: JWT_SECRET environment variable is not set. JWT authentication may fail.');
    }
  }
}