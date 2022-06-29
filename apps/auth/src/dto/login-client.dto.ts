import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class LoginClientDto {
  @ApiProperty({
    example: 1,
    description: `Id do client.`,
  })
  @IsNumber()
  @IsNotEmpty()
  clientId: number;

  @ApiProperty({
    example: '123@abc',
    description: `Senha do client.`,
  })
  @IsString()
  @IsNotEmpty()
  secret: string;
}
