import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShoeDto } from './dto/create-shoe.dto';
import { UpdateShoeDto } from './dto/update-shoe.dto';
import { Shoe } from './entities/shoes.entity';

@Injectable()
export class ShoeService {
  constructor(
    @InjectRepository(Shoe)
    private readonly showRepo: Repository<Shoe>,
  ) {}

  /**
   * @function create
   * @description Cria um sapato
   * @param {CreateShoeDto} dto - Parâmetros do sapato
   * @returns {Shoe}
   */
  async create(dto: CreateShoeDto): Promise<Shoe> {
    const shoe = this.showRepo.create({
      brand: dto.brand,
      color: dto.color,
      price: dto.price,
      size: dto.size,
    });

    try {
      await this.showRepo.save(shoe);
    } catch (error) {
      throw new InternalServerErrorException('Não foi possível criar o sapato');
    }

    return shoe;
  }

  /**
   * @function find
   * @description Retorna um sapato
   * @param {number} shoeId - id do sapato
   * @returns {Shoe}
   */
  async find(shoeId: number): Promise<Shoe> {
    const shoe = await this.showRepo.findOne({
      where: {
        shoeId,
      },
    });

    if (!shoe) throw new NotFoundException('Sapato não encontrado.');

    return shoe;
  }

  /**
   * @function findAll
   * @description Retorna todos os sapatos
   * @returns {Shoe[]}
   */
  async findAll(): Promise<Shoe[]> {
    const shoes = await this.showRepo.find();

    return shoes;
  }

  /**
   * @function update
   * @description Atualiza um sapato
   * @param {UpdateShoeDto} dto - Parâmetros do sapato
   * @returns {Shoe}
   */
  async update(shoeId: number, dto: UpdateShoeDto): Promise<Shoe> {
    const shoe = await this.showRepo.findOne({
      where: {
        shoeId,
      },
    });

    if (!shoe) throw new NotFoundException('Sapato não encontrado.');

    if (dto.brand) shoe.brand = dto.brand;
    if (dto.price) shoe.price = dto.price;
    if (dto.size) shoe.size = dto.size;
    if (dto.color) shoe.color = dto.color;

    try {
      await this.showRepo.save(shoe);
    } catch (error) {
      throw new InternalServerErrorException(
        'Não foi possível atualizar o sapato.',
      );
    }

    return shoe;
  }

  /**
   * @function delete
   * @description Exclui um sapato
   * @param {string} shoeId - Id do cliente
   * @returns {boolean}
   */
  async delete(shoeId: number): Promise<boolean> {
    const shoe = await this.showRepo.findOne({
      where: {
        shoeId,
      },
    });

    if (!shoe) throw new NotFoundException('Sapato não encontrado.');

    try {
      await this.showRepo.remove(shoe);
    } catch (error) {
      throw new InternalServerErrorException(
        'Não foi possível remover o sapato',
      );
    }

    return true;
  }
}
