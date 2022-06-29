import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'clientId',
      passwordField: 'secret',
    });
  }

  async validate(clientId: number, secret: string) {
    const client = await this.authService.validateClient(clientId, secret);

    if (!client)
      throw new UnauthorizedException('Cliente e/ou senha inválidos.');

    return client;
  }
}
