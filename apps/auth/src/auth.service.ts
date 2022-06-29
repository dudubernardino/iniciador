import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientService } from '../../api/src/clients/client.service';
import { Client } from '@api/src/clients/entities/client.entity';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientService: ClientService,

    private readonly jwtService: JwtService,
  ) {}

  /**
   * @function login
   * @description loga um cliente
   * @param {number} clientId - clientId do cliente
   * @returns {string}
   */
  async login(client: Client) {
    const payload = { sub: client.clientId, email: client.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  /**
   * @function validateClient
   * @description Valida um cliente
   * @param {number} clientId - clientId do cliente
   * @param {string} secret - secret do cliente
   * @returns {Client}
   */
  async validateClient(clientId: number, secret: string): Promise<Client> {
    const client = await this.clientService.find(clientId);

    if (!client) throw new NotFoundException('Cliente e/ou senha inválidos.');

    const isPasswordValid = compareSync(secret, client.secret);

    if (!isPasswordValid)
      throw new InternalServerErrorException('Cliente e/ou senha inválidos.');

    return client;
  }
}
