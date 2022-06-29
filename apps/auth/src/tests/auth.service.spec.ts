import MockFacktory from '../../../api/src/common/mockFactory';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from '../../../api/src/clients/client.service';
import { AuthService } from '../auth.service';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

const cliente = MockFacktory.getClient();

jest.mock('bcrypt', () => {
  const compareSync = (password, clientPassword) =>
    password === clientPassword ? true : false;

  return {
    compareSync,
  };
});

describe('AuthService', () => {
  let service: AuthService;

  let clientService: ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: ClientService,
          useValue: {
            find: jest.fn().mockResolvedValue(cliente),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    clientService = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(clientService).toBeDefined();
  });

  describe('login', () => {
    it('should login a client', async () => {
      const { token } = await service.login(cliente);

      expect(token).toBe('token');
    });
  });

  describe('validateClient', () => {
    const clientId = 1;
    const secret = 'secret';

    it('should validate a client', async () => {
      const result = await service.validateClient(clientId, secret);

      expect(result).toBe(cliente);
    });

    it('should return an exception if client not found', async () => {
      jest.spyOn(clientService, 'find').mockResolvedValueOnce(null);

      await service.validateClient(clientId, secret).catch((e) => {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e).toMatchObject({ message: 'Cliente e/ou senha inválidos.' });
      });
    });

    it('should return an exception if secret is invalid', async () => {
      const secret = 'password';

      await service.validateClient(clientId, secret).catch((e) => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e).toMatchObject({ message: 'Cliente e/ou senha inválidos.' });
      });
    });
  });
});
