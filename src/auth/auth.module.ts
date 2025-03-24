import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { AuthGuard } from './auth.guard';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 's3cr3t0_ultr4_S3gur0',
      signOptions: {expiresIn: '1h'},
    }),
  ],
  providers: [AuthService, JwtService, AuthGuard],
  controllers: [AuthController],
  exports: [JwtService, AuthGuard],
})
export class AuthModule {}
