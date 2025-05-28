// src/users/users.module.ts
import { Module, forwardRef } from '@nestjs/common'; // <-- Importa forwardRef
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module'; // Importa AuthModule

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule), // <--- ¡APLICA forwardRef AQUÍ TAMBIÉN!
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}