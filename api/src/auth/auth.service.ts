import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateTestToken = (userId: string) => {
    const payload = { sub: userId, name: 'Usuario de Prueba' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  };
}
