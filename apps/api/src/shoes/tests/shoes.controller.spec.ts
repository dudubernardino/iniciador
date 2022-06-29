import MockFacktory from '../../common/mockFactory';
import { Test, TestingModule } from '@nestjs/testing';
import { ShoeController } from '../shoes.controller';
import { ShoeService } from '../shoes.service';
import { CreateShoeDto } from '../dto/create-shoe.dto';
import { Shoe } from '../entities/shoes.entity';
import { UpdateShoeDto } from '../dto/update-shoe.dto';

const shoe = MockFacktory.getShoe();

describe('ShoeController', () => {
  let controller: ShoeController;
  let service: ShoeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoeController],
      providers: [
        {
          provide: ShoeService,
          useValue: {
            create: jest.fn().mockResolvedValue(shoe),
            find: jest.fn().mockResolvedValue(shoe),
            findAll: jest.fn().mockResolvedValue([shoe, shoe]),
            update: jest.fn().mockResolvedValue(shoe),
            delete: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<ShoeController>(ShoeController);
    service = module.get<ShoeService>(ShoeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const dto: CreateShoeDto = {
      brand: 'test',
      price: 1,
      size: 1,
      color: 'test',
    };

    it('should create a shoe', async () => {
      const result = await controller.create(dto);

      expect(result).toBeInstanceOf(Shoe);
    });
  });

  describe('find', () => {
    const shoeId = 1;

    it('should return a shoe', async () => {
      const result = await controller.find(shoeId);

      expect(result).toBeInstanceOf(Shoe);
    });
  });

  describe('find', () => {
    it('should return all shoes', async () => {
      const result = await controller.findAll();

      expect(result.length).toBe(2);
    });
  });

  describe('update', () => {
    const clientId = 1;
    const dto: UpdateShoeDto = {};

    it('should update a shoe', async () => {
      const result = await controller.update(clientId, dto);

      expect(result).toBeInstanceOf(Shoe);
    });
  });

  describe('delete', () => {
    const shoeId = 1;

    it('should delete a shoe', async () => {
      const result = await controller.delete(shoeId);

      expect(result).toBe(true);
    });
  });
});
