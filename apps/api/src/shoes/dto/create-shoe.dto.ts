import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateShoeDto {
  @ApiProperty({
    example: 'nike',
    description: `Marca do sapato`,
  })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({
    example: 300,
    description: `Preço do sapato`,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 42,
    description: `Tamanho do sapato`,
  })
  @IsNumber()
  @IsNotEmpty()
  size: number;

  @ApiProperty({
    example: 'preto',
    description: `Cor do sapato`,
  })
  @IsString()
  @IsNotEmpty()
  color: string;
}
