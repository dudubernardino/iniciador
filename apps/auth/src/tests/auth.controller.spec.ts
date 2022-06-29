import MockFacktory from '../../../api/src/common/mockFactory';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { AuthController } from '../auth.controller';
import { LoginClientDto } from '../dto/login-client.dto';

const cliente = MockFacktory.getClient();

describe('ClientController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockReturnValue({ token: 'token' }),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('login', () => {
    const dto: LoginClientDto = {
      clientId: 1,
      secret: 'secret',
    };

    const req = {
      user: {
        clientId: 2,
        email: 'email@email.com',
        secret: 'secret',
        createdAt: '2022-06-29T13:29:27.216Z',
        updatedAt: '2022-06-29T13:29:27.216Z',
      },
    };

    it('should login a user', async () => {
      const { token } = await controller.login(dto, req);

      expect(token).toBe('token');
    });
  });
});
