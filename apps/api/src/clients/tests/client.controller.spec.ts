import MockFacktory from '../../common/mockFactory';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from '../client.controller';
import { ClientService } from '../client.service';
import { CreateClientDto } from '../dto/create-client.dto';
import { Client } from '../entities/client.entity';
import { UpdateClientDto } from '../dto/update-client.dto';

const cliente = MockFacktory.getClient();

describe('ClientController', () => {
  let controller: ClientController;
  let service: ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [
        {
          provide: ClientService,
          useValue: {
            create: jest.fn().mockResolvedValue(cliente),
            find: jest.fn().mockResolvedValue(cliente),
            findAll: jest.fn().mockResolvedValue([cliente, cliente]),
            update: jest.fn().mockResolvedValue(cliente),
            delete: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<ClientController>(ClientController);
    service = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const dto: CreateClientDto = {
      email: 'test@test.com',
      secret: 'secret',
    };

    it('should create a user', async () => {
      const result = await controller.create(dto);

      expect(result).toBeInstanceOf(Client);
    });
  });

  describe('find', () => {
    const clientId = 1;

    it('should return a user', async () => {
      const result = await controller.find(clientId);

      expect(result).toBeInstanceOf(Client);
    });
  });

  describe('find', () => {
    it('should return all user', async () => {
      const result = await controller.findAll();

      expect(result.length).toBe(2);
    });
  });

  describe('update', () => {
    const clientId = 1;
    const dto: UpdateClientDto = {
      email: 'test@test.com',
      secret: 'secret',
    };

    it('should update a user', async () => {
      const result = await controller.update(clientId, dto);

      expect(result).toBeInstanceOf(Client);
    });
  });

  describe('delete', () => {
    const clientId = 1;

    it('should delete a user', async () => {
      const result = await controller.delete(clientId);

      expect(result).toBe(true);
    });
  });
});
