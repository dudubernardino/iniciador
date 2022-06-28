import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({
    example: 'email@email.com',
    description: `O email será usado apenas para cadastrar um novo client, já o id será usado para realizar o login.`,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '123@abc',
    description: `Senha do client.`,
  })
  @IsString()
  @IsNotEmpty()
  secret: string;
}
