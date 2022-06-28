import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { timeStamp } from 'console';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
  ) {}

  /**
   * @function create
   * @description Cria um cliente
   * @param {CreateClientDto} dto - Parâmetros do cliente
   * @returns {Client}
   */
  async create(dto: CreateClientDto): Promise<Client> {
    let client = await this.clientRepo.findOne({
      where: {
        email: dto.email,
      },
    });

    if (client)
      throw new UnprocessableEntityException(
        'O cliente com o e-mail informado já foi cadastrado.',
      );

    client = this.clientRepo.create({
      email: dto.email,
      secret: dto.secret,
    });

    await this.clientRepo.save(client);

    return client;
  }

  /**
   * @function find
   * @description Retorna um cliente
   * @param {number} clientId - id do cliente
   * @returns {Client}
   */
  async find(clientId: number): Promise<Client> {
    const client = await this.clientRepo.findOne({
      where: {
        clientId,
      },
    });

    if (!client) throw new NotFoundException('Cliente não encontrado.');

    return client;
  }

  /**
   * @function findAll
   * @description Retorna todos os clientes
   * @returns {Client[]}
   */
  async findAll(): Promise<Client[]> {
    const clients = await this.clientRepo.find();

    return clients;
  }

  /**
   * @function update
   * @description Atualiza um cliente
   * @param {UpdateClientDto} dto - Parâmetros do cliente
   * @returns {Client}
   */
  async update(clientId: number, dto: UpdateClientDto): Promise<Client> {
    const client = await this.clientRepo.findOne({
      where: {
        clientId,
      },
    });

    if (!client) throw new NotFoundException('Cliente não encontrado.');

    if (dto.email) client.email = dto.email;
    if (dto.secret) client.secret = dto.secret;

    await this.clientRepo.save(client);

    return client;
  }

  /**
   * @function delete
   * @description Exclui um cliente
   * @param {string} clientId - Id do cliente
   * @returns {boolean}
   */
  async delete(clientId: number): Promise<boolean> {
    const client = await this.clientRepo.findOne({
      where: {
        clientId,
      },
    });

    if (!client) throw new NotFoundException('Cliente não encontrado.');

    const result = await this.clientRepo.remove(client);

    if (!result)
      throw new InternalServerErrorException(
        'Não foi possível remover o cliente',
      );

    return true;
  }
}
