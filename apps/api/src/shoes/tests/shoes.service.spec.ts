import { Shoe } from '../entities/shoes.entity';
import { ShoeService } from '../shoes.service';
import MockFacktory from '../../common/mockFactory';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShoeDto } from '../dto/create-shoe.dto';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateShoeDto } from '../dto/update-shoe.dto';

const shoe = MockFacktory.getShoe();

describe('ShoeService', () => {
  let service: ShoeService;
  let shoeRepo: Repository<Shoe>;

  const mockRepository = {
    find: jest.fn().mockReturnValue([shoe, shoe]),
    findOne: jest.fn().mockReturnValue(shoe),
    create: jest.fn().mockReturnValue(shoe),
    save: jest.fn().mockReturnValue(shoe),
    update: jest.fn().mockReturnValue({
      affected: 1,
    }),
    remove: jest.fn().mockReturnValue(shoe),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShoeService,
        {
          provide: getRepositoryToken(Shoe),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ShoeService>(ShoeService);

    shoeRepo = module.get<Repository<Shoe>>(getRepositoryToken(Shoe));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(shoeRepo).toBeDefined();
  });

  describe('create', () => {
    const dto: CreateShoeDto = {
      brand: 'test',
      price: 1,
      size: 1,
      color: 'test',
    };

    it('should create a shoe', async () => {
      const result = await service.create(dto);

      expect(result).toBeInstanceOf(Shoe);
    });

    it('should return an exception if fail', async () => {
      jest.spyOn(shoeRepo, 'save').mockImplementationOnce(() => {
        throw new Error();
      });

      await service.create(dto).catch((e) => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e).toMatchObject({ message: 'Não foi possível criar o sapato' });
      });
    });
  });

  describe('find', () => {
    const shoeId = 1;

    it('should return one shoe', async () => {
      const result = await service.find(shoeId);

      expect(result).toBe(shoe);
    });

    it('should return an exception when shoe doesnt exists', async () => {
      jest.spyOn(shoeRepo, 'findOne').mockResolvedValueOnce(null);

      await service.find(shoeId).catch((e) => {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e).toMatchObject({ message: 'Sapato não encontrado.' });
      });
    });
  });

  describe('findAll', () => {
    it('should return a list of shoes', async () => {
      const result = await service.findAll();

      expect(result.length).toBe(2);
    });
  });

  describe('update', () => {
    const shoeId = 1;
    const dto: UpdateShoeDto = {};

    it('should update a client', async () => {
      dto.brand = 'test';
      dto.price = 1;
      dto.size = 1;
      dto.color = 'test';

      const result = await service.update(shoeId, dto);

      expect(result).toBeInstanceOf(Shoe);
    });

    it('should return an exception when shoe doesnt exists', async () => {
      jest.spyOn(shoeRepo, 'findOne').mockResolvedValueOnce(null);

      await service.update(shoeId, dto).catch((e) => {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e).toMatchObject({
          message: 'Sapato não encontrado.',
        });
      });
    });

    it('should return an exception when fails', async () => {
      jest.spyOn(shoeRepo, 'save').mockImplementationOnce(() => {
        throw new Error();
      });

      await service.update(shoeId, dto).catch((e) => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e).toMatchObject({
          message: 'Não foi possível atualizar o sapato.',
        });
      });
    });
  });

  describe('delete', () => {
    const shoeId = 1;

    it('should delete a shoe', async () => {
      const result = await service.delete(shoeId);

      expect(result).toBe(true);
    });

    it('should return an exception when doesnt find a shoe', async () => {
      jest.spyOn(shoeRepo, 'findOne').mockResolvedValueOnce(null);

      await service.delete(shoeId).catch((e) => {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e).toMatchObject({ message: 'Sapato não encontrado.' });
      });
    });

    it('should return an exception when fails', async () => {
      jest.spyOn(shoeRepo, 'remove').mockImplementationOnce(() => {
        throw new Error();
      });

      await service.delete(shoeId).catch((e) => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e).toMatchObject({
          message: 'Não foi possível remover o sapato',
        });
      });
    });
  });
});
