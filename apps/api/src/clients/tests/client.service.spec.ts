import { ClientService } from '../client.service';

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Client } from '../entities/client.entity';
import MockFacktory from '../../common/mockFactory';
import { CreateClientDto } from '../dto/create-client.dto';
import { Repository } from 'typeorm';
import {
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UpdateClientDto } from '../dto/update-client.dto';

const cliente = MockFacktory.getClient();

describe('ClientService', () => {
  let service: ClientService;
  let clientRepo: Repository<Client>;

  const mockRepository = {
    find: jest.fn().mockReturnValue([cliente, cliente]),
    findOne: jest.fn().mockReturnValue(cliente),
    create: jest.fn().mockReturnValue(cliente),
    save: jest.fn().mockReturnValue(cliente),
    update: jest.fn().mockReturnValue({
      affected: 1,
    }),
    remove: jest.fn().mockReturnValue(cliente),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: getRepositoryToken(Client),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);

    clientRepo = module.get<Repository<Client>>(getRepositoryToken(Client));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(clientRepo).toBeDefined();
  });

  describe('create', () => {
    const dto: CreateClientDto = {
      email: 'test@test.com',
      secret: 'secret',
    };

    it('should create a user', async () => {
      jest.spyOn(clientRepo, 'findOne').mockResolvedValueOnce(null);

      const result = await service.create(dto);

      expect(result).toBeInstanceOf(Client);
      expect(result.email).toBe(dto.email);
      expect(result.secret).toBe(dto.secret);
    });

    it('should return an exception when user already exists', async () => {
      await service.create(dto).catch((e) => {
        expect(e).toBeInstanceOf(UnprocessableEntityException);
        expect(e).toMatchObject({
          message: 'O cliente com o e-mail informado já foi cadastrado.',
        });
      });
    });

    it('should return an exception when fails', async () => {
      jest.spyOn(clientRepo, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(clientRepo, 'save').mockImplementationOnce(() => {
        throw new Error();
      });

      await service.create(dto).catch((e) => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e).toMatchObject({
          message: 'Não foi possível criar o cliente',
        });
      });
    });
  });

  describe('find', () => {
    const clientId = 1;

    it('should return one client', async () => {
      const result = await service.find(clientId);

      expect(result).toBe(cliente);
    });

    it('should return an exception when client doesnt exists', async () => {
      jest.spyOn(clientRepo, 'findOne').mockResolvedValueOnce(null);

      await service.find(clientId).catch((e) => {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e).toMatchObject({ message: 'Cliente não encontrado.' });
      });
    });
  });

  describe('findAll', () => {
    it('should return a list of clients', async () => {
      const result = await service.findAll();

      expect(result.length).toBe(2);
    });
  });

  describe('update', () => {
    const clientId = 1;
    const dto: UpdateClientDto = {};

    it('should update a client', async () => {
      dto.email = 'test@test.com';
      dto.secret = 'secret';

      const result = await service.update(clientId, dto);

      expect(result).toBeInstanceOf(Client);
    });

    it('should return an exception when client doesnt exists', async () => {
      jest.spyOn(clientRepo, 'findOne').mockResolvedValueOnce(null);

      await service.update(clientId, dto).catch((e) => {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e).toMatchObject({
          message: 'Cliente não encontrado.',
        });
      });
    });

    it('should return an exception when fails', async () => {
      jest.spyOn(clientRepo, 'save').mockImplementationOnce(() => {
        throw new Error();
      });

      await service.update(clientId, dto).catch((e) => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e).toMatchObject({
          message: 'Não foi possível atualizar o cliente.',
        });
      });
    });
  });

  describe('delete', () => {
    const clientId = 1;

    it('should delete a client', async () => {
      const result = await service.delete(clientId);

      expect(result).toBe(true);
    });

    it('should return an exception when doesnt find a client', async () => {
      jest.spyOn(clientRepo, 'findOne').mockResolvedValueOnce(null);

      await service.delete(clientId).catch((e) => {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e).toMatchObject({ message: 'Cliente não encontrado.' });
      });
    });

    it('should return an exception when fails', async () => {
      jest.spyOn(clientRepo, 'remove').mockImplementationOnce(() => {
        throw new Error();
      });

      await service.delete(clientId).catch((e) => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e).toMatchObject({
          message: 'Não foi possível remover o cliente',
        });
      });
    });
  });
});
