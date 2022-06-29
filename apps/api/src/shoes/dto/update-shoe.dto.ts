import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateShoeDto {
  @ApiProperty({
    example: 'nike',
    description: `Marca do sapato`,
  })
  @IsString()
  @IsOptional()
  brand?: string;

  @ApiProperty({
    example: 300,
    description: `Preço do sapato`,
  })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({
    example: 42,
    description: `Tamanho do sapato`,
  })
  @IsNumber()
  @IsOptional()
  size?: number;

  @ApiProperty({
    example: 'preto',
    description: `Cor do sapato`,
  })
  @IsString()
  @IsOptional()
  color?: string;
}
