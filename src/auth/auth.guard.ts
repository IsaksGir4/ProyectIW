import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    console.log('🔍 Authorization Header:', authHeader); // 📌 Depuración

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ForbiddenException('Access denied: Token not found');
    }

    const token = authHeader.split(' ')[1];
    console.log('🔍 Extracted Token:', token); // 📌 Depuración

    try {
      const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET || 's3cr3t0_ultr4_S3gur0' });
      console.log('🔍 Decoded Token:', decoded); // 📌 Depuración
      request.user = decoded;

      if (!requiredRoles || requiredRoles.includes(decoded.role)) {
        return true; // ✅ Acceso permitido
      }

      throw new ForbiddenException('Access denied: Insufficient permissions');
    } catch (error) {
      throw new ForbiddenException('Access denied: Invalid token');
    }
  }
}
