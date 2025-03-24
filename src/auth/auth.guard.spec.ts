import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { Reflector } from '@nestjs/core';

describe('AuthGuard', () => {

  let authGuard: AuthGuard;
  let jwtService: JwtService;
  let reflector: Reflector;
  beforeEach(() => {
    jwtService = new JwtService({secret: 'test-secret' });
    reflector = new Reflector();
    authGuard = new AuthGuard(jwtService, reflector);
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });
});
